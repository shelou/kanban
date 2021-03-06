import {v4 as uuidv4} from "uuid";
import * as _ from "lodash";
import {Stories, IStory} from "../data/stories";

interface CreateStory {
    title: string,
    description: string
}

export class StoryService {
    createStory(userData: CreateStory, stories: Array<IStory>) {
        const _id = `story-${uuidv4()}`;
        const newStory = {
            id: _id,
            title: userData.title,
            description: userData.description,
        }

        const newStories = _.cloneDeep(stories);
        newStories.push(newStory)

        return {
            stories: newStories,
            newStoryId: _id,
        };
    }

    getStories() {
        return Stories;
    }

    getStoryById(id: string) {
        return "";
    }

    editStory(values: any, id: string) {
        const myInit = {
            body: {
                title: values.title
            },
        };
        return "";
    }

    deleteStory(_sourcedId: string) {
        return "";
    }
}