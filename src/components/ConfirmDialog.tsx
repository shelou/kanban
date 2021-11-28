import React, {MouseEventHandler} from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

interface Props {
    title: string,
    dialogContentText:string,
    open: boolean,
    btnClicked: boolean,
    handleClose: MouseEventHandler<any>,
    handleConfirmation: MouseEventHandler<any>,
}

const ConfirmDialog = ({open, btnClicked, handleClose, handleConfirmation, title, dialogContentText}: Props) => {
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogContentText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmation} color="primary" disabled={btnClicked}>
                        Yes
                    </Button>
                    <Button onClick={handleClose} color="primary" disabled={btnClicked} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ConfirmDialog;