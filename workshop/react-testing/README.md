# React testing

Enzyme is a JavaScript Testing utility for React that makes it easier to test your React Components' output. You can also manipulate, traverse, and in some ways simulate runtime given the output.

## Materials & Resources

| Material                                                                                                                                                                                     |     Time |
|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------:|
| [Components testing in React: what and how to test with Jest and Enzyme](https://medium.freecodecamp.org/components-testing-in-react-what-and-how-to-test-with-jest-and-enzyme-7c1cace99de5) |  reading |
| [Testing Strategies for React and Redux](https://hacks.mozilla.org/2018/04/testing-strategies-for-react-and-redux/)                                                                          |  reading |
| [Testing React components with Jest and Enzyme](https://hackernoon.com/testing-react-components-with-jest-and-enzyme-41d592c174f)                                                            |  reading |
| [Enzyme cheatsheet](https://devhints.io/enzyme)                                                                                                                                              |  reading |
| [Shallow Rendering](https://airbnb.io/enzyme/docs/api/shallow.html)                                                                                                                          |  reading |
| [Full Rendering](https://airbnb.io/enzyme/docs/api/mount.html)                                                                                                                               |  reading |
| [React Testing Examples](https://react-testing-examples.com/)                                                                                                                                | examples |
| [Snapshot Testing](https://jestjs.io/docs/en/snapshot-testing)                                                                                                                               | examples |
| [Effective Snapshot Testing](https://kentcdodds.com/blog/effective-snapshot-testing)                                                                                                         | examples |
| [Why I Never Use Shallow Rendering](https://kentcdodds.com/blog/why-i-never-use-shallow-rendering)                                                                                           | examples |
| [Why I Always Use Shallow Rendering](https://hackernoon.com/why-i-always-use-shallow-rendering-a3a50da60942)                                                                                 | examples |

## Optional

| Material                                                                                                                    |    Time |
|:----------------------------------------------------------------------------------------------------------------------------|--------:|
| [React Test Renderer](https://itnext.io/testing-react-16-3-components-with-react-test-renderer-without-enzyme-d9c65d689e88) | reading |
| [Testing Jest Enzyme](https://github.com/ned-alyona/testing-jest-enzyme)                                                    | reading |

## Material Review

- What to test in a React application?
  - Should you test the state of the component?
  - What's a unit test in React?
  - What's an integration test in React?
- What's Enzyme?
- What's shallow rendering?
  - What are the benefits on shallow rendering?
  - What are the drawbacks of shallow rendering?
- How do you test the properties of the component?
- How do you test user events?
- How to locate components in the Wrapper?
- What's snapshot testing?
  - Should snapshot files be committed?
- How to test Redux connected components?

## Workshop

### Project Setup

Open up a React project you created previously. If you created the project with `create-react-app`, then you already have Jest installed, otherwise [install it first](https://jestjs.io/docs/en/getting-started).

#### Install Enzyme and `react-test-renderer`

```bash
npm i --save-dev enzyme enzyme-adapter-react-16 jest-enzyme react-test-renderer
```

The adapter will also need to be configured in your global setup file `src/setupTests.js`:

```javascript
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

configure({ adapter: new Adapter() });
```

#### Editor support

To have code completion in your editor install the following packages:

```bash
npm i --save-dev @types/jest @types/enzyme @types/react-test-renderer
```

If you use Visual Studio Code, there is a [Jest extension](https://github.com/jest-community/vscode-jest) which works with Create React App out of the box.

### Enzyme introduction

Enzyme helps you query the mounted components:

```javascript
import React from 'react';
import { mount } from 'enzyme';
import App from './App';

it('has a h1 heading with valid text', () => {
  let wrapper = mount(<App />);

  expect(wrapper.exists('h1')).toBe(true);
  expect(wrapper.find('h1').text()).toBe('Welcome to React');
});
```

This test checks if the `<h1>` element exist and checks it's text content.

### Simulating user events for functional tests

You can create functional tests by simulation user event. Let's imagine you have a `<LoginForm />` with a `username` and `password` field and you want to simulate user input and button click to test the login functionality.

```javascript
test('should start login for user', () => {
    let wrapper = mount(<LoginForm />);

    wrapper.find('input[name="username"]').simulate('change', {target: {name: 'username', value: 'petike'}});
    wrapper.find('input[name="password"]').simulate('change', {target: {name: 'password', value: '123'}});

    wrapper.find('form').simulate('submit');

    // Check if the local storage has the auth token
    expect(localStorage.getItem('auth-token')).toContain(token);
});
```

This time we've used `mount` instead of shallow rendering, and we're not using mocking to test the correct functionality (except mocking the backend).

Note that we're trying to rely on as little implementation detail as possible.

### Shallow rendering

For **unit tests** you can choose "shallow" rendering:

```javascript
import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  let wrapper = shallow(<App />);

  console.log(wrapper.debug());
});
```

It runs much faster than rendering the whole application to the DOM, because **it doesn't render the child components** nor does it run the lifecycle events.

### Recursive shallow rendering

Sometimes `mount` renders "too much", but `shallow` provides "too little" to perform the required operations.

You can call the `.shallow()` method on a wrapper to shallow render the child element.

Let's imagine that you have a `<Form />` and to be able to unit test it you want to have the `<Button />`

```javascript
test('renders correctly', () => {
    let wrapper = shallow(<Form />);

    let buttonWrapper = wrapper.find(Button).shallow();

    console.log(buttonWrapper.debug());

    expect(buttonWrapper.find('button')).toHaveClassName('btn');
});
```

Sometimes you have to dig even deeper; therefore, you may want to use the [`enzyme-extensions`](https://github.com/commercetools/enzyme-extensions) package.

### Snapshot testing

You can use `react-test-renderer` together with Jest to create snapshot tests:

```javascript
import InputField from "../InputField";
import renderer from 'react-test-renderer'

test('snapshot test', () => {
    let wrapper = renderer.create(<InputField />).toJSON();
    expect(wrapper).toMatchSnapshot();
});
```

When you first run this test it'll create a new snapshot under the `__snapshots__` folder. Next time the test will compare the result with the existing snapshot if it's changed.

### Exercises

- Create at least three unit test for a low level component using shallow rendering
- Create at least three unit test for a higher level component using shallow rendering
- Create at least three snapshot tests
- Create at least two integration tests using `mount` simulating user events
