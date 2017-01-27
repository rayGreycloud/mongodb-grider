const assert = require('assert');
const User = require('../src/user');

describe ('Methods for Subdocuments', () => {
  it('should create a subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      // Mongo automatically applies postschema
      posts: [{ title: 'PostTitle'}]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'PostTitle');
        done();
      });
  });

  it('should add subdocuments to existing record', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: []
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        // Using array method
        user.posts.push({ title: 'New Post' });
        // Required in order to save new array in db
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'New Post');
        done();
      });
  });

  it('should remove subdocument from existing record', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'My Post'}]
    });

    joe.save()
    .then(() => User.findOne({ name: 'Joe' }))
    .then((user) => {
      const post = user.posts[0];
      // Using mongoose method
      post.remove();
      // Required because no db operation yet
      return user.save();
    })
    .then(() => User.findOne({ name: 'Joe' }))
    .then((user) => {
      assert(user.posts.length === 0);
      done();
    });
  });
});
