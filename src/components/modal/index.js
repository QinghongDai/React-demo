import React, { Fragment } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";

import Styled from "./styles";

const Modal = props => {
  const { children, title, maxWidth, open, handleClose, customHeight } = props;
  const contentHeight = customHeight ? `${customHeight}px` : "auto";
  return (
    <Styled>
      {({ classes }) => (
        <Fragment>
          <Dialog
            fullWidth={true}
            maxWidth={maxWidth}
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <DialogTitle className={classes.dialogActions}>
              {title}
              <IconButton
                aria-label="Close"
                className={classes.closeButton}
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent
              dividers
              className={classes.dialogContent}
              style={{
                height: `${contentHeight}`,
                overflowY: `${customHeight ? "initial" : "auto"}`
              }}
            >
              {children}
            </DialogContent>
          </Dialog>
        </Fragment>
      )}
    </Styled>
  );
};

export default Modal;
