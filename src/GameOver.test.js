import React from 'react';
import { shallow } from 'enzyme';
import GameOver from './GameOver.js';

test('renders gameover correctly no props', () => {
  const wrapper = shallow(<GameOver />);
  expect(wrapper).toMatchSnapshot();
});

test('renders gameover correctly with props', () => {
    const wrapper = shallow(<GameOver 
        hull={0}
        fuel={5}
    />);
    expect(wrapper).toMatchSnapshot();
  });