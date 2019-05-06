import React, { Component, Fragment } from 'react';

class SearchAutoComplete extends Component {

    render() { 
        const { isFocused, results, query } = this.props;
        let queryResultBolded;

        return (
            <Fragment>
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
                                                onMouseDown={() => this.props.handleSetCurrentQuery(queryResult)}
                                            >
                                                {queryResultBolded}
                                            </span>;
                                } 
                            })}
                    </div>
                )}
            </Fragment>
        )
    };
};

export default SearchAutoComplete;
