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
  posts: [PostSchema],
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

// Add virtual field outside schema definition
// Use function keyword so 'this' refers to model instance
UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

// Middleware for clean-up
UserSchema.pre('remove', function(next) {
  // Grab model (Not imported because blogPost imports user already)
  const BlogPost = mongoose.model('blogPost');

  // Using $in operator for cross-removal
  // Go thru collection and remove all records with _id in array. this == user being deleted
  BlogPost.remove({ _id: { $in: this.blogPosts } })
    .then(() => next());
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
