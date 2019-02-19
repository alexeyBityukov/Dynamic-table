import React from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { removeSelectOption } from '../../../actions/dynamicSpreadsheet/modalAddColumn';

const styles = ({ spacing, palette }) => createStyles({
  removeButton: {
    transform: 'rotate(45deg)',
    padding: 3,
    marginRight: -1 * 3,
    marginLeft: 3,
  },
  addedOption: {
    marginRight: spacing.unit,
    marginBottom: spacing.unit,
    display: 'flex',
    paddingRight: spacing.unit,
    paddingLeft: spacing.unit,
    border: `1px solid ${palette.primary.light}`,
    borderRadius: 4,
    width: 'min-content',
    whiteSpace: 'nowrap',
    alignItems: 'center',
  },
  addedOptionLabel: {
    paddingTop: spacing.unit,
    paddingBottom: spacing.unit,
  },
});

export default connect()(withStyles(styles)(({ classes, label, dispatch }) => (
  <div className={classes.addedOption}>
    <Typography className={classes.addedOptionLabel}>
      {label}
    </Typography>
    <IconButton aria-label="Remove" className={classes.removeButton} onClick={() => { dispatch(removeSelectOption(label)); }}>
      <AddIcon />
    </IconButton>
  </div>
)));
