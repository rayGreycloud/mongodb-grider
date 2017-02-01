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
      // Test association
      .then((user) => {
        assert(user.blogPosts[0].title === 'JS is great');
        done();
      });
  });

  it('should save a full relation tree', (done) => {
    // Going down the rabbit hole...
    User.findOne({ name: 'Joe' })
    // Pass config object
      .populate({
        // Find property and load association
        path: 'blogPosts',
        // Find property on nested assoc and load
        populate: {
          path: 'comments',
          // Specify mongoose model to use
          model: 'comment',
          // Repeat to load user association to comments
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then((user) => {
        assert(user.name === 'Joe');
        assert(user.blogPosts[0].title === 'JS is great');
        assert(user.blogPosts[0].comments[0].content === 'Could not agree more.');
        assert(user.blogPosts[0].comments[0].user.name === 'Joe');

        done();
      });
  });
});
