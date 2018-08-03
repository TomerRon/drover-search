import React, { Component } from 'react';
import { capitalize } from '../helpers/string';
import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css';

class SearchForm extends Component {
    
    render() {
        const { formValues, metadata, onBlur, onChange, onChangeSlider, onSubmit } = this.props;
        const { aggregations } = metadata;
        return (
            <form id="search_form" onSubmit={onSubmit}>
                <div className="position-relative form-group">
                    <label htmlFor="location">Location</label>
                    <input className="form-control" type="text" name="location" id="location" value={formValues.location} onChange={onChange} onBlur={onBlur} />
                </div>
                <div className="position-relative form-group">
                    <label htmlFor="subscription_start_days">Subscription starts within the</label>
                    <select className="form-control" name="subscription_start_days" id="subscription_start_days" value={formValues.subscription_start_days} onChange={onChange} onBlur={onBlur}>
                        <option value={2}>Next 2 Days</option>
                        <option value={14}>Next 14 Days</option>
                        <option value={30}>Next 30 Days</option>
                    </select>
                </div>
                <div className="position-relative form-group">
                    <label htmlFor="max_distance">Distance (radius in miles)</label>
                    <select className="form-control" name="max_distance" id="max_distance" value={formValues.max_distance} onChange={onChange} onBlur={onBlur}>
                        <option>25</option>
                        <option>50</option>
                        <option>75</option>
                        <option>100</option>
                        <option>150</option>
                        <option>200</option>
                        <option value={1000}>Nationwide</option>
                    </select>
                </div>
                <div className="position-relative form-group">
                    <label>Monthly Budget</label>
                    <p>£{formValues.price_min} - £{formValues.price_max}</p>
                    <Range
                        trackStyle={[{ backgroundColor: '#50ff7d', border: '2px solid #172B24' }]}
                        handleStyle={[{ backgroundColor: '#50ff7d', border: '2px solid #172B24' }, { backgroundColor: '#50ff7d', border: '2px solid #172B24' }]}
                        railStyle={{ backgroundColor: '#e4e3e3', height: '5px', border: '1px solid #f5f5f5' }}
                        id="budget"
                        min={100}
                        max={2500}
                        step={10}
                        value={[formValues.price_min, formValues.price_max]}
                        onChange={(e) => { onChangeSlider(e, 'price_min', 'price_max' ) }}
                        onAfterChange={onBlur}
                    />
                </div>
                <div className="position-relative form-group">
                    <label htmlFor="vehicle_make">Vehicle Make</label>
                    <select className="form-control" name="vehicle_make" id="vehicle_make" value={formValues.vehicle_make} onChange={onChange} onBlur={onBlur}>
                        <option value={''}>Any</option>
                        {aggregations && Object.keys(aggregations.vehicle_make).map((make, index) => (
                            <option value={make} key={index}>{make}: ({aggregations.vehicle_make[make]})</option>
                        ))}
                        {aggregations && formValues.vehicle_make && (!(formValues.vehicle_make in aggregations.vehicle_make)) &&
                            <option value={formValues.vehicle_make}>{formValues.vehicle_make}: (0)</option>
                        }
                    </select>
                </div>
                <div className="position-relative form-group">
                    <label htmlFor="transmission">Gearbox</label>
                    <select className="form-control" name="transmission" id="transmission" value={formValues.transmission} onChange={onChange} onBlur={onBlur}>
                        <option value={''}>Any</option>
                        {aggregations && Object.keys(aggregations.transmission).map((t, index) => (
                            <option value={t} key={index}>{capitalize(t)}: ({aggregations.transmission[t]})</option>
                        ))}
                        {aggregations && formValues.transmission && (!(formValues.transmission in aggregations.transmission)) &&
                            <option value={formValues.transmission}>{capitalize(formValues.transmission)}: (0)</option>
                        }
                    </select>
                </div>
                <div className="position-relative form-group">
                    <label>Number of Seats</label>
                    <p>{formValues.number_of_seats_min} - {formValues.number_of_seats_max} Seats</p>
                    <Range
                        trackStyle={[{ backgroundColor: '#50ff7d', border: '2px solid #172B24' }]}
                        handleStyle={[{ backgroundColor: '#50ff7d', border: '2px solid #172B24' }, { backgroundColor: '#50ff7d', border: '2px solid #172B24' }]}
                        railStyle={{ backgroundColor: '#e4e3e3', height: '5px', border: '1px solid #f5f5f5' }}
                        id="number_of_seats"
                        min={2}
                        max={9}
                        step={1}
                        value={[parseInt(formValues.number_of_seats_min, 10), parseInt(formValues.number_of_seats_max, 10)]}
                        onChange={(e) => { onChangeSlider(e, 'number_of_seats_min', 'number_of_seats_max' ) }}
                        onAfterChange={onBlur}
                    />
                </div>
                <div className="position-relative form-group">
                    <label htmlFor="year">Year</label>
                    <select className="form-control" name="year" id="year" value={formValues.year} onChange={onChange} onBlur={onBlur}>
                        <option value={''}>Any</option>
                        {aggregations && Object.keys(aggregations.year).map((y, index) => (
                            <option value={y} key={index}>{y}: ({aggregations.year[y]})</option>
                        ))}
                        {aggregations && formValues.year && (!(formValues.year in aggregations.year)) &&
                            <option value={formValues.year}>{formValues.year}: (0)</option>
                        }
                    </select>
                </div>
                <div className="position-relative form-group">
                    <label htmlFor="fuel">Fuel Type</label>
                    <select className="form-control" name="fuel" id="fuel" value={formValues.fuel} onChange={onChange} onBlur={onBlur}>
                        <option value={''}>Any</option>
                        {aggregations && Object.keys(aggregations.fuel).map((f, index) => (
                            <option value={f} key={index}>{capitalize(f)}: ({aggregations.fuel[f]})</option>
                        ))}
                        {aggregations && formValues.fuel && (!(formValues.fuel in aggregations.fuel)) &&
                            <option value={formValues.fuel}>{capitalize(formValues.fuel)}: (0)</option>
                        }
                    </select>
                </div>
                <div className="position-relative form-group">
                    <label htmlFor="vehicle_type">Vehicle Type</label>
                    <select className="form-control" name="vehicle_type" id="vehicle_type" value={formValues.vehicle_type} onChange={onChange} onBlur={onBlur}>
                        <option>Consumer</option>
                        <option>PCO</option>
                    </select>
                </div>
            </form>
        );
    }
}

export default SearchForm;
