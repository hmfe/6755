import React, { Component } from 'react';
import moment from 'moment';

class SimpleSearchComponent extends Component {
    state = {
        APIEndpoint: 'https://hn.algolia.com/api/v1/search?query=',
        query: undefined,
        loading: false,
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

    handleSearchChange = (e) => {
        console.log("Search changed = " + e.target.value);
        this.setState({ query: e.target.value });

        if (e.target.value === "") {
            this.setState({ results: [] })
        } else {
            this.requestData();
        }
        console.log(this.state.results);
    }

    handleSearchCompleted = (e) => {
        e.preventDefault();
        const searchHistory = this.state.searchHistory;
        const timestamp = moment().format("YYYY-MM-DD hh:mm:ss A");
        searchHistory[timestamp] = this.state.query;
        this.setState({ searchHistory });
        this.persistSearchHistoryLocally();
    }

    requestData() {
        const requestUrl = this.state.APIEndpoint + this.state.query + "&tags=story";

        this.setState({ loading: true });
        fetch(requestUrl)
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Error!');
            }
          })
          .then(data => this.setState({ results: data.hits, loading: false }))
          .catch(error => this.setState({ error, loading: false }));
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

    persistSearchHistoryLocally() {
        const json = JSON.stringify(this.state.searchHistory);
        localStorage.setItem("searchHistory", json);
    }

    render() { 
        const { results, query, searchHistory } = this.state;
        let queryResultBolded;

        return (
            <div>
                <form className="search" onSubmit={this.handleSearchCompleted}>
                    <input className="search__input" type="text" name="option" onChange={this.handleSearchChange}/>
                    <button className="button">Search</button>
                </form>

                <div className="search-results">
                    {results.length > 0 && (
                        <ul>
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
                                return <li key={queryResult}>{queryResultBolded}</li>;
                            } 
                        })}
                        </ul>
                    )}
                </div>
                
                <div className="search-history">
                    <h2>Search history</h2>
                    <button className="clear-history" onClick={this.handleClearSearchHistoryAll}>Clear search history</button>
                    {Object.keys(searchHistory).map((searchHistoryResult, index) => (
                        <div key={index}>
                            <strong key={"search-term-" + index}>
                                {searchHistory[searchHistoryResult]} - 
                                {moment(searchHistoryResult).format("YYYY-MM-DD hh:mm A")}
                            </strong>      
                            <button 
                                key={"clear-history-" + index} 
                                className="clear-history" 
                                onClick={ () => this.handleClearSearchHistoryItem(searchHistoryResult) }>
                                Clear Item
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        )
    };
};

export default SimpleSearchComponent;
