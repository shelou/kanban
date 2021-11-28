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
import {ArrowUpward, Assignment} from "@mui/icons-material";

import {IStory} from "../data/stories";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {StoryModal} from "../components/StoryModal";
import {StoryService} from "../services/story.service";
import {setAll as setStories} from "../redux/reducers/storySlice";
import {setAll} from "../redux/reducers/columnsSlice";
import {ColumnService} from "../services/column.service";

const storyService = new StoryService();
const columnsService = new ColumnService();

export const Backlog = () => {
    const dispatch = useAppDispatch();
    const {columns} = useAppSelector((state) => {
        return state.columns;
    })
    const {stories} = useAppSelector((state) => {
        return state.stories})
    const [column, setColumn] = useState(columnsService.getColumnByID("column_0", columns));
    const [addDialogOpen, setAddDialogOpen] = useState(false);

    useEffect(() => {
        if (!_.isEmpty(columns))
            setColumn(columnsService.getColumnByID("column_0", columns))
    }, [columns])

    const handleClose = () => {
        setAddDialogOpen(false);
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
                                    console.log(stories)
                                    let _story: IStory | undefined = stories.find((element, index, array) => {
                                            console.log(`${element.id} === ${item} ? ${element.id === item}`)
                                            if (element.id === item) {
                                                return element;
                                            }
                                        }
                                    )
                                    if (_story) {
                                        return (
                                            <> <ListItem
                                                secondaryAction=
                                                    {<Tooltip title="Move to Sprint">
                                                        <IconButton edge="end" aria-label="delete">
                                                            <ArrowUpward/>
                                                        </IconButton>
                                                    </Tooltip>
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
                <StoryModal title={"Create New Story"} open={addDialogOpen} handleClose={handleClose}
                            handleSave={handleSave}/>
            </Box>
        </>
    )
        ;
}