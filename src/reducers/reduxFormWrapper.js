import {
  SHOW_ERROR_ADD_SELECT_OPTIONS,
  HIDE_ERROR_ADD_SELECT_OPTIONS,
} from '../actions/dynamicSpreadsheet/modalAddColumn';

export default formReducer => (state = {}, action) => {
  switch (action.type) {
    case SHOW_ERROR_ADD_SELECT_OPTIONS: {
      const newState = { ...state };
      if (!newState[action.form].syncErrors) {
        newState[action.form].syncErrors = { [action.field]: action.messageKey };
      } else newState[action.form].syncErrors[action.field] = action.messageKey;
      if (newState[action.form].fields[action.field]) {
        newState[action.form].fields[action.field].touched = true;
      } else newState[action.form].fields[action.field] = { touched: true };
      return newState;
    }
    case HIDE_ERROR_ADD_SELECT_OPTIONS:
      return {
        ...state,
        [action.form]: {
          ...state[action.form],
          syncErrors: {
            ...state[action.form].syncErrors,
            [action.field]: undefined,
          },
        },
      };
    default:
      return formReducer(state, action);
  }
};
