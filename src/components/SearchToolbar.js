import React, { Component } from 'react';

class SearchToolbar extends Component {
    render() {
        
        const { loading, orderBy, orderDirection, onChange, onBlur } = this.props;
        
        const getSelectedOption = () => {
            switch(orderBy) {
                case 'price':
                    return ( orderDirection === 'asc' ? 1 : 2 );
                case 'distance':
                    return 3;
                case 'recommended':
                    return 4;
                default:
                    return 1;
            }
        };
        
        const handleChange = (e) => {
            e.target.blur(); // Blur the field, which will trigger a search
            switch (e.target.value) {
                case '1':
                    return onChange('price', 'asc');
                case '2':
                    return onChange('price', 'desc');
                case '3':
                    return onChange('distance', 'asc');
                case '4':
                    return onChange('recommended', 'asc');
                default:
                    return null;
            }
        };
        
        if (loading) return <div/>;
        
        return (
            <div>
                <div className="ml-auto position-relative form-group" style={{maxWidth: '200px'}}>
                    <select className="form-control" type="select" name="sort" id="sort" value={getSelectedOption()} onChange={handleChange} onBlur={onBlur}>
                        <option value={1}>Price - Low to High</option>
                        <option value={2}>Price - High to Low</option>
                        <option value={3}>Distance - Close to Far</option>
                        <option value={4}>Recommended</option>
                    </select>
                </div>
            </div>
        );
    }
}

export default SearchToolbar;
