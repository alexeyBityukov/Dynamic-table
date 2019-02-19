import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import ModalAddColumn from './ModalAddColumn';
import {
  hideModalAddColumn,
  hideFieldAddSelectOptions,
  showFieldAddSelectOptions,
  showErrorAddSelectOptions,
  hideErrorAddSelectOptions,
  addSelectOption,
  addColumn,
  removeAllSelectOption,
} from '../../../actions/dynamicSpreadsheet/modalAddColumn';
import { fieldNames, formName, errorsKey, columnTypes } from './ModalAddColumn';

export default connect(state => ({
  visibleModal: state.dynamicSpreadsheet.modalAddColumnVisible,
  visibleFieldAddSelectOptions: state.dynamicSpreadsheet.modalFieldAddSelectOptionsVisible,
  values: state.form.modalAddNewColumn && state.form.modalAddNewColumn.values,
  optionsFieldTypeSelect: state.dynamicSpreadsheet.optionsFieldTypeSelect,
  columns: state.dynamicSpreadsheet.columns,
}))(
  class extends Component {
    handleClose = setupMode => event => {
      const { dispatch } = this.props;
      if(setupMode)
        event.preventDefault();
      else
        dispatch(hideModalAddColumn());
    };

    addColumn = values => {
      const { optionsFieldTypeSelect, dispatch} = this.props;
      if(values[fieldNames.columnType] === columnTypes.select && Object.values(optionsFieldTypeSelect).length < 1)
        dispatch(showErrorAddSelectOptions(formName, fieldNames.addSelectOptions, errorsKey.emptyOptionsList));
      else {
        dispatch(addColumn(values));
        dispatch(hideModalAddColumn());
        dispatch(reset(formName));
        dispatch(removeAllSelectOption(formName));
        dispatch(hideFieldAddSelectOptions());
      }

  };

    checkColumnType = (event, columnTypes) => {
      const { dispatch } = this.props;
      if(event.target.value === columnTypes.select)
        dispatch(showFieldAddSelectOptions());
      else
        dispatch(hideFieldAddSelectOptions());
    };

    addSelectOption = (event) => {
      const { dispatch, values, optionsFieldTypeSelect } = this.props;

      if(values && values[fieldNames.addSelectOptions]) {
        const isNonUnic = Object.values(optionsFieldTypeSelect).reduce((unic, option) => option === values[fieldNames.addSelectOptions] || false, false);
        if(isNonUnic)
          dispatch(showErrorAddSelectOptions(formName, fieldNames.addSelectOptions, errorsKey.optionNonUnic));
        else {
          dispatch(addSelectOption(values[fieldNames.addSelectOptions]));
          dispatch(hideErrorAddSelectOptions(formName, fieldNames.addSelectOptions));
        }
      }
      else
        dispatch(showErrorAddSelectOptions(formName, fieldNames.addSelectOptions, errorsKey.emptyOptions));

      event.preventDefault();
    };

    render() {
      const { visibleModal, visibleFieldAddSelectOptions, optionsFieldTypeSelect, columns } = this.props;
      return (
        <ModalAddColumn
          visible={visibleModal}
          handleClose={this.handleClose}
          addColumn={this.addColumn}
          checkColumnType={this.checkColumnType}
          visibleFieldAddSelectOptions={visibleFieldAddSelectOptions}
          addSelectOption={this.addSelectOption}
          optionsFieldTypeSelect={optionsFieldTypeSelect}
          setupMode={columns.length === 0}
        />
      );
    }
  }
);
