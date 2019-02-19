import React, { Fragment } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import CreateColumnContainer from './CreateColumn/CreateColumnContainer';
import ModalAppColumnContainer from './ModalAddColumn/ModalAddColumnContainer';
import CellContainer from './Cell/CellContainer';
import AddRows from './AddRows';
import ModalFilter from './Filter/ModalFilterContainer';
import { columnTypes } from './ModalAddColumn/ModalAddColumn';

const styles = ({ palette, spacing }) => createStyles({
  cell: {
    borderBottom: 0,
    borderTop: `1px solid ${palette.grey[300]}`,
    borderLeft: `1px solid ${palette.grey[300]}`,
    paddingRight: spacing.unit * 2,
    paddingLeft: spacing.unit * 2,
  },
  inactiveCell: {
    background: palette.grey[100],
  },
  firstColumnCell: {
    width: '10%',
  },
  lastRowCell: {
    borderBottom: `1px solid ${palette.grey[300]}`,
  },
  hideBorderTop: {
    borderTop: 0,
  },
  hideBorderLeft: {
    borderLeft: 0,
  },
  lastColumnCell: {
    borderRight: `1px solid ${palette.grey[300]}`,
  },
  lastCell: {
    border: `1px solid ${palette.grey[300]}`,
  },
  hideCell: {
    paddingLeft: spacing.unit * 3,
    borderBottom: 0,
    borderRight: 0,
    background: 'initial',
  },
  rowNumber: {
    color: palette.text.secondary,
  },
  invalidCellValue: {
    background: red[50],
    border: `1px solid ${red[300]}`,
  },
});

const renderRows = (table, columns, classes) => {
  let showRow = true;
  return table.map((row, i) => {
    showRow = true;
    const tableRow = (
      <TableRow key={i}>
        <CellContainer
          label={i + 1}
          cellStyle={`${classes.cell} ${classes.inactiveCell} ${classes.firstColumnCell} ${i === table.length - 1 && classes.lastRowCell}`}
        />
        {row.map((cell, j) => {
          if (columns[j].columnType === columnTypes.number) {
            if (showRow) {
              if (!isNaN(cell.value) && columns[j].filter) {
                if (!isNaN(columns[j].filter.gather) && !isNaN(columns[j].filter.less)) {
                  if (parseFloat(columns[j].filter.gather) > parseFloat(cell.value)
                    || parseFloat(columns[j].filter.less) < parseFloat(cell.value)) showRow = false;
                } else if (!isNaN(columns[j].filter.gather)) {
                  if (parseFloat(columns[j].filter.gather) > parseFloat(cell.value)) {
                    showRow = false;
                  }
                } else if (!isNaN(columns[j].filter.less)) {
                  if (parseFloat(columns[j].filter.less) < parseFloat(cell.value)) showRow = false;
                }
              }
            }
          } else if (columns[j].columnType === columnTypes.date) {
            if (showRow && columns[j].filter) {
              try {
                const date = new Date(cell.value);
                const after = new Date(columns[j].filter.after);
                const before = new Date(columns[j].filter.before);
                if (date.toString() !== 'Invalid Date') {
                  if (after.toString() !== 'Invalid Date' && before.toString() !== 'Invalid Date') {
                    if (after > date || before < date) showRow = false;
                  } else if (after.toString() !== 'Invalid Date') {
                    if (after > date) showRow = false;
                  } else if (before.toString() !== 'Invalid Date') {
                    if (before < date) showRow = false;
                  }
                }
              } catch (e) {
                showRow = true;
              }
            }
          } else if (columns[j].columnType === columnTypes.select) {
            if (showRow && columns[j].filter) {
              if (Object.keys(columns[j].optionsFieldTypeSelect).indexOf(columns[j].filter.option) !== -1) {
                if (cell.value !== columns[j].filter.option) showRow = false;
              }
            }
          } else if (columns[j].columnType === columnTypes.string) {
            if (showRow && columns[j].filter) {
              if (columns[j].filter.pattern !== '' && columns[j].filter.pattern && cell.value) if (cell.value.search(new RegExp(columns[j].filter.pattern, 'i')) === -1) showRow = false;
            }
          }
          return (
            <CellContainer
              key={j}
              cellStyle={`${classes.cell} ${i === table.length - 1 && classes.lastRowCell} ${j === row.length - 1 && classes.lastColumnCell}`}
              type={cell.type}
              columnId={cell.columnId}
              options={cell.options}
              required={cell.required}
              value={cell.value}
              rowId={i}
            />);
        })}
      </TableRow>
    );
    return showRow && tableRow;
  });
};

export default withStyles(styles)(({
  classes, columns, table, setupMode,
}) => (
  <Fragment>
    <ModalAppColumnContainer />
    <ModalFilter />
    {!setupMode && (
    <Table>
      <TableHead>
        <TableRow>
          <CellContainer cellStyle={`${classes.cell} ${classes.inactiveCell}`} />
          {columns.map((option, i) => (
            <CellContainer
              cellStyle={`${classes.cell} ${classes.inactiveCell} ${columns.length === i + 1 && classes.lastColumnCell}`}
              label={option.columnName}
              columnId={i}
              key={option.columnName}
              header
            />
          ))}
          <CellContainer cellStyle={classes.hideCell} label={<CreateColumnContainer />} align="left" />
        </TableRow>
      </TableHead>
      <TableBody>
        {renderRows(table, columns, classes)}
        <TableRow>
          <CellContainer
            cellStyle={`${classes.cell} ${classes.hideCell} ${classes.hideBorderLeft}`}
            label={<AddRows />}
            align="center"
          />
          {columns.map((val, i) => <CellContainer key={i} cellStyle={` ${classes.hideBorderLeft} ${classes.cell} ${classes.hideCell}`} disable />)}
        </TableRow>
      </TableBody>
    </Table>
    ) }
  </Fragment>
));
