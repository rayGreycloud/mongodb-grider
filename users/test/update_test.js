const assert = require('assert');
const User = require('../src/user');

describe('Methods to update records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe', postCount: 0 });
    joe.save()
      .then(() => done());
  });

function assertName(operation, done) {
  operation
    .then(() => User.find({}))
    .then((users) => {
      assert(users.length === 1);
      assert(users[0].name === 'Alex');
      done();
    });
}

  it('instance method set & save ', (done) => {
    joe.set('name', 'Alex');
    assertName(joe.save(), done);
  });

  it('instance method update', (done) => {
    assertName(joe.update({ name: 'Alex' }), done);
  });

  it('class method update', (done) => {
    assertName(
      User.update({ name: 'Joe' }, { name: 'Alex' }),
      done
    );
  });

  it('class method findOneAndUpdate', (done) => {
    assertName(
      User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }),
      done
    );
  });

  it('class method findByIdAndUpdate', (done) => {
    assertName(
      User.findByIdAndUpdate(joe._id, { name: 'Alex' }),
      done
    );
  });

  // Use xit to prevent test from running
  xit('should increment postCount', (done) => {
    User.update(
      { name: 'Joe' },
      // Increment update operator
      { $inc:{ postCount: 1 } }
    )
      .then(() =>  User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.postCount === 1);
        done();
      });
  });

});
