const assert = require('assert');
const User = require('../src/user')

describe('Methods to read records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save()
      .then(() => done());
  });

  it('class method find', (done) => {
    User.find({ name: 'Joe' })
      .then((users) => {
        // Convert ObjectId to string
        assert(users[0]._id.toString() === joe._id.toString());
        done();
      });
  });

  it('class method findOne', (done) => {
    User.findOne({ _id: joe._id })
      .then((user) => {
        assert(user.name === 'Joe');
        done();
      })
  });
});
