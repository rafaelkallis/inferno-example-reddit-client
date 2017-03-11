
import {
    SELECT_SUBREDDIT
} from '../actions/selectedSubreddit';

export default function selectedSubreddit(state = 'javascript', {type, payload}) {
    switch (type) {
        case SELECT_SUBREDDIT:
            const {subreddit} = payload;
            return subreddit
        default:
            return state
    }
}