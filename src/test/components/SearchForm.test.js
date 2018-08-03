import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';

import SearchForm from '../../components/SearchForm';

configure({ adapter: new Adapter() });

describe('<SearchForm>', () => {
  
  const initialValues = {
    location: 'London, United Kingdom',
    max_distance: 150,
  	number_of_months: 12,
  	number_of_weeks: 52,
  	order_by: "price",
  	order_direction: "asc",
  	page: 2,
  	per_page: 15,
  	price_max: 1480,
  	price_min :570,
  	rolling: false,
  	start_date: "10/10/2018",
  	vehicle_type: "Consumer",
  	subscription_start_days: 30,
  };
  
  const metadata = {
    total_count: 3,
    aggregations: {
      vehicle_make: { Audi: 2, Honda: 1, },
      transmission: { manual: 1, automatic: 2, },
      year: { 2016: 1, 2017: 1, 2018: 1, },
      fuel: { diesel: 1, petrol: 2, }
    }
  }
    
  const wrapper = shallow(<SearchForm formValues={initialValues} metadata={metadata} />);
  
  it('should initialize with values', () => {
    expect(wrapper.find('input#location').props().value).to.equal('London, United Kingdom');
    expect(wrapper.find('select#max_distance').props().value).to.equal(150);
  });
  
  it('should render the form', () => {
    expect(wrapper.find('form#search_form')).to.have.length(1);
  });

});
