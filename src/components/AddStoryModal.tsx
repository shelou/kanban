import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {MouseEventHandler} from "react";
import {useFormik} from 'formik';

interface Props {
    title: string,
    open: boolean,
    // btnClicked?: boolean,
    handleSave: any,
    handleClose: MouseEventHandler<any>,
    // handleConfirmation?: MouseEventHandler<any>,
}

interface MyFormValues {
    title: string,
    description: string
}

const AddStoryModal = ({open, title, handleClose, handleSave}: Props) => {

    const initialValues: MyFormValues = {
        title: '',
        description: '',
    };

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: handleSave,

    });
    return (
        <div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            value={formik.values.title}
                            onChange={formik.handleChange("title")}
                            label="Title"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="description"
                            value={formik.values.description}
                            onChange={formik.handleChange("description")}
                            label="Description"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button color="primary" type="submit">Save</Button>

                    </DialogActions>
                </form>

            </Dialog>
        </div>
    )
}

export {AddStoryModal}