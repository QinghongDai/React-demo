import React, { Component, Fragment } from "react";
import classnames from "classnames";
import {
  Paper,
  TableRow,
  TableCell,
  TableBody,
  Table,
  TableHead,
  Typography
} from "@material-ui/core";

import Styled from "./styles";

const valueExists = value =>
  value === 0 || (value !== "undefined" && value !== null && value !== "");

class CustomTable extends Component {
  render() {
    const { tableData, header, alignLeft, removeShadows } = this.props;
    return (
      <Styled>
        {({ classes }) => (
          <Fragment>
            <Typography variant="h6">{header}</Typography>
            <Paper
              className={classnames(classes.root, {
                [classes.noShadows]: removeShadows
              })}
            >
              <div className={classes.tableWrapper}>
                <Table
                  className={classnames(classes.table, {
                    [classes.simpleTable]: removeShadows
                  })}
                  size="small"
                >
                  <TableHead>
                    <TableRow>
                      {tableData.columns.map(item => (
                        <TableCell
                          key={item}
                          component="th"
                          scope="row"
                          className={classnames(
                            classes.cell,
                            classes.tableHeader,
                            { [classes.alignLeft]: alignLeft }
                          )}
                        >
                          {item || ""}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableData.rows.map((row, i) => (
                      <TableRow key={i} className={classes.tableRow}>
                        {row.map((item, j) =>
                          !item.isCustom ? (
                            <TableCell
                              key={`${item.property}${j}`}
                              className={classnames(classes.cell, {
                                [classes.alignLeft]: alignLeft
                              })}
                            >
                              {valueExists(item.property) ? item.property : ""}
                            </TableCell>
                          ) : valueExists(item.property) ? (
                            item.property
                          ) : (
                            ""
                          )
                        )}
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

export default CustomTable;
