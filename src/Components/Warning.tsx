import { FC } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

export const Warning: FC<{ isOpen: boolean; handleClose: () => void; text: string }> = ({
  isOpen,
  handleClose,
  text,
}) => (
  <Dialog
    open={isOpen}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Упс!</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">{text}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Ok</Button>
    </DialogActions>
  </Dialog>
);
