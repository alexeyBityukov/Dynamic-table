export const SHOW_MODAL_FILTER = 'SHOW_MODAL_FILTER';
export const HIDE_MODAL_FILTER = 'HIDE_MODAL_FILTER';
export const APPLY_FILTER = 'APPLY_FILTER';

export const showModalFilter = columnId => ({
  type: SHOW_MODAL_FILTER,
  columnId,
});

export const hideModalFilter = () => ({
  type: HIDE_MODAL_FILTER,
});

export const applyFilter = (columnId, filter) => ({
  type: APPLY_FILTER,
  columnId,
  filter,
});
