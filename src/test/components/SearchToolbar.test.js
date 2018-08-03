import React from 'react';
import { configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';

import SearchToolbar from '../../components/SearchToolbar';

configure({ adapter: new Adapter() });

describe('<SearchToolbar>', () => {
  
  const loadingProps = { loading: true, orderBy: null, orderDirection: null };
  
  it('should render nothing when loading', () => {
    const wrapper = shallow(<SearchToolbar {...loadingProps} />);
    expect(wrapper.html()).to.equal('<div></div>');
  });
  
  it('should render a select with options', () => {
    const wrapper = mount(<SearchToolbar loading={false} orderBy={'price'} orderDirection={'asc'} />);
    expect(wrapper.find('.form-group')).to.have.length(1);
    expect(wrapper.find('option')).to.have.length(4);
  });
  
  it('should sort by price ascending', () => {
    const wrapper = mount(<SearchToolbar loading={false} orderBy={'price'} orderDirection={'asc'} />);
    expect(wrapper.find('select').props().value).to.equal(1);
  });
  
  it('should sort by price descending', () => {
    const wrapper = mount(<SearchToolbar loading={false} orderBy={'price'} orderDirection={'desc'} />);
    expect(wrapper.find('select').props().value).to.equal(2);
  });
  
  it('should sort by distance', () => {
    const wrapper = mount(<SearchToolbar loading={false} orderBy={'distance'} orderDirection={'asc'} />);
    expect(wrapper.find('select').props().value).to.equal(3);
  });
  
  it('should sort by recommended', () => {
    const wrapper = mount(<SearchToolbar loading={false} orderBy={'recommended'} orderDirection={'asc'} />);
    expect(wrapper.find('select').props().value).to.equal(4);
  });
  
  it('should sort by price descending if incorrect values are given', () => {
    const wrapper = mount(<SearchToolbar loading={false} orderBy={'wrong'} orderDirection={'wrong'} />);
    expect(wrapper.find('select').props().value).to.equal(1);
  });
});
