import {Button, DialogActions, DialogContent, FormControl, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {useFormik} from 'formik';
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {useNavigate, useParams} from "react-router-dom";
import {IStory} from "../data/stories";
import {setAll} from "../redux/reducers/storySlice";

interface MyFormValues {
    title: string,
    description: string
}

const EditStory = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {stories} = useAppSelector((state) => state.stories)
    const [isEdit, setEditMode] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [story, setStory] = useState<IStory>();

    const initialValues: MyFormValues = {
        title: '',
        description: '',
    };

    useEffect(() => {
        let _story = stories.find(s => s.id === id);
        setStory(_story)
        formik.setFieldValue('title', _story.title)
        formik.setFieldValue('description', _story.description)
    }, []);

    const handleSave = () => {
        // update story in stories only
        let updatedStory = {
            ...story,
            title: formik.values.title,
            description: formik.values.description
        }
        let tempStories = stories.filter(s => s.id !== id);
        tempStories.push(updatedStory)
        dispatch(setAll(tempStories))
        navigate('/')
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: handleSave,

    });
    return (
        <div>
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
                        disabled={!isEdit}
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
                        disabled={!isEdit}
                    />
                </DialogContent>
                <DialogActions>
                    <FormControl>
                        <Button color="primary" type="button" disabled={isEdit} onClick={() => {
                            setEditMode(true);
                        }}>Edit</Button>
                    </FormControl>
                    <FormControl>
                        <Button color="primary" type="submit"
                                disabled={isSubmitting || !isEdit}>Submit</Button>
                    </FormControl>
                    {isEdit
                        ? (
                            <Button color="primary" type="button" disabled={isSubmitting || !isEdit}
                                    onClick={() => {
                                        setEditMode(false);
                                    }}>Cancel</Button>)
                        : (<></>)
                    }
                </DialogActions>
            </form>
        </div>
    )
}

export {EditStory}