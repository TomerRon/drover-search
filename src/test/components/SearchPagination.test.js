import React from 'react';
import { configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';

import SearchPagination from '../../components/SearchPagination';

configure({ adapter: new Adapter() });

describe('<SearchPagination>', () => {
  
  const loadingProps = { loading: true, pageCurrent: 1, pageTotal: null };
  
  it('should render nothing when loading', () => {
    const wrapper = shallow(<SearchPagination {...loadingProps} />);
    expect(wrapper.html()).to.equal('<div></div>');
  });
  
  it('should render a single button when pageTotal is 1', () => {
    const wrapper = mount(<SearchPagination loading={false} pageCurrent={1} pageTotal={1} />);
    expect(wrapper.find('li.page-item')).to.have.length(1);
  });
  
  it('should render multiple buttons when pageTotal is greater than 1', () => {
    const wrapper = mount(<SearchPagination loading={false} pageCurrent={3} pageTotal={4} />);
    expect(wrapper.find('li.page-item')).to.have.length(4);
  });
  
  it('should render a maximum of 7 buttons - five to move to pages around the current page, and two to jump to the first or last page', () => {
    const wrapper = mount(<SearchPagination loading={false} pageCurrent={25} pageTotal={88} />);
    expect(wrapper.find('li.page-item')).to.have.length(7);
  });
});
