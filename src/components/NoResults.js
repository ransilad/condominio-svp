import React from 'react';

const NoResults = ({customClass}) => {
    return (
        <div className="col-12 text-center">
            <img src={'/assets/images/no-results.png'} className={ customClass || "no-results-img-lg"} alt=""/>
        </div>
    );
};

export default NoResults;
