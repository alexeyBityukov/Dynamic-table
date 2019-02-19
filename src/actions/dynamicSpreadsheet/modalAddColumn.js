export const SHOW_MODAL_ADD_COLUMN = 'SHOW_MODAL_ADD_COLUMN';
export const HIDE_MODAL_ADD_COLUMN = 'HIDE_MODAL_ADD_COLUMN';
export const SHOW_FIELD_ADD_SELECT_OPTIONS = 'SHOW_FIELD_ADD_SELECT_OPTION';
export const HIDE_FIELD_ADD_SELECT_OPTIONS = 'HIDE_FIELD_ADD_SELECT_OPTION';
export const SHOW_ERROR_ADD_SELECT_OPTIONS = 'SHOW_ERROR_ADD_SELECT_OPTIONS';
export const HIDE_ERROR_ADD_SELECT_OPTIONS = 'HIDE_ERROR_ADD_SELECT_OPTIONS';
export const ADD_SELECT_OPTIONS = 'ADD_SELECT_OPTIONS';
export const REMOVE_SELECT_OPTIONS = 'REMOVE_SELECT_OPTIONS';
export const ADD_COLUMN = 'ADD_COLUMN';
export const ADD_ROWS = 'ADD_ROWS';
export const REMOVE_ALL_SELECT_OPTIONS = 'REMOVE_ALL_SELECT_OPTIONS';
export const UPDATE_COLUMN_TITLE = 'UPDATE_COLUMN_TITLE';
export const UPDATE_CELL_VALUE = 'UPDATE_CELL_VALUE';

export const showModalAddColumn = () => ({
  type: SHOW_MODAL_ADD_COLUMN,
});

export const hideModalAddColumn = () => ({
  type: HIDE_MODAL_ADD_COLUMN,
});

export const showFieldAddSelectOptions = () => ({
  type: SHOW_FIELD_ADD_SELECT_OPTIONS,
});

export const hideFieldAddSelectOptions = () => ({
  type: HIDE_FIELD_ADD_SELECT_OPTIONS,
});

export const showErrorAddSelectOptions = (form, field, messageKey) => ({
  type: SHOW_ERROR_ADD_SELECT_OPTIONS,
  messageKey,
  form,
  field,
});

export const hideErrorAddSelectOptions = (form, field) => ({
  type: HIDE_ERROR_ADD_SELECT_OPTIONS,
  form,
  field,
});

export const addSelectOption = option => ({
  type: ADD_SELECT_OPTIONS,
  option,
});

export const removeSelectOption = option => ({
  type: REMOVE_SELECT_OPTIONS,
  option,
});

export const addColumn = value => ({
  type: ADD_COLUMN,
  value,
});

export const addRows = () => ({
  type: ADD_ROWS,
});

export const removeAllSelectOption = () => ({
  type: REMOVE_ALL_SELECT_OPTIONS,
});

export const updateColumnTitle = (columnId, title) => ({
  type: UPDATE_COLUMN_TITLE,
  title,
  columnId,
});

export const updateCellValue = (columnId, rowId, value) => ({
  type: UPDATE_CELL_VALUE,
  columnId,
  rowId,
  value,
});
