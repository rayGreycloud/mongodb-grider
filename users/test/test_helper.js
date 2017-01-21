const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users_test');

console.log('Beginning tests.');
console.log('Connecting to database...');

mongoose.connection
  .once('open', () => console.log('Connection confirmed.'))
  .on('error', (error) => {
    console.warn('Warning', error);
  });
