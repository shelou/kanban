// import {Status} from "../enumerations/StoryStatus";

export interface IStory {
    id: string,
    title:string,
    description: string,
    assignedTo?: string,
    // status: Status
}

let Stories: Array<IStory> = [
    {
        id:"story-0",
        title: "To be moved to todo",
        description: "Test",
        assignedTo: "Maria",
        // status: Status.BACKLOG
    },
    {
        id:"story-1",
        title: "Get Requirements",
        description: "Have a call with the client to get the module requirements",
        assignedTo: "John",
        // status: Status.TODO
    },
    {
        id:"story-11",
        title: "Get Requirements11",
        description: "Have a call with the client to get the module requirements",
        assignedTo: "John",
        // status: Status.TODO
    },
    {
        id:"story-2",
        title: "Get Requirements1",
        description: "Have a call with the client to get the module requirements",
        assignedTo: "Marcus",
        // status: Status.IN_PROGRESS
    },
    {
        id:"story-3",
        title: "Get Requirements2",
        description: "Have a call with the client to get the module requirements",
        assignedTo: "Hannah",
        // status: Status.DONE
    },
]

export {Stories};