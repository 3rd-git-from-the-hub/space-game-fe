import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

test('renders app correctly', () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toMatchSnapshot();
});