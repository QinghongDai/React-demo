import React, { Component, Fragment } from "react";
import classnames from "classnames";
import {
  Paper,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Typography
} from "@material-ui/core";

import Styled from "./styles";

class SimpleTable extends Component {
  render() {
    const { tableData, header, isLarge } = this.props;
    return (
      <Styled>
        {({ classes }) => (
          <Fragment>
            <Typography variant="h6">{header}</Typography>
            <Paper className={classes.root}>
              <div className={classes.tableWrapper}>
                <Table className={classes.table}>
                  <TableBody>
                    {tableData.map(row => (
                      <TableRow key={row.title} className={classes.tableRow}>
                        <TableCell
                          component="th"
                          scope="row"
                          className={classnames(classes.leftCell, {
                            [classes.largeFont]: isLarge
                          })}
                        >
                          {row.title}
                        </TableCell>
                        <TableCell
                          className={classnames(
                            classes.rightCell,
                            classes.cell
                          )}
                        >
                          {row.property}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Paper>
          </Fragment>
        )}
      </Styled>
    );
  }
}

export default SimpleTable;
