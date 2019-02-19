import {
  SHOW_MODAL_ADD_COLUMN,
  HIDE_MODAL_ADD_COLUMN,
  SHOW_FIELD_ADD_SELECT_OPTIONS,
  HIDE_FIELD_ADD_SELECT_OPTIONS,
  ADD_SELECT_OPTIONS,
  REMOVE_SELECT_OPTIONS,
  ADD_COLUMN,
  ADD_ROWS,
  REMOVE_ALL_SELECT_OPTIONS,
  UPDATE_COLUMN_TITLE,
  UPDATE_CELL_VALUE,
} from '../../actions/dynamicSpreadsheet/modalAddColumn';
import {
  SHOW_MODAL_FILTER,
  HIDE_MODAL_FILTER,
  APPLY_FILTER,
} from '../../actions/dynamicSpreadsheet/filter';
import { columnTypes } from '../../components/DynamicSpreadsheet/ModalAddColumn/ModalAddColumn';

export default (state = {
  modalAddColumnVisible: true,
  optionsFieldTypeSelect: {},
  columns: [],
  table: new Array(10).fill([]),
  filter: { modalFilterVisible: false },
}, action) => {
  switch (action.type) {
    case SHOW_MODAL_ADD_COLUMN:
      return {
        ...state,
        modalAddColumnVisible: true,
      };
    case HIDE_MODAL_ADD_COLUMN:
      return {
        ...state,
        modalAddColumnVisible: false,
      };
    case SHOW_FIELD_ADD_SELECT_OPTIONS:
      return {
        ...state,
        modalFieldAddSelectOptionsVisible: true,
      };
    case HIDE_FIELD_ADD_SELECT_OPTIONS:
      return {
        ...state,
        modalFieldAddSelectOptionsVisible: false,
      };
    case ADD_SELECT_OPTIONS:
      return {
        ...state,
        optionsFieldTypeSelect: {
          ...state.optionsFieldTypeSelect,
          [action.option]: action.option,
        },
      };
    case REMOVE_SELECT_OPTIONS: {
      const newState = {
        ...state,
        optionsFieldTypeSelect: {
          ...state.optionsFieldTypeSelect,
        },
      };
      delete newState.optionsFieldTypeSelect[action.option];
      return newState;
    }
    case ADD_COLUMN: {
      const stateWithNewColumn = {
        ...state,
        columns: [
          ...state.columns,
          {
            columnName: action.value.columnName,
            columnType: action.value.columnType,
            columnIsRequired: action.value.columnIsRequired,
            optionsFieldTypeSelect: action.value.columnType === columnTypes.select
              ? { ...state.optionsFieldTypeSelect } : {},
          },
        ],
      };
      stateWithNewColumn.table = stateWithNewColumn.table.map(row => (
        [
          ...row,
          {
            type: action.value.columnType,
            required: action.value.columnIsRequired,
            options: action.value.columnType === columnTypes.select
              ? { ...state.optionsFieldTypeSelect } : {},
            columnId: row.length,
          },
        ]
      ));
      return stateWithNewColumn;
    }
    case ADD_ROWS: {
      const newRows = state.columns.map((column, i) => ({
        type: column.columnType,
        required: column.columnIsRequired,
        options: column.optionsFieldTypeSelect,
        columnId: i,
      }));
      return {
        ...state,
        table: [
          ...state.table,
          ...(new Array(10).fill(newRows)),
        ],
      };
    }
    case REMOVE_ALL_SELECT_OPTIONS:
      return {
        ...state,
        optionsFieldTypeSelect: {},
      };
    case UPDATE_COLUMN_TITLE:
      state.columns[action.columnId].columnName = action.title;
      return {
        ...state,
        columns: [
          ...state.columns,
        ],
      };
    case SHOW_MODAL_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          modalFilterVisible: true,
          currentColumnId: action.columnId,
        },
      };
    case HIDE_MODAL_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          modalFilterVisible: false,
          currentColumnId: undefined,
        },
      };
    case APPLY_FILTER:
      state.columns[action.columnId].filter = action.filter;
      return {
        ...state,
        columns: [
          ...state.columns,
        ],
      };
    case UPDATE_CELL_VALUE:
      state.table[action.rowId][action.columnId] = {
        ...state.table[action.rowId][action.columnId],
        value: action.value,
      };
      return {
        ...state,
        table: [
          ...state.table,
        ],
      };

    default:
      return state;
  }
};
