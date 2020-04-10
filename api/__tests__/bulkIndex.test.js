const { createIndex, indexBulk, countEventsInIndex } = require('../services/elastic');
const fs = require('fs');

/* 
*     If the events-index does not exist yet, this test will 
*     create it and index the events in events.json in a bulk
*/

test('Index the events.json dataset in a bulk', async () => {
  /*      Create the index      */
  await createIndex();

  /*      Index the events in events.json in a bulk     */
  await indexBulk();

  /*      Count the events in events.json file      */
  let eventsCount = 0;
  const events = fs.readFileSync('events.json');
  const allEvents = JSON.parse(events);
  allEvents.events.forEach(event => eventsCount += 1);

  /*      Count the events in the events index      */
  const indexCount = await countEventsInIndex();

  console.log(eventsCount);
  console.log(indexCount);
});