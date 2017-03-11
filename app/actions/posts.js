import {
    get
} from 'axios';

export const CREATE_SUBREDDIT = 'CREATE_SUBREDDIT';
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export function fetchPostsIfNeeded(subreddit) {
    return async(dispatch, getState) => {
        if (shouldFetchPosts(getState(), subreddit)) {
            dispatch(requestPosts(subreddit));
            const {
                after: oldAfter,
                before: oldBefore
            } = getState().posts;
            console.log(`after: ${oldAfter}`);
            const {
                data: json
            } = await get(`https://www.reddit.com/r/${subreddit}.json`, {
                params: {
                    after: oldAfter,
                    before: oldBefore
                }
            });
            const posts = mapJsonToPosts(json);
            const {
                after,
                before
            } = json.data;
            return dispatch(receivePosts(subreddit, posts, after, before));
        }
    }
}

function requestPosts(subreddit) {
    return {
        type: REQUEST_POSTS,
        payload: {
            subreddit
        }
    }
}

function receivePosts(subreddit, posts, after, before) {
    return {
        type: RECEIVE_POSTS,
        payload: {
            subreddit,
            posts,
            after,
            before
        }
    }
}

function shouldFetchPosts(state, subreddit) {
    return !state.posts.bySubreddit[subreddit] || !state.posts.bySubreddit[subreddit].isFetching;
}

function mapJsonToPosts(json) {
    return json.data.children.map(({
        data: {
            id,
            title,
            score,
            num_comments,
            url,
            created
        }
    }) => ({
        id,
        title,
        score,
        num_comments,
        url,
        created
    }));
}

export function createSubredditIfNeeded(subreddit) {
    return (dispatch, getState) => {
        if (shouldCreateSubreddit(getState(), subreddit)) {
            console.log(`creating subreddit: ${subreddit}`);
            return dispatch(createSubreddit(subreddit));
        }
    }
}

function shouldCreateSubreddit(state, subreddit) {
    return !state.posts.bySubreddit[subreddit];
}

function createSubreddit(subreddit) {
    return {
        type: CREATE_SUBREDDIT,
        payload: {
            subreddit
        }
    }
}