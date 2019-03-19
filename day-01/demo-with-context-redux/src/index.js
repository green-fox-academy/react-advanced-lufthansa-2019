import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {loadI18n} from "./utils/i18n";
import reducer from './reducer'

let store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

loadI18n()
    .then(i18n => {
        ReactDOM.render(
            <Provider store={store}>
                <App i18n={i18n}/>
            </Provider>
            , document.getElementById('root'));
    });

serviceWorker.unregister();
