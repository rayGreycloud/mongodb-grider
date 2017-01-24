const assert = require('assert');
const User = require('../src/user');

describe('Methods to validate records', () => {
  it('validates by requiring specific attribute', () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === 'Name is required.');
  });
});
