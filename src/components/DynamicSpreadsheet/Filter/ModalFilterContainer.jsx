import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { reset } from 'redux-form';
import ModalFilter, { fieldNames, formName, errorsKey } from './ModalFilter';
import {
  hideModalFilter,
  applyFilter
} from '../../../actions/dynamicSpreadsheet/filter';
import {columnTypes } from '../ModalAddColumn/ModalAddColumn';
import {showErrorAddSelectOptions} from "../../../actions/dynamicSpreadsheet/modalAddColumn";

export default connect((state) => ({
  visible: !!state.dynamicSpreadsheet.filter.modalFilterVisible,
  columnId: state.dynamicSpreadsheet.filter.currentColumnId,
  column: state.dynamicSpreadsheet.columns[state.dynamicSpreadsheet.filter.currentColumnId],
  state: state,
}))(class extends Component{
  handleClose = () => {
    const { dispatch } = this.props;
    dispatch(hideModalFilter());
  };

  addFilter = (values) => {
    const { columnId, dispatch, column } = this.props;

    switch (column.columnType) {
      case columnTypes.number:
        if(isNaN(values[fieldNames.numberGreaterThan]) && isNaN(values[fieldNames.numberLessThan])) {
          dispatch(showErrorAddSelectOptions(formName, fieldNames.numberGreaterThan, errorsKey.invalidInput));
          dispatch(showErrorAddSelectOptions(formName, fieldNames.numberLessThan, errorsKey.invalidInput));
          break;
        }
        dispatch(applyFilter(columnId, {
          gather: values[fieldNames.numberGreaterThan],
          less: values[fieldNames.numberLessThan]
        }));
        dispatch(hideModalFilter());
        break;
      case columnTypes.date:
        let after, before;
        try {
          const dateAfter = new Date(values[fieldNames.dateAfter]);
          const dateBefore = new Date(values[fieldNames.dateBefore]);
          if (dateBefore.toString() === 'Invalid Date' && dateAfter.toString() !== 'Invalid Date')
            after = values[fieldNames.dateAfter];
          else if (dateBefore.toString() !== 'Invalid Date' && dateAfter.toString() === 'Invalid Date')
            before = values[fieldNames.dateBefore];
          else if (dateBefore.toString() !== 'Invalid Date' && dateAfter.toString() !== 'Invalid Date') {
            before = values[fieldNames.dateBefore];
            after = values[fieldNames.dateAfter];
          } else if (dateBefore.toString() === 'Invalid Date' && dateAfter.toString() === 'Invalid Date') {
            dispatch(showErrorAddSelectOptions(formName, fieldNames.dateAfter, errorsKey.invalidInputDate));
            dispatch(showErrorAddSelectOptions(formName, fieldNames.dateBefore, errorsKey.invalidInputDate));
            break;
          }
        }
        catch (e) {
          dispatch(showErrorAddSelectOptions(formName, fieldNames.dateAfter, errorsKey.invalidInputDate));
          dispatch(showErrorAddSelectOptions(formName, fieldNames.dateBefore, errorsKey.invalidInputDate));
          break;
        }

        dispatch(applyFilter(columnId, {
          after: after,
          before: before,
        }));
        dispatch(hideModalFilter());
        break;
      case columnTypes.select:
        //if( -1 === Object.keys(column.optionsFieldTypeSelect).indexOf(values[fieldNames.select]))
        //  dispatch(showErrorAddSelectOptions(formName, fieldNames.select, errorsKey.invalidSelect));
        //else {
          dispatch(applyFilter(columnId, {
            option: values[fieldNames.select],
          }));
          dispatch(hideModalFilter());
        //}
        break;
      case columnTypes.string:
        dispatch(applyFilter(columnId, {
          pattern: values[fieldNames.stringPattern],
        }));
        dispatch(hideModalFilter());
        break;
      default:
        break;
    }
  };

  render() {
    const { visible, column } = this.props;
    return (
      <ModalFilter
        visible={visible}
        handleClose={this.handleClose}
        addFilter={this.addFilter}
        columnType={column && column.columnType}
        options={column && column.optionsFieldTypeSelect}
      />
    );
  }
})
