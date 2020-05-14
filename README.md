# Information Retrieval project, retrieving events from Meetup API and searching over them using Elasticsearch

In this project, we've used the Meetup API for retrieving events to index our search engine. Then an engine was created in Swiftype App Search, and together with Elastic Search UI various functions were implemented to boost the search experience.

The 'api' folder contains code for retrieving data from the meetup dataset, and some services used when experimenting directly with elasticsearch.

The 'event-search' folder contains the resulting functionalities of the search engine, along with the user interface (all implemented in App.jsx).

To test the search engine, run 'nmp start' or 'yarn start' inside the event-search folder and browse to http://localhost:3000/. In the presented user interface, issue queries to explore the dataset of events.