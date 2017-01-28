const mongoose = require('mongoose');

// Use ES6 promise implementation
mongoose.Promise = global.Promise;

// Hook to connect to database
before((done) => {
  mongoose.connect('mongodb://localhost/users_test');
  mongoose.connection
    .once('open', () => {
      console.log(`Connected to database. Beginning tests... \n`);
      done();
    })
    .on('error', (error) => {
      console.warn('Warning', error);
    });
});

// Hook to empty db before each test
beforeEach((done) => {
  // Drop collections
  const { users, comment, blogPosts } = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() => {
      blogPost.drop(() => {
        done();
      });
    });
  });
});

after(() => console.log('Tests completed.'));
