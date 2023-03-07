import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'

// ----------------------------------------------------------------------

export default function ConfirmationDialog({open, title, content, handleCloseDialog, handleNextPayment}) {

  return (
    <div data-testid="confirmation-dialog-container">
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
        <DialogTitle id="alert-dialog-title" color="primary">
        {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} size="small" color="primary">Cancel</Button>
          <Button color="secondary" variant="contained" onClick={handleNextPayment} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}