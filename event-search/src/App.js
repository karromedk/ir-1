import React from 'react';
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
	searchKey: "search-pwrgngpcbv78z2c5gcitgdwt",
	engineName: "events",
	hostIdentifier: "host-osfgj8"
});

const configurationOptions = {
	apiConnector: connector,
	autocompleteQuery: {
		suggestions: {
			types: {
				documents: {
					// Which fields to search for suggestions.
					fields: ["name"]
				}
			},
			// How many suggestions appear.
			size: 5
		}
	},
	searchQuery: {
		search_fields: {
			// 1. Search by name of video game.
			name:  {}
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
					fallback: true // Fallback to a "raw" result.
				}
			}
		},
		// 3. Facet by scores, genre, publisher, and platform, which we'll use to build filters later.
		facets: {

		}
	}
};

function App() {

	return (
		<SearchProvider config={configurationOptions}>
			<div className="App">
				<Layout
					header={<SearchBox autocompleteSuggestions={true} />}
					bodyContent={<Results titleField="name" urlField="link" />}
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
