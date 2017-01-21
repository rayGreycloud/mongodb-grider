const assert = require('assert');
const User = require('../src/user')

describe('Record creation', () => {

  it('should save a user', (done) => {
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
