
import { connect } from 'inferno-redux';
import moment from 'moment';

function mapStateToProps(state, ownProps) {
	const {
		title,
		score,
		num_comments,
		url,
		created
	} = state.posts.data[ownProps.postId];

	return {
		title,
		score,
		num_comments,
		url,
		created
	}
}

function Post({ title, score, num_comments, url, created }) {
	const humanTimeCreated = moment.unix(created).fromNow();
	return (
		<div className="post">
			<span className="score">{score}</span>
			<div className="post-content">
				<h3 className="title">{title}</h3>
				<div>{`Submitted ${humanTimeCreated}`}</div>
				<a className="comments" href={url} >{`${num_comments} ${num_comments !== 1 ? "comments" : "comment"}`}</a>
			</div>
		</div>
	);
}

export default connect(mapStateToProps)(Post);