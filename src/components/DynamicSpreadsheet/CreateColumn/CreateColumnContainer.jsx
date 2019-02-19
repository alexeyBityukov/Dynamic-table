import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateColumn from './CreateColumn';
import { showModalAddColumn } from '../../../actions/dynamicSpreadsheet/modalAddColumn';

console.log(showModalAddColumn);

export default connect()(
  class extends Component {
    handleClick = event => {
      const { dispatch } = this.props;
      dispatch(showModalAddColumn());
    };

    render() {
      return <CreateColumn handleClick={this.handleClick} />;
    }
  }
);
