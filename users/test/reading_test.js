const assert = require('assert');
const User = require('../src/user')

describe('Reading user records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save()
      .then(() => done());
  });

  it('should find all users with specified name', (done) => {
    User.find({ name: 'Joe' })
      .then((users) => {
        // Convert ObjectId to string
        assert(users[0]._id.toString() === joe._id.toString());
        done();
      });
  });
});
