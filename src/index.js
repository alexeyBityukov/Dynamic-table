import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import DynamicSpreadsheetContainer from './components/DynamicSpreadsheet/DynamicSpreadsheetContainer.jsx';
import store from './store';

const App = () => (
  <div className="App">
    <DynamicSpreadsheetContainer />
  </div>
);

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement,
);
