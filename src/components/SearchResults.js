import React, { Component } from 'react';
import CarItem from './CarItem';
import { getPrice } from '../helpers/car';

class SearchResults extends Component {
    render() {
        
        const { loading, cars, form } = this.props;
        
        if (loading) {
            return (
                <div className="fa-3x text-center">
                    <i className="fas fa-spinner fa-spin"></i>
                </div>);
        }
        
        if (!cars || !cars.length) {
            return (
                <div>
                    <p>No results found.</p> 
                </div>
            );
        }
        
        return (
            <div>
                { cars.map(car => (<CarItem car={car} priceInfo={getPrice(car, form)} key={car.id}/>)) }
            </div>
        );
    }
}

export default SearchResults;
