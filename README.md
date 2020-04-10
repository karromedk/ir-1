# Information Retrieval project, retrieving events from Meetup API and searching over them using Elasticsearch

## Elasticsearch
If you haven't installed Elasticsearch yet, follow the guide for "Run Elasticsearch locally on Linux, macOS, or Windows" (step 1-3) in https://www.elastic.co/guide/en/elasticsearch/reference/current/getting-started-install.html

Functions for communicating with Elasticsearch are made in api/services/search.js. Currently there's a limited mapping in the createIndex function, and a simple search in the search function. Here we need to figure out what filters, queries, and other elastic stuff to use. 

In the api folder a few testfiles are created in the __tests__ folder.
- Run bulkIndex.test.js with 'npm test -- bulkIndex' the first time you use your elastic engine. It will create the events index and bulk index the documents in events.json. 
- Run reIndex with 'npm test -- reIndex' if you make any changes to the search.js file (reIndex deletes the prior index and creates a new with the new patches)
- Run search with 'npm test --search' and try different search strings to retriev data from the events index in elasticsearch.

## Kibana
The data in elasticsearch can be visualized in kibana, follow the guide for "Installing Kibana Yourself" in https://www.elastic.co/guide/en/kibana/current/install.html. 

cd in to the installed kibana folder and run './bin/kibana' Then browse to 'http://localhost:5601/'. In the 'discover' tab we'll be able to see the data, but first you'll need to connect Kibana to our events index. Do this by creating an index pattern, type 'events' in Index pattern and click next until the data is visualized. 

## Fetching events (if you have a meetup pro account)

In the api folder a file called events.json should exist, follow the steps below if you want to update it.

1. In your oauth consumer the redirect_uri should be set to localhost:3000/access

2. Set the following process variables with your Meetup credentials (on mac this is done by writing EXPORT MEETUP_... in the terminal): 
MEETUP_CLIENT_ID = 'your-client-id'
MEETUP_CLIENT_KEY = 'your-client-key'
MEETUP_EMAIL = 'your-meetup-login-email'
MEETUP_PW = 'your-meetup-password'

3. In routes/access.json, alter eventsUrl to the string with the events you want to fetch.

4. In the api folder:
Fetch dependencies by running 'npm install'
Start the server with 'npm start'

5. Browse to localhost:3000/auth, if everything works you should be redirected to meetup login page where you enter your credentials. Then you should be redirected to localhost:3000/access and the events should be fetced to a events.json file in the api directory.
