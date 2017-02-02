const assert = require('assert');
const User = require('../src/user')

describe('Methods to read records', () => {
  let joe, kit, liz, moe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    kit = new User({ name: 'Kit' });
    liz = new User({ name: 'Liz' });
    moe = new User({ name: 'Moe' });

    Promise.all([
      moe.save(),
      joe.save(),
      kit.save(),
      liz.save()
    
    ])
      .then(() => done());
  });

  it('should use class method find', (done) => {
    User.find({ name: 'Joe' })
      .then((users) => {
        // Convert ObjectId to string
        assert(users[0]._id.toString() === joe._id.toString());
        done();
      });
  });

  it('should use class method findOne', (done) => {
    User.findOne({ _id: joe._id })
      .then((user) => {
        assert(user.name === 'Joe');
        done();
      })
  });

  it('should use modifiers skip and limit', (done) => {
    User.find({}) // find all records
      .sort({ name: 1 })   // sort by property - ascending
      .skip(1)  // skip 1st records
      .limit(2) // limit results to 2
      .then((users) => {
        assert(users[0].name === 'Kit');
        assert(users[1].name === 'Liz');
        assert(users.length === 2);
        done();
      });
  });
});
