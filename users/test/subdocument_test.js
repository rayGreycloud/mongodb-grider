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
});
