import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import InputBase from '@material-ui/core/InputBase';
import red from '@material-ui/core/colors/red';
import Typography from '@material-ui/core/Typography';
import { MenuItem, Select } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { columnTypes } from '../ModalAddColumn/ModalAddColumn';
import ButtonFilter from '../Filter/ButtonFilterContainer';

const invalidCellStyles = {
  background: red[50],
  border: `1px solid ${red[300]}`,
};

const selectStyles = {
  input: {
    border: 0,
  },
  root: {
    width: '100%',
    marginLeft: 0,
  },
};

const cellStyles = {
  input: {
    textAlign: 'center',
  },
  headerCellWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
};

const SelectWithStyle = withStyles(selectStyles)((
  {
    classes,
    value,
    handleChange,
    options,
    handleSaveCellValue,
  },
) => (
  <Select
    value={value || ''}
    className={classes.root}
    input={<InputBase fullWidth />}
    onChange={handleChange}
    onBlur={handleSaveCellValue}
  >
    {options}
  </Select>
));

export default withStyles(cellStyles)(({
  invalidInput,
  cellStyle,
  label,
  handleChange,
  type,
  handleChangeSelect,
  options,
  disableInputBase,
  align,
  handleBlur,
  header,
  classes,
  handleOnChangeHeaderCell,
  columnId,
  value,
  handleSaveCellValue,
}) => {
  let styleCell = {};
  let defaultAlign = 'left';
  let cell;

  if (invalidInput) styleCell = invalidCellStyles;

  if (label !== undefined) {
    if (header) {
      cell = (
        <div className={classes.headerCellWrapper}>
          <InputBase
            classes={{ input: classes.input }}
            onBlur={handleOnChangeHeaderCell}
            defaultValue={label}
            fullWidth
          />
          <ButtonFilter columnId={columnId} />
        </div>
      );
    } else { cell = <Typography>{label}</Typography>; }
    defaultAlign = 'center';
  } else if (type !== columnTypes.select) {
    cell = (
      <InputBase
        onChange={handleChange}
        disabled={disableInputBase}
        fullWidth
        defaultValue={value}
        onBlur={handleSaveCellValue}
      />
    );
  } else {
    cell = (
      <SelectWithStyle
        options={options.map(option => <MenuItem value={option} key={option}>{option}</MenuItem>)}
        value={value}
        handleChange={handleChangeSelect}
        handleSaveCellValue={handleSaveCellValue}
      />
    );
  }

  return (
    <TableCell
      className={cellStyle}
      style={styleCell}
      align={align !== undefined ? align : defaultAlign}
      onBlur={handleBlur}
    >
      {cell}
    </TableCell>
  );
});
