const assert = require('assert');
const User = require('../src/user');

describe('Methods to validate records', () => {
  it('validates by requiring specific attribute', () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === 'Name is required.');
  });

  it('validates by using validator function', () => {
    const user = new User({ name: 'Al' });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === 'Name must be at least 3 characters.');
  });
});
