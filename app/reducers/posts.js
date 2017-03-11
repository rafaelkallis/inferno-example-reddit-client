import {
    RECEIVE_POSTS,
    REQUEST_POSTS,
    CREATE_SUBREDDIT
} from '../actions/posts';

const INIT_STATE = {
    data: {},
    bySubreddit: {
        javascript: {
            data: [],
            isFetching: false
        }
    }
};

export default function posts(state = INIT_STATE, {type, payload}) {
    switch (type) {
        case REQUEST_POSTS: {
                const { subreddit } = payload;

                // deep merge
                return {
                    ...state,
                    bySubreddit: {
                        ...state.bySubreddit,
                        [subreddit]: {
                            ...state.bySubreddit[subreddit],
                            isFetching: true
                        }
                    }
                };
            }

        case RECEIVE_POSTS: {
                const { posts, subreddit, after, before } = payload;
                const postIds = posts.map(post => post.id);

                // postsById = {
                //     "<post1.id>": "<post1>",
                //     "<post2.id>": "<post2>",
                //     "<post3.id>": "<post3>",
                //      ...
                // }
                const postsById = posts.reduce((result, post) => ({
                    ...result,
                    [post.id]: post
                }), {});

                // deep merge
                return {
                    ...state,
                    data: {
                        ...state.data,
                        ...postsById
                    },
                    bySubreddit: {
                        ...state.bySubreddit,
                        [subreddit]: {
                            ...state.bySubreddit[subreddit],
                            isFetching: false,
                            data: [
                                ...state.bySubreddit[subreddit].data,
                                ...postIds
                            ]
                        }
                    },
                    after,
                    before
                };
            }

        case CREATE_SUBREDDIT:
            console.log(payload);
            const {subreddit} = payload;
            return {
                ...state,
                bySubreddit: {
                    ...state.bySubreddit,
                    [subreddit]: {
                        data: [],
                        isFetching: false
                    }
                }
            };

        default:
            return state;
    }
}