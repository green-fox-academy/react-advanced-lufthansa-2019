import Button from './Button';
import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

beforeEach(()=>{});
afterEach(()=>{});

test('Button should render correctly', () => {
    let div = document.createElement('div');
    ReactDOM.render(<Button type="button">hello</Button>, div);

    //console.log(div);

    let buttonText = div.querySelector('button').textContent;

    expect(buttonText).toBe('hello');
});

test('Button should render correctly using mount', () => {

    let wrapper = mount(<Button type="button">hello</Button>);

    //console.log(wrapper.debug());

    expect(wrapper.find('button')).toHaveText('hello');
});

test('snapshot testing button', () => {
    let json = renderer
        .create(<Button type="button">hello</Button>)
        .toJSON();

    expect(json).toMatchSnapshot();
});
