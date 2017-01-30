const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Methods for Associations', () => {
  let joe, blogPost, comment;

  beforeEach((done) => {
    // Create instances
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'JS is great', content: 'The best programming language ever, period.' });
    comment = new Comment({ content: 'Could not agree more.' });
    // Setup associations
    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    // Save to db using parallel operations and Promise.all
    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done());
  });

  it('should save association between records', (done) => {
    // Query
    User.findOne({ name: 'Joe' })
      // Use modifier to populate query to desired association
      .populate('blogPosts')
      .then((user) => {
        assert(user.blogPosts[0].title === 'JS is great');
        done();
      });
  });
});
