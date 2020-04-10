const { searchEvents } = require('../services/elastic');

/*      Make sure events index exists before searching      */

test('Search in events index', async () => {

  // alter the search string to what you want to search on
  const searchString = 'samurai';
  const hits = await searchEvents(searchString);
  console.log(hits);

});