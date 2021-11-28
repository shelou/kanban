import {
    Avatar,
    Box,
    Button,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Tooltip,
    Typography
} from "@mui/material";
import * as _ from "lodash";
import React, {useEffect, useState} from "react";
import {ArrowUpward, Assignment, Delete} from "@mui/icons-material";

import {IStory} from "../data/stories";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {AddStoryModal} from "../components/AddStoryModal";
import {StoryService} from "../services/story.service";
import {setAll as setStories} from "../redux/reducers/storySlice";
import {setAll} from "../redux/reducers/columnsSlice";
import {ColumnService} from "../services/column.service";
import {columnObj} from "../data/columns";
import ConfirmDialog from "../components/ConfirmDialog";

const storyService = new StoryService();
const columnsService = new ColumnService();

export const Backlog = () => {
    const dispatch = useAppDispatch();
    const {columns} = useAppSelector((state) => {
        return state.columns;
    })
    const {stories} = useAppSelector((state) => {
        return state.stories
    })
    const [column, setColumn] = useState(columnsService.getColumnByID("column_0", columns));
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [dialogBtnClicked, setDialogBtnClicked] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [storyToDelete, setStoryToDelete] = useState({
        storyId: '',
        index: -1
    })

    useEffect(() => {
        if (!_.isEmpty(columns))
            setColumn(columnsService.getColumnByID("column_0", columns))
    }, [columns])

    const handleClose = () => {
        setAddDialogOpen(false);
        setDeleteDialogOpen(false)
    }

    const handleDeleteClick = (_storyId: string, _index: any) => {
        setDeleteDialogOpen(true);
        setStoryToDelete({
            storyId: _storyId,
            index: _index
        })
    }

    const deleteStory = () => {
        setDialogBtnClicked(true);
        let newStories = stories.filter(s => s.id !== storyToDelete.storyId)
        dispatch(setStories(newStories));
        const backlogColumn: columnObj | undefined = columnsService.getColumnByID("column_0", columns);
        const storyIds: string[] = Object.values(backlogColumn?.storyIds || []);
        storyIds.splice(storyToDelete.index, 1)
        const sourceColumn: columnObj = {
            id: "column_0",
            title: backlogColumn?.title || '',
            storyIds: storyIds
        };
        const tempArray = [sourceColumn];
        const newArray = columns.map(obj => tempArray.find(o => o.id === obj.id) || obj)
        dispatch(setAll(newArray))
        setDeleteDialogOpen(false)
    }

    const moveToBoard = (storyId: string, index: any) => {
        // move the story to to do column
        const sourceColumnObj: columnObj | undefined = columnsService.getColumnByID("column_0", columns);
        const destColumnObj: columnObj | undefined = columnsService.getColumnByID("column_1", columns);
        const sourceStories: string[] = Object.values(sourceColumnObj?.storyIds || []);
        let destinationStories: string[] = Object.values(destColumnObj?.storyIds || []);
        destinationStories.splice(destinationStories.length, 0, storyId)
        sourceStories.splice(index, 1)

        const sourceColumn: columnObj = {
            id: "column_0",
            title: sourceColumnObj?.title || '',
            storyIds: sourceStories
        };

        const destColumn: columnObj = {
            id: "column_1",
            title: destColumnObj?.title || '',
            storyIds: destinationStories
        };

        const tempArray = [sourceColumn, destColumn];
        const newArray = columns.map(obj => tempArray.find(o => o.id === obj.id) || obj)
        dispatch(setAll(newArray))
    }

    const handleSave = ({title, description}: any) => {
        try {
            setAddDialogOpen(false);
            const updated = storyService.createStory({title, description}, stories);
            // // update backlog column
            dispatch(setStories(updated.stories));
            let oldStoryIds = Object.values(column?.storyIds || []);
            oldStoryIds.push(updated.newStoryId)
            const newColumn = {
                id: column?.id || '',
                title: column?.title || '',
                storyIds: oldStoryIds
            }
            let tempColumns = columns.filter(c => c.id !== "column_0");
            tempColumns.push(newColumn)
            dispatch(setAll(tempColumns))
            setAddDialogOpen(false);
        } catch (e) {
            setAddDialogOpen(false);
            console.log(e)
        }
    };



    const handleClickOpen = () => {
        setAddDialogOpen(true);
    };

    return (
        <>
            <Box sx={{flexGrow: 1, maxWidth: 752}}>
                <Grid container spacing={2}>
                    <Grid item xs={8} md={8}>
                        <Typography sx={{mt: 4, mb: 2}} variant="h6" component="div">
                            Backlog Stories
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Box component="span" sx={{
                            p: 2, border: '1px', justifyContent: "right",
                            display: "flex",
                            alignItems: "right"
                        }}>
                            <Button color={"primary"} variant={"contained"} onClick={handleClickOpen}>Add</Button>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <List>
                            {!_.isEmpty(column) && column?.storyIds.map(
                                ((item: string, index: any) => {
                                    let _story: IStory | undefined = stories.find((element, index, array) => {
                                            if (element.id === item) {
                                                return element;
                                            }
                                        }
                                    )
                                    if (_story) {
                                        return (
                                            <> <ListItem
                                                secondaryAction=
                                                    {<div><Tooltip title="Move to Board">
                                                        <IconButton edge="end" aria-label="todo"
                                                                    onClick={() => moveToBoard(_story?.id || '', index)}>
                                                            <ArrowUpward/>
                                                        </IconButton>
                                                    </Tooltip>
                                                        <Tooltip title="Delete">
                                                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(_story?.id || '', index)}>
                                                                <Delete/>
                                                            </IconButton>
                                                        </Tooltip>
                                                    </div>
                                                    }
                                            >
                                                <
                                                    ListItemAvatar>
                                                    <Avatar>
                                                        <Assignment/>
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={_story.title}
                                                />
                                            </ListItem>
                                                <Divider/>
                                            </>
                                        )
                                    }
                                })
                            )}
                        </List>
                    </Grid>

                </Grid>
                <AddStoryModal title={"Create New Story"} open={addDialogOpen} handleClose={handleClose}
                               handleSave={handleSave}/>
                <ConfirmDialog title={"Confirm Delete Account"} open={deleteDialogOpen} handleClose={handleClose}
                               dialogContentText={"Are you sure you want to remove this item?"}
                               handleConfirmation={deleteStory} btnClicked={dialogBtnClicked}/>
            </Box>
        </>
    )
        ;
}