const Artist = require('../models/artist');

/**
 * Finds the lowest and highest yearsActive of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max yearsActive, like { min: 0, max: 14 }.
 */
module.exports = () => {
  const minYears = Artist
    // All artists
    .find({})
    // Sort by age ascending
    .sort({ yearsActive: 1 })
    // Limit results to 1
    .limit(1)
    // Results still array, so pull off age property of first item
    .then(artists => artists[0].yearsActive);

  const maxYears = Artist
    .find({})
    .sort({ yearsActive: -1 })
    .limit(1)
    .then(artists => artists[0].yearsActive);

  return Promise.all([minYears, maxYears])
    // Create object with min and max values
    .then((result) => {
      return { min: result[0], max: result[1]};
    });


};
