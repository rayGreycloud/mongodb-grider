const mongoose = require('mongoose');
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

  it.only('should save assocation between records', (done) => {
    User.findOne({ name: 'Joe' })
      .then((user) => {
        console.log(user);
        done();
      });
  });
});
