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
        user.posts.push({ title: 'New Post' });
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'New Post');
        done();
      });
  });
});
