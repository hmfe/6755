import React, { Component, Fragment } from 'react';
import moment from 'moment';

class SimpleSearchComponent extends Component {
    state = {
        APIEndpoint: 'https://hn.algolia.com/api/v1/search?query=',
        query: '',
        loading: false,
        isFocused: false,
        results: [],
        searchHistory: {}
    }

    componentDidMount() {
        try {
            const json = localStorage.getItem("searchHistory");
            const searchHistory = JSON.parse(json);
            console.log(searchHistory);
            if (searchHistory) {
                this.setState(() => ({ searchHistory }));
            }
        } catch(e) {
            console.warn(e);
        }
    }

    handleInputFocus = () => {
        this.setState({ isFocused: true })
    }

    handleInputBlur = (e) => {
        this.setState({ isFocused: false })
    }

    handleSearchChange = (e) => {
        this.setState({ query: e.target.value });
        
        if (!e.target.value || e.target.value === "") {
            this.setState({ results: [] })
        } else {
            this.requestData();
        }
        console.log(this.state.results);
    }

    handleSearchCompleted = (e) => {
        e.preventDefault();
        console.log(this.state.query)
        if (this.state.query && this.state.query !== "") {
            const searchHistory = this.state.searchHistory;
            const timestamp = moment().format("YYYY-MM-DD hh:mm:ss A");
            searchHistory[timestamp] = this.state.query;
            this.setState({ searchHistory });
            this.persistSearchHistoryLocally();
        }
    }

    requestData() {
        const queryString = this.state.query.replace(/[&<>"'/=^%]/ig, ''); // Replace common URL encoded characters to avoid sending a bad request
        const requestUrl = this.state.APIEndpoint + queryString + "&tags=story&hitsPerPage=10";

        this.setState({ loading: true });
        fetch(requestUrl)
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Error retrieving results...');
            }
          })
          .then(data => this.setState({ results: data.hits, loading: false }))
          .catch(error => this.setState({ error, loading: false }));
    }

    handleClearSearchQuery = () => {
        this.setState({ query: '' });
        this.setState({ results: '' });
    }

    handleClearSearchHistoryAll = () => {
        localStorage.clear();
        this.setState({ searchHistory: {} });
    }

    handleClearSearchHistoryItem = (searchHistoryItem) => {
        const searchHistory = this.state.searchHistory;
        delete searchHistory[searchHistoryItem];
        this.setState({ searchHistory });
        this.persistSearchHistoryLocally();
    }

    handleResultClicked = (query) => {
        console.log('clicked')
        this.setState({ query });
    }

    persistSearchHistoryLocally() {
        const json = JSON.stringify(this.state.searchHistory);
        localStorage.setItem("searchHistory", json);
    }

    render() { 
        const { isFocused, results, query, searchHistory } = this.state;
        let queryResultBolded;

        return (
            <div className="container">
                <form className="search" onSubmit={this.handleSearchCompleted}>
                    <input 
                        placeholder='Search HN articles... e.g. "Java"' 
                        className="search__input" 
                        type="text" 
                        name="option" 
                        value={query || ''}
                        autoComplete="off"
                        onChange={this.handleSearchChange}
                        onFocus={this.handleInputFocus}
                        onBlur={this.handleInputBlur}
                    />
                    <button 
                        className="clear-search-query-button" 
                        onClick={this.handleClearSearchQuery}>
                        X
                    </button>
                </form>
                
                {isFocused && results.length > 0 && query && (
                    <div className="search-results">
                            {results.map((result, index) => {
                                let queryResult = result.title
                                let searchKeyNdx = queryResult.toLowerCase().indexOf(query.toLowerCase());
                                if (searchKeyNdx > -1) {
                                    queryResultBolded = [
                                        queryResult.substring(0, searchKeyNdx),
                                        <strong key={result.title + "-" + index}>
                                            {queryResult.substring(searchKeyNdx, searchKeyNdx + query.length)}
                                        </strong>,
                                        queryResult.substring(searchKeyNdx + query.length)
                                    ];
                                    return <span 
                                                className="query-result" 
                                                key={queryResult}
                                                onMouseDown={() => this.handleResultClicked(queryResult)}
                                            >
                                                {queryResultBolded}
                                            </span>;
                                } 
                            })}
                    </div>
                )}
                
                <div className="search-history">
                    <div className="search-history-header">
                        <h2 className="search-history-title">Search history</h2>
                        <button className="clear-history-all-button" onClick={this.handleClearSearchHistoryAll}>Clear search history</button>
                    </div>
                    <hr></hr>
                    {Object.keys(searchHistory).map((searchHistoryResult, index) => (
                        <Fragment key={index}>
                            <div className="search-history-item" key={"search-history-item-" + index}>
                                <strong 
                                    className="search-history-term"
                                    key={"search-term-" + index}>
                                    {searchHistory[searchHistoryResult]}
                                </strong>      
                                <span className="search-history-timestamp">
                                    {moment(searchHistoryResult).format("YYYY-MM-DD hh:mm A")}
                                    <button 
                                        key={"clear-history-" + index} 
                                        className="clear-history-item-button" 
                                        onClick={ () => this.handleClearSearchHistoryItem(searchHistoryResult) }>
                                        X
                                    </button>
                                </span>
                            </div>
                            <hr></hr>
                        </Fragment>
                    ))}
                </div>

            </div>
        )
    };
};

export default SimpleSearchComponent;
