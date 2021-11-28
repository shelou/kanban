export interface columnObj {
    id: string,
    title: string,
    storyIds: string[]
}

let Columns:  columnObj [] =[
    {
        id: 'column_0',
        title: 'Backlog',
        storyIds: ['story-0'],
    },
   {
        id: 'column_1',
        title: 'To do',
        storyIds: ['story-11', 'story-1'],
    },
   {
        id: 'column_2',
        title: 'In Progress',
        storyIds: ['story-2'],
    },
    {
        id: 'column_3',
        title: 'Done',
        storyIds: ['story-3'],
    },
];

export {Columns}