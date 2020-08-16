import _ from 'lodash';
import jsonPlaceholder from '../apis/jasonPlaceholder';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
	await dispatch(fetchPosts());

	const userIds = _.uniq(_.map(getState().posts, 'userId')); //map the object and extract only the userId uniq only the one with unique id
	userIds.forEach((id) => dispatch(fetchUser(id))); // async await dont work with foreach
};

export const fetchPosts = () => {
	return async (dispatch) => {
		const response = await jsonPlaceholder.get('/posts');
		//a promise object mean that eventully in the future we going to get accses to the data
		dispatch({
			type: 'FETCH_POSTS',
			payload: response.data
		});
	};
};

export const fetchUser = (id) => {
	return async (dispatch) => {
		const response = await jsonPlaceholder.get(`/users/${id}`);
		dispatch({
			type: 'FETCH_USER',
			payload: response.data
		});
	};
};

// export const fetchUser = (id) => {
// 	return (dispatch) => {
// 		_fetchUser(id, dispatch);
// 	};
// };
// const _fetchUser = _.memoize(async (id, dispatch) => {
// 	const response = await jsonPlaceholder.get(`/users/${id}`);
// 	dispatch({
// 		type: 'FETCH_USER',
// 		payload: response.data
// 	});
// });

//when we dispatch a function redux-thunk will automaticly read it up and invoke it
//Basically dispatch is used as a callback which gets invoked once some async action is complete.
