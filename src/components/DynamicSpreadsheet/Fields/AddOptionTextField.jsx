import React from 'react';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import { withStyles, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

const styles = ({ spacing }) => createStyles({
  root: {
    display: 'flex',
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 3 * spacing.unit,
    marginBottom: spacing.unit,
    marginRight: -1 * 3,
  },
  addButton: {
    padding: 3,
  },
  field: {
    width: '100%',
    marginTop: spacing.unit,
  },
});

export const RenderTextField = ({
  input,
  label,
  meta: { touched, error },
  children,
  errors,
  required,
  classes,
  addSelectOption,
}) => (
  <div className={classes.root}>
    <TextField
      error={Boolean(touched && error)}
      helperText={Boolean(touched && error) && errors[error]}
      margin="normal"
      required={required}
      label={label}
      {...input}
      className={classes.field}
    >
      {children}
    </TextField>
    <div className={classes.iconWrapper}>
      <IconButton aria-label="Add" className={classes.addButton} onClick={addSelectOption}>
        <AddIcon />
      </IconButton>
    </div>
  </div>
);

RenderTextField.propTypes = {
  meta: PropTypes.shape({}),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  input: PropTypes.shape({}),
  label: PropTypes.string,
  errors: PropTypes.shape({}),
  required: PropTypes.bool,
  addSelectOption: PropTypes.func,
};

RenderTextField.defaultProps = {
  meta: {},
  children: null,
  input: {},
  label: '',
  errors: {},
  required: false,
  addSelectOption: () => {},
};

export default withStyles(styles)(RenderTextField);
