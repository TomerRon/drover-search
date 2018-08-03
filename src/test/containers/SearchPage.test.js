import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';

import SearchPage from '../../containers/SearchPage';

configure({ adapter: new Adapter() });

describe('<SearchPage>', () => {
  
  const wrapper = shallow(<SearchPage />);
  
  it('should initialize with default values', () => {
    expect(wrapper.state().loading).to.equal(true);
    expect(wrapper.state().cars).to.equal(null);
    expect(wrapper.state().form.location).to.equal('London, United Kingdom');
  });
  
  it('should render the search form, toolbar, results and pagination', () => {
    expect(wrapper.find('SearchForm')).to.have.length(1);
    expect(wrapper.find('SearchToolbar')).to.have.length(1);
    expect(wrapper.find('SearchResults')).to.have.length(1);
    expect(wrapper.find('SearchPagination')).to.have.length(1);
  });
});
