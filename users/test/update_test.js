const assert = require('assert');
const User = require('../src/user')

describe('Methods to update records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' })
    joe.save()
      .then(() => done());
  });

  it('instance method set & save ', (done) => {
    joe.set('name', 'Alex');
    joe.save()
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      });
  });
});
