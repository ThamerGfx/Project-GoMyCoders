import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import './index.css';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import 'bootstrap/dist/css/bootstrap.min.css';
//components
import App from './App';
//reducers
import rootReducer from './store/reducers/rootReducer'

const myStore = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
    <BrowserRouter>
    <Provider store = { myStore }>
        <App />
    </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);