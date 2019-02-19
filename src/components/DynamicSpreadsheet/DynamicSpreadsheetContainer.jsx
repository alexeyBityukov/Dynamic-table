import React from 'react';
import { connect } from 'react-redux';
import DynamicSpreadsheet from './DynamicSpreadsheet';

export default connect(state => ({
  columns: state.dynamicSpreadsheet.columns,
  table: state.dynamicSpreadsheet.table,
}))(({ columns, table }) => (
  <DynamicSpreadsheet columns={columns} table={table} setupMode={columns.length === 0} />));
