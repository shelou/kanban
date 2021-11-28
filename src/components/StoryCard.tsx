import {Avatar, Card, CardContent, CardHeader, Chip, Container, IconButton} from "@mui/material";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {Draggable} from "react-beautiful-dnd";
import {useNavigate, useParams} from 'react-router-dom'

import {IStory} from "../data/stories";

interface Props {
    id: string,
    index: number,
    story: IStory
}

const StoryCard = ({id, index, story}: Props) => {
    const navigate = useNavigate();
    const onClick = () => {
        navigate(`/stories/${id}`)
    };

    return (
            <Container maxWidth="sm" key={id} style={{marginBottom:"15px"}}>
                <Draggable draggableId={id} index={index}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <Card sx={{ maxWidth: 345 }}>
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="recipe">
                                            {story.assignedTo?.charAt(0)}
                                        </Avatar>
                                    }
                                    action={
                                        <IconButton aria-label="settings" onClick={onClick}>
                                            <OpenInNewIcon />
                                        </IconButton>
                                    }
                                    title={story.title}
                                    subheader={story.id}
                                />
                                <CardContent>
                                    <Chip label={story.assignedTo} />
                                </CardContent>

                            </Card>
                        </div>
                    )}
                </Draggable>
            </Container>
    )
}

export default StoryCard;