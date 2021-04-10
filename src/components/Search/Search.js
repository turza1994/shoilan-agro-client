import React from 'react';

const Search = () => {
    return (
        <div className="d-flex justify-content-center input-group-lg">
            <input className="w-50 me-1 form-control" type="text" placeholder="search products"/>
            <button className="btn btn-success btn-lg">Search</button>
        </div>
    );
};

export default Search;