import React, { Fragment } from 'react';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '../Fields/TextField';
import { columnTypes } from '../ModalAddColumn/ModalAddColumn';
import Select from '../Fields/Select';

const styles = ({ spacing }) => createStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding: spacing.unit * 2,
    width: 350,
  },
  button: {
    marginTop: spacing.unit,
  },
});

export const formName = 'modalFilter';

export const fieldNames = {
  numberGreaterThan: 'numberGreaterThan',
  numberLessThan: 'numberLessThan',
  dateAfter: 'dateAfter',
  dateBefore: 'dateBefore',
  select: 'select',
  stringPattern: 'stringPattern',
};

const errors = {
  requiredOneOrBoth: 'Required one ore both fields',
  invalidInput: 'Required number',
  invalidInputDate: 'Required Date',
  invalidSelect: 'Selected options invalid!',
};

export const errorsKey = {
  requiredOneOrBoth: 'requiredOneOrBoth',
  invalidInput: 'invalidInput',
  invalidInputDate: 'invalidInputDate',
  invalidSelect: 'invalidSelect',
};

export default reduxForm({
  form: formName,
})(withStyles(styles)((
  {
    visible,
    handleClose,
    classes,
    addFilter,
    handleSubmit,
    columnType,
    options,
  },
) => (
  <Modal className={classes.root} onClose={handleClose} open={visible}>
    <Paper className={classes.paper}>
      <form onSubmit={handleSubmit(addFilter)}>
        {columnType === columnTypes.number
        && (
          <Fragment>
            <Field
              name={fieldNames.numberGreaterThan}
              component={TextField}
              label="Greater than"
              errors={errors}
            />
            <Field
              name={fieldNames.numberLessThan}
              component={TextField}
              label="Less than"
              errors={errors}
            />
          </Fragment>)
        }
        {columnType === columnTypes.date
        && (
          <Fragment>
            <Field
              name={fieldNames.dateAfter}
              component={TextField}
              label="After"
              errors={errors}
            />
            <Field
              name={fieldNames.dateBefore}
              component={TextField}
              label="Before"
              errors={errors}
            />
          </Fragment>)
        }
        {columnType === columnTypes.select && (
          <Field
            name={fieldNames.select}
            component={Select}
            label="Select"
            errors={errors}
            htmlFor="modal-add-column-field-column-type"
            /* onChange={onChangeSelect} */
          >
            <MenuItem value="">None</MenuItem>
            {Object.values(options).map(option => (
              <MenuItem value={option} key={option}>{option}</MenuItem>))}
          </Field>)
        }
        {columnType === columnTypes.string && (
          <Field
            name={fieldNames.stringPattern}
            component={TextField}
            label="Pattern"
            errors={errors}
          />)
        }
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          type="submit"
          fullWidth
        >
          Filter
        </Button>
      </form>
    </Paper>
  </Modal>
)));
