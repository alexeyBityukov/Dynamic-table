import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { withStyles, createStyles } from '@material-ui/core/styles';
import TextField from '../Fields/TextField';
import CustomTextField from '../Fields/AddOptionTextField';
import Select from '../Fields/Select';
import ColumnSelectOption from './ColumnSelectOption';
import CheckBox from '../Fields/CheckBox';

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
  buttonWrapper: {
  },
  optionsFieldTypeSelect: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: spacing.unit,
  },
});

export const formName = 'modalAddNewColumn';

export const errors = {
  requiredField: 'Required field',
  invalidValue: 'Choose from select',
  emptyOptions: 'Empty field',
  optionNonUnic: 'Option is non-unic',
  emptyOptionsList: 'Requires at least one option',
};

export const errorsKey = {
  requiredField: 'requiredField',
  invalidValue: 'invalidValue',
  emptyOptions: 'emptyOptions',
  optionNonUnic: 'optionNonUnic',
  emptyOptionsList: 'emptyOptionsList',
};

export const fieldNames = {
  columnName: 'columnName',
  columnType: 'columnType',
  addSelectOptions: 'addSelectOptions',
  columnIsRequired: 'columnIsRequired',
};

export const columnTypes = {
  date: 'date',
  select: 'select',
  string: 'string',
  number: 'number',
};

const validate = fields => (values) => {
  const errors = {};
  Object.values(fields).forEach((key) => {
    if (!values[key]
      && key !== fieldNames.addSelectOptions
      && key !== fieldNames.columnIsRequired) errors[key] = errorsKey.requiredField;
  });

  errors[fields.columnType] = Object.values(columnTypes).reduce(
    (accumulator, columnType) => columnType === values[fields.columnType] || accumulator,
    false,
  );

  if (errors[fields.columnType] === false) errors[fields.columnType] = errorsKey.invalidValue;
  else errors[fields.columnType] = undefined;

  return errors;
};

export default withStyles(styles)(
  reduxForm({
    form: formName,
    validate: validate(fieldNames),
  })(
    class extends Component {
      render() {
        const {
          visible,
          handleClose,
          classes,
          handleSubmit,
          addColumn,
          checkColumnType,
          visibleFieldAddSelectOptions,
          addSelectOption,
          optionsFieldTypeSelect,
          setupMode,
        } = this.props;

        const onChangeSelect = (event) => {
          checkColumnType(event, columnTypes);
        };

        return (
          <Modal className={classes.root} open={visible} onClose={handleClose(setupMode)}>
            <Paper className={classes.paper}>
              <form onSubmit={handleSubmit(addColumn)}>
                <Field
                  name={fieldNames.columnName}
                  component={TextField}
                  label="Column title"
                  errors={errors}
                  required
                />
                <Field
                  name={fieldNames.columnType}
                  component={Select}
                  label="Column type"
                  errors={errors}
                  required
                  htmlFor="modal-add-column-field-column-type"
                  onChange={onChangeSelect}
                >
                  <MenuItem value={columnTypes.date}>Date</MenuItem>
                  <MenuItem value={columnTypes.select}>Select</MenuItem>
                  <MenuItem value={columnTypes.string}>Text</MenuItem>
                  <MenuItem value={columnTypes.number}>Number</MenuItem>
                </Field>
                <Field name={fieldNames.columnIsRequired} component={CheckBox} label="Column is required" color="primary" />
                {visibleFieldAddSelectOptions && (
                  <Fragment>
                    <Field
                      name={fieldNames.addSelectOptions}
                      component={CustomTextField}
                      label="Select option"
                      errors={errors}
                      addSelectOption={addSelectOption}
                    />
                    <div className={classes.optionsFieldTypeSelect}>
                      {Object.values(optionsFieldTypeSelect).map(option => (<ColumnSelectOption label={option} key={option} />))}
                    </div>
                  </Fragment>)
                }
                <div className={classes.buttonWrapper}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    type="submit"
                    fullWidth
                  >
                    Add
                  </Button>
                </div>
              </form>
            </Paper>
          </Modal>
        );
      }
    },
  ),
);
