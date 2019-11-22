import { ShallowWrapper, shallow } from 'enzyme';
import * as React from 'react';

import { Counter, CounterProps } from '../';

describe('Counter Component', () => {
  let props: CounterProps;
  let wrapper: ShallowWrapper<CounterProps>;

  beforeAll(() => {
    props = {
      className: 'counter-test',
      value: 0,
    };
    wrapper = shallow(<Counter {...props} />);
  });

  it('render component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('render init value', () => {
    expect(wrapper.find('.value').text()).toBe(String(props.value));
  });

  it('render class name', () => {
    expect(wrapper.find(`.${props.className}`)).not.toBeNull();
  });
});
