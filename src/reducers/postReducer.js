export default (state = [], action) => {
	// the reducer only need to return a combination of the state and the action and return it not a function or logic
	switch (action.type) {
		case 'FETCH_POSTS':
			return action.payload;
		default:
			return state;
	}
};
