const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length >= 3,
      message: 'Name must be at least 3 characters.'
    },
    required: [true, 'Name is required.']
  },
  // Change to virtual type
  // postCount: Number,
  posts: [PostSchema]
});

// Add virtual field outside schema definition
// Use function keyword so 'this' refers to model instance
UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
