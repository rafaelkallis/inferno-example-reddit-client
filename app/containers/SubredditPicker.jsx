
import { connect } from 'inferno-redux';
import {selectAndCreateSubredditIfNeeded} from '../actions/selectedSubreddit';

function SubredditPicker({ options, selectSubreddit, selectedSubreddit }) {
    return (
        <span>
            <h1>{selectedSubreddit}</h1>
            <select onChange={(e) => selectSubreddit(e.target.value)}
                value={selectedSubreddit}>
                {options.map(option =>
                    <option value={option} key={option}>
                        {option}
                    </option>)
                }
            </select>
        </span>
    )
}

function mapStateToProps(state) {
    const {selectedSubreddit} = state;
    return {
        selectedSubreddit
    };
}

function mapDispatchToProps(dispatch) {
    return {
        selectSubreddit: (subreddit) => dispatch(selectAndCreateSubredditIfNeeded(subreddit))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubredditPicker);