const assert = require('assert');
const User = require('../src/user')

describe('Creating records', () => {
  it('should save a user', () => {
    // Create instance of User
    const joe = new User({ name: 'Joe' });
    // Insert/save in db
    joe.save();
    // Confirm record saved

  });
});
