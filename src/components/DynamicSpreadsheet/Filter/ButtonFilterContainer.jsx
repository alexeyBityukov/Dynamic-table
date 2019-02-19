import React, { Component } from 'react';
import { connect } from 'react-redux';
import ButtonFilter from './ButtonFilter';
import { showModalFilter } from '../../../actions/dynamicSpreadsheet/filter'

export default connect()(class extends Component{
  handleOnClick = (event) => {
    event.preventDefault();
    const { dispatch, columnId } = this.props;
    dispatch(showModalFilter(columnId));
  };

  render() {
    return (
      <ButtonFilter
        handleOnClick={this.handleOnClick}
      />
    );
  }
})
