import React from 'react';
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';

export default ({ handleOnClick }) => (
  <IconButton aria-label="Filter" size="small" onClick={handleOnClick}>
    <FilterListIcon />
  </IconButton>
);