import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';

import SearchResults from '../../components/SearchResults';

configure({ adapter: new Adapter() });

describe('<SearchResults>', () => {
  
  const cars = [
    { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }
  ];
  const form = {
    location: 'London, United Kingdom',
    max_distance: 1000,
  	number_of_months: 12,
  	number_of_weeks: 52,
  	order_by: "price",
  	order_direction: "asc",
  	page: 1,
  	per_page: 15,
  	price_max: 2500,
  	price_min :100,
  	rolling: false,
  	start_date: '09/09/2018',
  	vehicle_type: "Consumer",
  	subscription_start_days: 30,
  }
  
  const loadingProps = { loading: true, cars: null, form: null };
  const loadedProps = { loading: false, cars, form }
  const loadedNoResultsProps = { loading: false, cars: null, form };
  
  it('should render a spinner when loading', () => {
    const wrapper = shallow(<SearchResults {...loadingProps} />);
    expect(wrapper.html()).to.equal('<div class="fa-3x text-center"><i class="fas fa-spinner fa-spin"></i></div>');
  });
  
  it('should render a car item for each car', () => {
    const wrapper = shallow(<SearchResults {...loadedProps} />);
    expect(wrapper.find('CarItem')).to.have.length(cars.length);
  });
  
  it('should render no results text when there are no items to display', () => {
    const wrapper = shallow(<SearchResults {...loadedNoResultsProps}/>);
    expect(wrapper.html()).to.equal('<div><p>No results found.</p></div>');
  });
});
