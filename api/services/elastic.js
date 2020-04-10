const { Client } = require('@elastic/elasticsearch');
const _ = require('lodash');
const fs = require('fs');
require('array.prototype.flatmap').shim()

const client = new Client({
  node: 'http://localhost:9200',
})

/*      Create the 'events' index     */
const createIndex = async () => {
  await client.indices.create({
    index: 'events',
    body: {
      mappings: {
        properties: {
          id: { type: 'integer' },
          name: { type: 'text' },
          description: { type: 'text' },
          local_date: { type: 'text' },
          local_time: { type: 'text' },
          link: { type: 'text' }
        }
      }
    }
  }, { ignore: [400] })
}

/*      Delete the index      */
const deleteIndex = (index) => client.indices.delete({
  index,
}).then(resp => Promise.resolve(resp)).catch(err => Promise.resolve(err));

/*      Index the data in events.json in a bulk     */
const indexBulk = async () => {
  /*      Format the dataset in events.json and trim the events object      */
  const dataset = [];
  const content = fs.readFileSync('events.json');
  const allEvents = JSON.parse(content);
  allEvents.events.forEach(event => {
    const trimmedEvent = {
      id: event.id,
      name: event.name,
      description: event.description,
      local_date: event.local_date,
      local_time: event.local_time,
      link: event.link,
    }
    dataset.push(trimmedEvent);
  });

  /*      Assign the events-index to every event object, and index the events in bulk     */
  const body = dataset.flatMap(doc => [{ index: { _index: 'events' } }, doc]);
  const { body: bulkResponse } = await client.bulk({ refresh: true, body });

  if (bulkResponse.errors) {
    const erroredDocuments = []
    bulkResponse.items.forEach((action, i) => {
      const operation = Object.keys(action)[0]
      if (action[operation].error) {
        erroredDocuments.push({
          // If the status is 429 it means that you can retry the document,
          // otherwise it's very likely a mapping error, and you should
          // fix the document before to try it again.
          status: action[operation].status,
          error: action[operation].error,
          operation: body[i * 2],
          document: body[i * 2 + 1]
        })
      }
    })
    console.log(erroredDocuments);
  }

  const { body: count } = await client.count({ index: 'events' });
  console.log(count);
}

/*      Count the nr of events in the events index      */
const countEventsInIndex = async () => {
  const { body: count } = await client.count({ index: 'events' });
  return count.count;
}

// Let's search!
const searchEvents = async (
  searchString,
  size,
) => {

  let query = {
    match_all: {},
  }

  if (searchString) {
    query = {
      multi_match: {
        query: searchString,
        fields: ['name', 'description'],
      },
    };
  }

  const { body } = await client.search({
    index: 'events',
    body: {
      query
    }
  });
  return body.hits.hits;

}

module.exports = {
  createIndex,
  deleteIndex,
  indexBulk,
  countEventsInIndex,
  searchEvents,
}