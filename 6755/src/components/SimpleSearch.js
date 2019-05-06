import React, { Component } from 'react';
import SearchAutoComplete from '../components/SearchAutoComplete';
import SearchInput from '../components/SearchInput';
import SearchHistory from '../components/SearchHistory';

class SimpleSearchComponent extends Component {
    state = {
        query: '',
        isFocused: false,
        results: [],
        searchHistory: {}
    }

    handleSetCurrentQuery = (query) => { this.setState({ query }) }

    handleSetSearchHistory = (searchHistory) => { this.setState({ searchHistory }) }

    handleSetSearchResults = (results) => { this.setState({ results }) }

    handleSetInputFocus = (isFocused) => { this.setState({ isFocused }) }

    persistSearchHistoryLocally = () => {
        const json = JSON.stringify(this.state.searchHistory);
        localStorage.setItem("searchHistory", json);
    }

    render() {
        return (
            <div className="container">
                <SearchInput 
                    isFocused={this.state.isFocused}
                    query={this.state.query}
                    searchHistory={this.state.searchHistory}
                    handleSetSearchHistory={this.handleSetSearchHistory}
                    handleSetCurrentQuery={this.handleSetCurrentQuery}
                    persistSearchHistoryLocally={this.persistSearchHistoryLocally}
                    handleSetSearchResults={this.handleSetSearchResults}
                    handleSetInputFocus={this.handleSetInputFocus}
                />
                <SearchAutoComplete 
                    isFocused={this.state.isFocused}
                    query={this.state.query}
                    results={this.state.results}
                    handleSetCurrentQuery={this.handleSetCurrentQuery}
                />
                <SearchHistory 
                    searchHistory={this.state.searchHistory}
                    handleSetSearchHistory={this.handleSetSearchHistory}
                    persistSearchHistoryLocally={this.persistSearchHistoryLocally}
                />
            </div>
        )
    };
};

export default SimpleSearchComponent;
