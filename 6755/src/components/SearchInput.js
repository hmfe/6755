import React, { Component } from 'react';
import moment from 'moment';

class SimpleSearchComponent extends Component {

    handleSearchChange = (e) => {
        this.props.handleSetCurrentQuery(e.target.value);
        
        if (!e.target.value || e.target.value === "") {
            this.props.handleSetSearchResults([])
        } else {
            this.requestData();
        }
    }

    handleSearchCompleted = (e) => {
        e.preventDefault();
        if (this.props.query && this.props.query !== "") {
            const searchHistory = this.props.searchHistory;
            const timestamp = moment().format("YYYY-MM-DD hh:mm:ss A");
            searchHistory[timestamp] = this.props.query;
            this.props.handleSetSearchHistory(searchHistory);
            this.props.handleSetCurrentQuery("");
            this.props.persistSearchHistoryLocally();
        }
    }

    requestData() {
        const endpoint = 'https://hn.algolia.com/api/v1/search?query=';
        const queryString = this.props.query.replace(/[&<>"'/=^%]/ig, ''); // Replace common URL encoded characters to avoid sending a bad request
        const requestUrl = endpoint + queryString + "&tags=story&hitsPerPage=10";

        this.setState({ loading: true });
        fetch(requestUrl)
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Error retrieving results...');
            }
          })
          .then(data => this.props.handleSetSearchResults(data.hits))
          .catch(error => console.warn(error));
    }

    render() {
        return (
            <form className="search" onSubmit={this.handleSearchCompleted}>
                <input 
                    placeholder='Search HN articles... e.g. "Java"' 
                    className="search__input" 
                    type="text" 
                    name="option" 
                    value={this.props.query || ''}
                    autoComplete="off"
                    onChange={this.handleSearchChange}
                    onFocus={() => this.props.handleSetInputFocus(true)}
                    onBlur={() => this.props.handleSetInputFocus(false)}
                />
                <button 
                    className="clear-search-query-button" 
                    onMouseDown={() => this.props.handleSetCurrentQuery('')}>
                    X
                </button>
            </form>
        )
    };
};

export default SimpleSearchComponent;
