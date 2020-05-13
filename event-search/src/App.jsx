import React, { useEffect, useState } from 'react';
import './App.css';

import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { Layout } from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import {
	PagingInfo,
	ResultsPerPage,
	Paging,
	Facet,
	SearchProvider,
	Results,
	SearchBox,
	Sorting
} from "@elastic/react-search-ui";

const connector = new AppSearchAPIConnector({
	searchKey: "search-1a9wpv91e8bi32sp7r55tysa",
	engineName: "events",
	hostIdentifier: "host-6oggxt"
});

const configurationOptions = {
	apiConnector: connector,
	autocompleteQuery: {
		suggestions: {
			types: {
				documents: {
					// Which fields to search for suggestions.
					fields: ['name']
				}
			},
			// How many suggestions appear.
			size: 5
		}
	},
	searchQuery: {
		search_fields: {
			// 1. Search by name of video game.
		},
		// 2. Results: name of the video game, its genre, publisher, scores, and platform.
		result_fields: {
			name: {
				// A snippet means that matching search terms will be highlighted via <em> tags.
				snippet: {
					size: 75, // Limit the snippet to 75 characters.
					fallback: true // Fallback to a "raw" result.
				}
			},
			description: {
				snippet: {
					size: 350,
					fallback: true // Fallback to a "raw" result.
				}
			},
			local_date: {
				snippet: {
					fallback: true // Fallback to a "raw" result.
				}
			},
			link: {
				raw: {}
			}
		},
		// 3. Facet by scores, genre, publisher, and platform, which we'll use to build filters later.
		facets: {

		}
	}
};


const App = () => {

	const [state, setState] = useState({ name: false, description: false, venue: false })
	const handleChange = (checkbox) => {
		setState({ ...state, [checkbox]: !state[checkbox] })
	}

	useEffect(() => {
		const search_fields = Object.keys(state).reduce((obj, field) => state[field] ? { ...obj, [field]: {} } : obj, {})
		if (Object.keys(search_fields).length) {
			configurationOptions.searchQuery.search_fields = search_fields
		} else {
			configurationOptions.searchQuery.search_fields = Object.keys(state).reduce((obj, field) => ({ ...obj, [field]: {} }), {})
		}
	}, [state])




	return (
		<SearchProvider config={configurationOptions}>
			<div className="App">
				<Layout
					header={
						<div>
							<SearchBox autocompleteSuggestions={true} />
							<div id="specifySearch" className="sui-sorting__label" style={{ marginTop: '25px', marginBottom: '10px' }}> SPECIFY SEARCH </div>
							<div className="checkbox">
								<input
									id="name"
									type="checkbox"
									onChange={() => handleChange('name')}
								/><label>Event name</label>
								<input
									id="description"
									type="checkbox"
									onChange={() => handleChange('description')}
								/><label>Event description</label>
								<input
									id="venue"
									type="checkbox"
									onChange={() => handleChange('venue')}
								/><label>Event venue</label>
							</div>
						</div>
					}
					bodyContent={
						<Results titleField="name" urlField="link" />
					}
					sideContent={
						<div>
							<Sorting
								label={"Sort by"}
								sortOptions={[
									{
										name: "Relevance",
										value: "",
										direction: ""
									},
									{
										name: "Name",
										value: "name",
										direction: "asc"
									},
									{
										name: "Date",
										value: "local_date",
										direction: "asc"
									}
								]}
							/>
							<Facet field=" " label=" " />
						</div>
					}
					bodyHeader={
						<>
							<PagingInfo />
							<ResultsPerPage />
						</>
					}
					bodyFooter={<Paging />}
				/>
			</div>
		</SearchProvider>
	);
}

export default App;
