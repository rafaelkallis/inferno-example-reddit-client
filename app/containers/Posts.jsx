
import {connect} from 'inferno-redux';
import {fetchPostsIfNeeded} from '../actions/posts';
import Post from './Post';

function mapStateToProps(state) {
    const { selectedSubreddit } = state;
    const postIds = state.posts.bySubreddit[selectedSubreddit].data;

    return {
        postIds,
        selectedSubreddit
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPostsIfNeeded: (subreddit) => dispatch(fetchPostsIfNeeded(subreddit))
    };
}

function mergeProps({postIds, selectedSubreddit}, {fetchPostsIfNeeded}) {
    return {
        postIds,
        fetchPostsIfNeeded: () => {
            if (postIds.length === 0){
                return fetchPostsIfNeeded(selectedSubreddit);
            }
        }
    };
}

function Posts ({postIds, fetchPostsIfNeeded}) {
    fetchPostsIfNeeded();
    return (
        <div>
            {postIds.map(postId => <Post postId={postId} />)}
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Posts);