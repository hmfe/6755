import React from 'react';
import SimpleSearchComponent from './SimpleSearchComponent';

const SimpleSearchPage = (props) => {
    console.log(props);
    return ( 
        <div className="container">
            <SimpleSearchComponent />
        </div>
    );
};

export default SimpleSearchPage;
