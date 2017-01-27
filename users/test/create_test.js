const assert = require('assert');
const User = require('../src/user');

describe('Method to create records', () => {
  it('instance method save', (done) => {
    // Create instance of User
    const joe = new User({ name: 'Joe' });
    // Insert/save in db
    joe.save()
      .then(() => {
        // Confirm record saved
        assert(!joe.isNew);
        done();
      });
  });
});
