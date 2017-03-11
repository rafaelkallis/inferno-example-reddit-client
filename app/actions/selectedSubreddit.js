
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'

import {
    createSubredditIfNeeded
} from './posts';

export function selectAndCreateSubredditIfNeeded(subreddit) {
    return async (dispatch, getState) => {
        await dispatch(createSubredditIfNeeded(subreddit));
        return dispatch(selectSubreddit(subreddit));
    }
}

function selectSubreddit(subreddit) {
    return {
        type: SELECT_SUBREDDIT,
        payload: {
            subreddit
        }
    }
}
