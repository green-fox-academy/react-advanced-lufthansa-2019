import React from 'react';
import FoodForm from './FoodForm';
import { mount, shallow } from 'enzyme';

test('FoodForm renders correctly', () => {
    let wrapper = shallow(<FoodForm
        values={{ foodName: 'test food', calorieAmount: '123' }}
        errors={{ foodName: 'food name is required' }}
    />);

    console.log(wrapper.debug());

    expect(wrapper.find("#foodName")).toHaveValue('test food');
    expect(wrapper.find("#foodName")).toHaveProp('error', 'food name is required');
});
