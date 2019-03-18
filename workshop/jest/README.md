# Jest

Jest is a delightful JavaScript Testing Framework with a focus on simplicity.

## Environment

You must have [Node.js](https://nodejs.org/) installed.

## Materials and Resources

| Material                                                                   |    Time |
|:---------------------------------------------------------------------------|--------:|
| [Jest Explained](https://www.youtube.com/watch?v=b3VJVwQzw_Q)              |    8:36 |
| [Writing Our First Jest Test](https://www.youtube.com/watch?v=4kNfeI37xu4) |   12:08 |
| [Mocking Axios in Jest](https://www.youtube.com/watch?v=9Yrd4aZkse8)       |   17:42 |
| [Using Matchers](https://jestjs.io/docs/en/using-matchers)                 | Reading |
| [Testing Asynchronous Code](https://jestjs.io/docs/en/asynchronous)        | Reading |
| [Mock Functions](https://jestjs.io/docs/en/mock-functions)                 | Reading |

### Optional

| Material                                                         |  Time |
|:-----------------------------------------------------------------|------:|
| [Jest Architecture](https://www.youtube.com/watch?v=3YDiloj8_d0) | 51:00 |

## Material Review

- How do you create and run unit tests with Jest?
- How do you test for exception?
- How do you write code which runs before every test?
- How do you test asynchronous code (callbacks, Promise, async/await)?
- How you use Jest mock functions?
  - How do you mock a function with `Promise` return values?
  - How do you create mocks for ES6 classes?
  - How do you mock modules?

### Optional

- How do you mock timers?
- How do you measure code coverage?

## Workshop

### Project setup

#### Install and Configure Jest with Babel

```bash
npm init -y
npm install --save-dev jest @babel/core @babel/preset-env
```

Change the following section in your `package.json`:

```javascript
{
  //...
  "scripts": {
    "test": "jest --watchAll"
  }
  //...
}
```

#### Configure Babel

Create a file called `babel.config.js` with the following content:

```javascript
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};
```

#### (Optional) Set up editor support

To have code completion in your editor install the following package:

```bash
npm install --save-dev @types/jest
```

#### Set up folder structure

Create a folder called `src`. Every source file is placed in this folder with their corresponding test using the `.test.js` file extension.

### Write your first test scenario

Create a file called `math.js` with the following methods:

```javascript
export function sum(a, b) {
  return a + b;
}

export function divide(a, b) {
  if (b === 0) {
    throw new Error('Unable to divide by 0');
  }

  return a / b;
}

export function isPrime(num) {
  for(var i = 2; i < num; i++)
    if(num % i === 0) return false;
  return num > 1;
}
```

Create a file called `math.test.js` with a single test scenario:

```javascript
import { sum } from './math'

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

Now you can run your first test by running the following command in your terminal:

```bash
$ npm test

 PASS  ./math.test.js
  √ adds 1 + 2 to equal 3 (3ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        3.327s
Ran all test suites.
```

### Additional tests

Write additional tests for the other methods in the `math` module:

- Test every method with correct input parameters
- Test if the `divide` method throws an exception if `b` is `0`

### Testing Asynchronous API calls

Let's imagine you have to fetch data from a web API, and you want to create a test for it. Create a file called `SwAPI.js` with the following API service in your application:

```javascript
export default class SwAPI {
  getPerson(id) {
    if (!id) {
      throw new Error('id must be a positive number');
    }

    return fetch(`https://swapi.co/api/people/${id}`)
      .then(response => response.json());
  }

  getPeople() {
    return fetch(`https://swapi.co/api/people`)
      .then(response => response.json());
  }
}
```

First of all we'll need to provide the `fetch` API call as it doesn't exist in the test environment. Let's use the `cross-fetch` package:

```bash
npm install --save-dev cross-fetch
```

After installing the package we'll have to set it up for every test, you can do that by creating a global test configuration file.

Create a file called `src/setupTests.js` with the following content:

```javascript
global.fetch = require('cross-fetch');
```

Then add the following lines to `package.json`:

```json
"jest": {
  "setupFiles": [
    "./src/setupTests.js"
  ]
}
```

Now you can start testing the service call by creating the `SwAPI.test.js` file:

```javascript
import SwAPI from './SwAPI';

let api;

beforeEach(() => {
  api = new SwAPI();
});

test('getPerson returns non-null result', done => {
  api.getPerson(1)
    .then(result => {
      expect(result).not.toBeNull();
      done();
    });
});
```

Note that in this scenario you must call the `done()` method. **Comment out the `done()` method call and check out what happens.**

An alternative to this is to return the promise to Jest and let the library handle the situation:

```javascript
import SwAPI from './SwAPI';

let api;

beforeEach(() => {
  api = new SwAPI();
});

test('getPerson returns non-null result', () => {
  return api.getPerson(1)
    .then(result => {
      expect(result).not.toBeNull();
    });
});
```

Check out what happens if you forget to return the promise in this setup.

### async/await to the rescue

The best solution for this situation in the leverage the async/await feature:

```javascript
import SwAPI from './SwAPI';

let api;

beforeEach(() => {
  api = new SwAPI();
});

test('getPerson returns non-null result', async () => {
  let result = await api.getPerson(1);

  expect(result).not.toBeNull();
});
```

This is by far the most readable and elegant solution out of the three.

### Let's mock the actual HTTP call

Unless you're creating an integration/E2E test you don't want to make an actual HTTP request, but mock the call and return a "fake" object instead.

Your task is use Jest function mocking feature (`jest.fn()`) to mock the `fetch` method before calling the `api.getPerson()` method.

```javascript
global.fetch = jest.fn();
// your task is to set up the fetch mock below:

```

Check out how much faster your tests became (depends on network speed of course).
Alternatively you can use the `jest-fetch-mock` package as well.

> You could also change the `SwAPI` class not to use the global `fetch`, but to use dependency injection instead.

### Mocking classes and modules

Create the following class which depends on the `SwAPI` called `SwStatistics`:

```javascript
import SwAPI from './SwAPI';

export default class SwStatistics {
  constructor() {
    this.swAPI = new SwAPI();
  }

  async count() {
    let people = await this.swAPI.getPeople();

    return people.results.length;
  }

  async averageHeight() {
    let people = await this.swAPI.getPeople();

    let heights = people.results
      .map(c => c.height)
      .filter(h => h != null)
      .map(h => Number(h))
      .filter(h => !isNaN(h));

    return heights.reduce((sum, current) => current + sum, 0) / heights.length;
  }
}
```

Your task is to create unit tests for the `count` and `averageHeight` methods. For that you have to mock the entire `SwAPI` module using `jest.mock()` method. (Hint: remember that an ES6 class is just a constructor function.)

### (Optional) Code Coverage

Check the code coverage of your tests. Are you satisfied?

### (Optional) Run Against the Clock

Imagine the following class:

```javascript
export default class LoadingIndicator {
  constructor() {
    this.message = 'Loading...';

    setTimeout(() => { this.message = 'Loaded' }, 200);
  }

  getMessage() {
    return this.message;
  }
}
```

Your job is to test the `getMessage()` method: initially it must return `"Loading..."`, then `"Loaded"` after the timeout.
