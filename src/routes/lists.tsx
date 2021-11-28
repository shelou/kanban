import {Container, Grid} from "@mui/material";
import {DragDropContext, DropResult, ResponderProvided} from 'react-beautiful-dnd';
import {useEffect, useState} from "react";
import * as _ from "lodash";
import {Column} from "../components/Column";
import {useAppSelector} from "../redux/hooks";
import {columnObj} from "../data/columns";
import {ColumnService} from "../services/column.service";
import {EditStory} from "./EditStory";

const columnsService = new ColumnService();

export default function Lists() {
    const {columns} = useAppSelector((state) => state.columns)
    const {stories} = useAppSelector((state) => state.stories)
    const [columnsData, setColumnsData] = useState(columns);

    useEffect(() => {
        setColumnsData(columns);
    }, [columns]);

    const reorder = (list: string[], startIndex: number, endIndex: number) => {
        const result: string[] = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
        const {source, destination, draggableId} = result;
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const sourceColumn = columnsService.getColumnByID(source.droppableId,columnsData);
            const reorderedStories: string[] = reorder(
                sourceColumn?.storyIds || [],
                source.index,
                destination.index
            );

            const srcColumn: columnObj = {
                id: source.droppableId,
                title: sourceColumn?.title || '',
                storyIds: reorderedStories
            }

            let newArray = columnsData.filter(c => c.id !== source.droppableId);
            newArray.push(srcColumn)
            setColumnsData(newArray);

        } else {
            const sourceColumnObj: columnObj | undefined = columnsService.getColumnByID(source.droppableId,columnsData);
            const destColumnObj: columnObj | undefined = columnsService.getColumnByID(destination.droppableId,columnsData);
            const sourceStories: string[] = Object.values(sourceColumnObj?.storyIds || []);
            let destinationStories: string[] =Object.values(destColumnObj?.storyIds || []);
            destinationStories.splice(destination.index, 0, draggableId)
            sourceStories.splice(source.index,1)

            const sourceColumn: columnObj ={
                id: source.droppableId,
                title: sourceColumnObj?.title || '',
                storyIds: sourceStories
            };

            const destColumn: columnObj ={
                id: destination.droppableId,
                title: destColumnObj?.title || '',
                storyIds: destinationStories
            };

            const tempArray = [sourceColumn,destColumn];
            const newArray = columnsData.map(obj => tempArray.find(o => o.id === obj.id) || obj)

            setColumnsData(newArray)
        }
    };

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <h2>Project Board</h2>
                </Grid>
            </Grid>
            <div>
                <DragDropContext onDragEnd={onDragEnd}>
                    {!_.isEmpty(columnsData) ? (
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <Column column={columnsService.getColumnByID("column_1",columnsData)} stories={stories} title={"To Do"}/>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Column column={columnsService.getColumnByID("column_2",columnsData)} stories={stories} title={"In Progress"}/>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Column column={columnsService.getColumnByID("column_3",columnsData)} stories={stories} title={"Done"}/>
                            </Grid>
                        </Grid>
                    ) : (<></>)
                    }
                </DragDropContext>
            </div>
        </Container>
    );
}