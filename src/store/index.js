import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import dynamicSpreadsheetReducer from '../reducers/dynamicSpreadsheet';
import reduxFromWrapper from '../reducers/reduxFormWrapper';
import reducer from '../reducers';

export default createStore(
  combineReducers({
    main: reducer,
    dynamicSpreadsheet: dynamicSpreadsheetReducer,
    form: reduxFromWrapper(formReducer),
  }),
);
