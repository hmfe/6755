import React, { Component, Fragment } from 'react';
import moment, { isMoment } from 'moment';

class SearchHistory extends Component {

    componentDidMount() {
        try {
            const json = localStorage.getItem("searchHistory");
            const searchHistory = JSON.parse(json);
            if (searchHistory) {
                this.props.handleSetSearchHistory(searchHistory);
            }
        } catch(e) {
            console.warn(e);
        }
    }

    handleClearSearchHistoryAll = () => {
        localStorage.clear();
        this.props.handleSetSearchHistory({});
    }

    handleClearSearchHistoryItem = (searchHistoryItem) => {
        const searchHistory = this.props.searchHistory;
        delete searchHistory[searchHistoryItem];
        this.props.handleSetSearchHistory(searchHistory);
        this.props.persistSearchHistoryLocally();
    }

    render() { 
        const searchHistory = this.props.searchHistory;

        return (
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
                                    <time datetime={moment(searchHistoryResult).toISOString()}>
                                        {moment(searchHistoryResult).format("YYYY-MM-DD hh:mm A")}
                                    </time>
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
        )
    };
};

export default SearchHistory;
