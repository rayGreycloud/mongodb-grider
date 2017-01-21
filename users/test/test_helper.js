const mongoose = require('mongoose');

// Use ES6 promise implementation
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/users_test');
console.log('Begin tests...');

mongoose.connection
  .once('open', () => {})
  .on('error', (error) => {
    console.warn('Warning', error);
  });

// Hook to empty db before each test
beforeEach((done) => {
  // Drop collection
  mongoose.connection.collections.users.drop(() => {
    // Ready to run next test
    done();
  });
});

after(() => console.log('Tests completed.'));
