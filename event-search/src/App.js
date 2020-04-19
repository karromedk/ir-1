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
	searchQuery: {
		search_fields: {
			// 1. Search by name of video game.
			name: {}
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
					size: 100,
					fallback: true
				}
			}
		},
		// 3. Facet by scores, genre, publisher, and platform, which we'll use to build filters later.
	}
};

function App() {

	return (
		<SearchProvider config={configurationOptions}>
			<div className="App">
				<Layout
					header={<SearchBox />}
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
							<Facet field="user_score" label="User Score" />
							<Facet field="critic_score" label="Critic Score" />
							<Facet field="genre" label="Genre" />
							<Facet field="publisher" label="Publisher" isFilterable={true} />
							<Facet field="platform" label="Platform" />
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
