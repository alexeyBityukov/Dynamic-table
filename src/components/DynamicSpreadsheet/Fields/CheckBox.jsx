import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { RenderSelect } from './Select';

export const RenderCheckBox = ({
  children,
  input,
  label,
  onChange,
  classes,
}) => {
  const newInput = {
    ...input,
    value: input.value ? 'on' : '',
  };
  return (
    <FormControl>
      <FormControlLabel
        control={(
          <Checkbox
            color="primary"
            onChange={onChange}
            {...newInput}
          >
            {children}
          </Checkbox>)
        }
        label={label}
        classes={classes}
      />
    </FormControl>
  );
};

RenderCheckBox.defaultProps = {
  meta: {},
  children: null,
  input: {},
  label: '',
  onChange: () => {},
};

RenderSelect.propTypes = {
  meta: PropTypes.shape({}),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  input: PropTypes.shape({}),
  label: PropTypes.string,
};

const style = ({ palette: { text } }) => createStyles({
  label: {
    color: text.secondary,
  },
});

export default withStyles(style)(RenderCheckBox);
