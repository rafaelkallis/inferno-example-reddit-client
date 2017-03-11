
import { connect } from 'inferno-redux';
import { fetchPostsIfNeeded } from '../actions/posts';

function mapStateToProps(state) {
    const {selectedSubreddit} = state;
    return {
        selectedSubreddit
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPostsIfNeeded: (subreddit) => dispatch(fetchPostsIfNeeded(subreddit))
    };
}

function mergeProps({selectedSubreddit}, {fetchPostsIfNeeded}) {
    return {
        fetchPostsIfNeeded: () => fetchPostsIfNeeded(selectedSubreddit)
    };
}

function MoreButton({ fetchPostsIfNeeded }) {

    return (
        <button onClick={fetchPostsIfNeeded}>More</button>
    );
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(MoreButton);