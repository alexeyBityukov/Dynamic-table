import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  updateColumnTitle,
  updateCellValue
} from '../../../actions/dynamicSpreadsheet/modalAddColumn';
import Cell from './Cell';
import { columnTypes } from '../ModalAddColumn/ModalAddColumn';

export default connect()(class extends Component {
  state = {
    invalidInput: false,
  };

  handleChange = (event) => {
    event.preventDefault();
    const { type, options = {} } = this.props;

    switch (type) {
      case columnTypes.number:
        const numberPattern = new RegExp("(?:NaN|-?(?:(?:\\d+|\\d*\\.\\d+)(?:[E|e][+|-]?\\d+)?|Infinity))");
        this.setState({invalidInput: !numberPattern.test(event.target.value)});
        break;
      case columnTypes.string:
        if('' !== event.target.value)
          this.setState({invalidInput: false});
        break;
      case columnTypes.date:
        try {
          const date = new Date(event.target.value);
          this.setState({invalidInput: date.toString() === 'Invalid Date'});
        }
        catch (e) {
          this.setState({invalidInput: true});
        }
        break;
      case columnTypes.select:
        const valid =  Object.values(options).reduce((valid, value) => value === event.target.value || valid, false);
        this.setState({invalidInput: !valid});
        break;
      default:
        this.setState({invalidInput: true});
        break;
    }

    if(event.target.value === '')
      this.setState({invalidInput: false});
  };


  handleChangeSelect = (event) => {
    this.handleChange(event);
    const { columnId, rowId, dispatch } = this.props;
    dispatch(updateCellValue(columnId, rowId, event.target.value));

    //this.setState({selectValue: event.target.value});
  };

  handleBlur = (event) => {
    const { required } = this.props;
    if(event.target.value === '')
      this.setState({invalidInput: required || this.state.invalidInput });
  };

  handleOnChangeHeaderCell = (event) => {
    const { header, columnId, dispatch } = this.props;
    if(header)
      dispatch(updateColumnTitle(columnId, event.target.value));
  };

  handleSaveCellValue = (event) => {
    const { columnId, rowId, dispatch } = this.props;
    dispatch(updateCellValue(columnId, rowId, event.target.value));
  };

  render() {
    const {cellStyle, label, align, type, options = {}, disable, header, columnId, value} = this.props;
    return (
      <Cell
        disableInputBase={disable}
        cellStyle={cellStyle}
        label={label}
        align={align}
        invalidInput={this.state.invalidInput}
        handleChange={this.handleChange}
        handleOnChangeHeaderCell={this.handleOnChangeHeaderCell}
        type={type}
        handleChangeSelect={this.handleChangeSelect}
        selectValue={this.state.selectValue}
        options={Object.values(options)}
        handleBlur={this.handleBlur}
        header={header}
        columnId={columnId}
        value={value}
        handleSaveCellValue={this.handleSaveCellValue}
      />
    );
  }
})
