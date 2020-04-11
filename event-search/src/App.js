import React from 'react';
import './App.css';

import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { SearchProvider, Results, SearchBox } from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";

const connector = new AppSearchAPIConnector({
	searchKey: "[YOUR_SEARCH_KEY]",
	engineName: "video-games",
	hostIdentifier: "[YOUR_HOST_IDENTIFIER]"
});

const configurationOptions = {
	apiConnector: connector
	// Let's fill this in together.
};

function App() {
	return (
		<div className="App">
			<header className="Event search engine1">
				<div1 className="Header">
					<b>Welcome to a event search enginge!</b>
				</div1>

				<form>
					<p>Enter your query </p>
					<label>
						<input className="inputField" type="text" name="name" />
					</label>

				</form>

				<div class="buttonHolder">
					<button type="submit" class="button">Search</button>
				</div>

			</header>
		</div>
	);
}

export default App;
