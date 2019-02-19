import React from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import PropTypes from 'prop-types';
import { withStyles, createStyles } from '@material-ui/core/styles';

const styles = ({ spacing }) => createStyles({
  root: {
    marginTop: spacing.unit * 2,
    marginBottom: spacing.unit,
  },
});

export const RenderSelect = ({
  input,
  label,
  meta: { touched, error },
  children,
  errors,
  required,
  htmlFor,
  classes,
}) => (
  <FormControl fullWidth required={required} className={classes.root}>
    <InputLabel htmlFor={htmlFor}>{label}</InputLabel>
    <Select
      error={Boolean(touched && error)}
      input={<Input name="label" id={htmlFor} />}
      {...input}
    >
      {children}
    </Select>
    {Boolean(touched && error) && errors[error]
    && (
    <FormHelperText>
      {(Boolean(touched && error) && errors[error]) || ''}
    </FormHelperText>)
    }
  </FormControl>
);

RenderSelect.propTypes = {
  meta: PropTypes.shape({}),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  input: PropTypes.shape({}),
  label: PropTypes.string,
  errors: PropTypes.shape({}),
  required: PropTypes.bool,
};

RenderSelect.defaultProps = {
  meta: {},
  children: null,
  input: {},
  label: '',
  errors: {},
  required: false,
};

export default withStyles(styles)(RenderSelect);
