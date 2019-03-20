import React from 'react';
import MainPage from "./";
import { mount } from 'enzyme';
import {createStore} from "redux";
import reducer from "../../reducer";
import I18nContext from '../../context/I18nContext';
import FoodService from "../../services/FoodService";
import {Provider} from "react-redux";

jest.mock("../../services/FoodService", () => {
    return {
        get: jest.fn(),
        post: jest.fn().mockResolvedValue({ id: 1 }),
        edit: jest.fn()
    }
});

test('food form adds values to the food table', async () => {
    let store = createStore(reducer);
    let locale = {
        i18n: {
            t: jest.fn()
        }
    };

    let wrapper = mount(<I18nContext.Provider value={locale}>
        <Provider store={store}>
            <MainPage />
        </Provider>
    </I18nContext.Provider>);

    console.log(wrapper.debug());

    wrapper.find('input[name="foodName"]')
        .simulate('change', { target: { name: 'foodName', value: 'test food' } });
    wrapper.find('input[name="calorieAmount"]')
        .simulate('change', { target: { name: 'calorieAmount', value: '123' } });

    await wrapper.find('MainFoodForm form').simulate('submit');

    let table = wrapper.find('MainFoodTable [data-testid="food-table"]');

    expect(table.text()).toContain('test food');
    expect(table.text()).toContain('123');
});
