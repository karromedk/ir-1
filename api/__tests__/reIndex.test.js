const { deleteIndex, createIndex, indexBulk } = require('../services/elastic');

/*   
*     If you have bulk-indexed once and the 'events' index exists, 
*     you need to reindex the data if you make changes to the mapping
*     in createIndex
*/


test('Reindex the events in the events.json dataset', async () => {
  /*      Delete the prior index     */
  await deleteIndex('events');

  /*      Create a new events-index     */
  await createIndex();

  /*      Index the events in events.json in a bulk     */
  await indexBulk();

});