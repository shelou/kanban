import {Droppable} from "react-beautiful-dnd";
import {Container} from "@mui/material";
import {Stories, IStory} from "../data/stories";
import StoryCard from "./StoryCard";
import {columnObj} from "../data/columns";

interface Props{
    column : {
        id: string,
        storyIds: Array<string>
    },
    title: string,
    stories: IStory[]
}

export const Column = ({column, title,stories}: any) =>{
    return(
            <Droppable droppableId={column.id} key={column.id}>
                {(provided, snapshot) => (
                    <Container style={{
                        border: "1px solid lightgrey",
                        borderRadius: "2px",
                        padding: "6px",
                        marginBottom: "8px",
                        backgroundColor: snapshot.isDraggingOver ? '#939FB6' : '#f4f5f7',
                        minHeight: "600px"
                    }}
                               ref={provided.innerRef}
                               {...provided.droppableProps}
                    >
                        <h3 style={{color: "Gray"}}>{title}</h3>
                        {provided.placeholder}
                        {column.storyIds.map(
                            ((item: string, index: any) => {
                                let str: IStory | undefined = stories.find((element : any) => {
                                        if (element.id === item) {
                                            return element;
                                        }
                                    }
                                )
                                if (str && str) {
                                    return (
                                        <StoryCard id={str?.id} index={index} story={str}/>
                                    )
                                }
                            })
                        )}
                    </Container>

                )}
            </Droppable>
    )
}