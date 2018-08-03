import React from 'react';
import { capitalize, snakeCaseToCapitalize } from '../helpers/string';
import { getCarUrl, getCarImg } from '../helpers/car';
import '../assets/css/carItem.css';

const CarItem = (props) => {
    const { car, priceInfo } = props;
    const { available_start_date,
            engine_size_information,
            features,
            id,
            images,
            mpg,
            number_doors_information,
            number_seats_information,
            vehicle_make,
            vehicle_model,
            year
    } = car;
    const body_information = car.body_information && (car.body_information === 'suv' ? 'SUV' : capitalize(car.body_information));
    const color = car.color && capitalize(car.color);
    const fuel = car.fuel && capitalize(car.fuel);
    const postcode = car.postcode && car.postcode.replace(/ .*/,'');
    const transmission = car.transmission && capitalize(car.transmission);
    const url = getCarUrl(vehicle_make, vehicle_model, id);
    const image_url = getCarImg(images);
    
    return (
        <div className="card car-card d-block">
            <div className="card-image" style={{background: '#888 url('+image_url+') no-repeat 50% 50% / cover'}} />
            <div className="card-content">
                <div className="d-flex px-2 py-1">
                    <div style={{flexGrow: 1}}>
                        <h5 className="card-title font-weight-bold m-0">{vehicle_make} {vehicle_model} {engine_size_information}</h5>
                        <small>Located in {postcode}</small>
                    </div>
                    <small className="d-flex align-items-center text-muted">Available from {available_start_date}</small>
                </div>
                <hr className="m-0"/>
                <div className="card-facts d-flex flex-wrap align-items-center px-2 py-1">
                    <small className="card-fact">
                        <i className="far fa-calendar"></i> {year}
                    </small>
                    <small className="card-fact">
                        <i className="fas fa-car"></i> {body_information}
                    </small>
                    <small className="card-fact">
                        <i className="far fa-calendar"></i> {transmission}
                    </small>
                    <small className="card-fact">
                        <i className="fas fa-gas-pump"></i> {fuel}
                    </small>
                    <small className="card-fact">
                        <i className="far fa-calendar"></i> {number_seats_information} Seats
                    </small>
                    <small className="card-fact">
                        <i className="fas fa-door-closed"></i> {number_doors_information} Doors
                    </small>
                    <small className="card-fact d-none d-lg-block">
                        <i className="fas fa-tachometer-alt"></i> {mpg} MPG
                    </small>
                    <small className="card-fact d-none d-lg-block">
                        <i className="fas fa-brush"></i> {color}
                    </small>
                </div>
                <hr className="m-0"/>
                <div className="card-features d-flex flex-wrap align-items-center p-2">
                    {features.map((feature, index) => (
                        <small className="text-muted" key={index}>
                            <span>{snakeCaseToCapitalize(feature)}</span>
                            <span className="mx-2">&bull;</span>
                        </small>
                    ))}
                </div>
                <div className="card-action d-block d-lg-flex justify-content-end align-items-center px-3 py-2 mx-2 my-1 m-lg-0">
                    { priceInfo.discount > 0 &&
                        <div className="mr-auto">
                            <div className="text-center d-none d-lg-block">
                                <div><small className="previous-rate">was £{priceInfo.previousRate}/month</small></div>
                                <div><small>(save £{priceInfo.discount}/month)</small></div>
                            </div>
                            <div className="d-block d-lg-none">
                                <small className="previous-rate">£{priceInfo.previousRate}</small>
                            </div>
                        </div>
                    }
                    <div className="mr-3">
                        <div className="text-left text-lg-right m-0">
                            <h5 className="d-inline font-weight-bold">£ {priceInfo.rate}</h5>/month
                        </div>
                        <small className="d-block d-sm-inline-block ml-sm-2 ml-md-0">(Monthly Vehicle Price inc. VAT)</small>
                    </div>
                    <a href={url} target="_blank" className="btn card-action-button d-none d-lg-block">See more details</a>
                </div>
                <a href={url} target="_blank" className="btn card-action-button d-block d-lg-none d-xl-none mx-2 my-2">See more details</a>
            </div>
        </div>
    );
};

export default CarItem;
