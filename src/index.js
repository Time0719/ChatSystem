import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import App from './app';
import { counter } from './index.redux';


const store = createStore(counter, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

const render = () => {
    ReactDOM.render(
        (
            <Provider store={store}>
                <App />
            </Provider>
        ),
        document.getElementById('root'));
};
render();

store.subscribe(render);