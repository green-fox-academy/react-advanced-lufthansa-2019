import React from 'react';
import { shallow } from 'enzyme';
import FoodFormController from "./FoodFormController";

import {range, required} from "../validators";
import Validate from "../../utils/Validate";
import FoodService from "../../services/FoodService";
jest.mock("../../services/FoodService", () => {
    return {
        get: jest.fn(),
        post: jest.fn(),
        edit: jest.fn()
    }
});

jest.mock("../../utils/Validate");

let validateFieldMock = jest.fn();
let validateFormMock = jest.fn();

Validate.mockReturnValue({
    field: validateFieldMock,
    form: validateFormMock
});


test('should validate values on form submit', () => {
    let ComponentUnderTest = FoodFormController(jest.fn(), 'Create');

    let wrapper = shallow(<ComponentUnderTest />);


    let component = wrapper.instance();

    validateFormMock.mockReturnValue({
        errors: [ { name: 'foodName', result: { errors: ["error"] } } ]
    });

    component.handleFoodFormSubmit();
    expect(validateFormMock).toHaveBeenCalled();

    expect(wrapper.state().formFieldErrors.foodName).toContain('error');
});


test('should validate values on field change', () => {
    let ComponentUnderTest = FoodFormController(jest.fn(), 'Create');

    let wrapper = shallow(<ComponentUnderTest />);

    console.log(wrapper.debug());

    let component = wrapper.instance();

    validateFieldMock.mockReturnValue({
        errors: [ 'error' ]
    });

    component.handleFoodFormFieldChange({ name: 'foodName' });
    expect(validateFieldMock).toHaveBeenCalled();

    expect(wrapper.state().formFieldErrors.foodName).toContain('error');
});