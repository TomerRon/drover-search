import React, { Component } from 'react';

const SearchPaginationItem = (props) => {
    const { pageNumber, handleClick, disabled } = props;
    const className = "page-item" + (disabled ? " disabled" : "");
    return (
        <li className={className}>
          <button className="page-link" onClick={() => handleClick(pageNumber)}>
            {pageNumber}
          </button>
        </li>
    );
};

class SearchPagination extends Component {
    render() {
        const { loading, onPaginationClick, pageCurrent, pageTotal } = this.props;
        
        if (loading) return <div/>;
        
        return (
            <ul className="pagination" aria-label="Search results navigation">
                { pageCurrent > 3 && 
                <li className="page-item">
                    <button className="page-link" aria-label="First" onClick={() => onPaginationClick(1)}>
                        <span aria-hidden="true">«</span>
                        <span className="sr-only">First</span>
                    </button>
                </li>}
                
                { pageCurrent > 2 && <SearchPaginationItem pageNumber={pageCurrent-2} handleClick={onPaginationClick} /> }
                
                { pageCurrent > 1 && <SearchPaginationItem pageNumber={pageCurrent-1} handleClick={onPaginationClick} /> }
                
                <SearchPaginationItem pageNumber={pageCurrent} handleClick={onPaginationClick} disabled />
                
                { pageCurrent+1 <= pageTotal && <SearchPaginationItem pageNumber={pageCurrent+1} handleClick={onPaginationClick} /> }
                
                { pageCurrent+2 <= pageTotal && <SearchPaginationItem pageNumber={pageCurrent+2} handleClick={onPaginationClick} /> }
                
                { pageCurrent+3 <= pageTotal && 
                <li className="page-item">
                    <button className="page-link" aria-label="Last" onClick={() => onPaginationClick(pageTotal)}>
                        <span aria-hidden="true">»</span>
                        <span className="sr-only">Last</span>
                    </button>
                </li>}
            </ul>
        );
    }
}

export default SearchPagination;
