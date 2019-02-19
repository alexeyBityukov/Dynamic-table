import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import { addRows } from '../../actions/dynamicSpreadsheet/modalAddColumn';

export default connect()(class extends Component {
  handleClick = () => {
    const { dispatch } = this.props;
    dispatch(addRows());
  };

  render() {
    return (
      <IconButton aria-label="Add" onClick={this.handleClick}>
        <AddIcon />
      </IconButton>
    );
  }
});
