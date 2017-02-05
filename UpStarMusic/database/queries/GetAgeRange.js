const Artist = require('../models/artist');

/**
 * Finds the lowest and highest age of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max ages, like { min: 16, max: 45 }.
 */
module.exports = () => {
  const minAge = Artist
    // All artists
    .find({})
    // Sort by age ascending
    .sort({ age: 1 })
    // Limit results to 1
    .limit(1)
    // Results still array, so pull off age property of first item
    .then(artists => artists[0].age);

  const maxAge = Artist
    .find({})
    .sort({ age: -1 })
    .limit(1)
    .then(artists => artists[0].age);

  return Promise.all([minAge, maxAge])
    // Create object with min and max values
    .then((result) => {
      return { min: result[0], max: result[1]};
    });
};
