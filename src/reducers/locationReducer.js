import { CURR_LOCATION } from '../actions/types';

const INITIAL_STATE = {
	curr_coordinates: {
		latitude: 30,
		longitude: 40,
		latitudeDelta: 0.0052,
		longitudeDelta: 0.0052
	}
};

export default function(state = INITIAL_STATE, action) {
	let result = Object.assign({}, state);
	switch (action.type) {
		case CURR_LOCATION:
			return {
				...result,
				curr_coordinates: {
					...result.curr_coordinates,
					latitude: action.curr_coordinates.latitude,
					longitude: action.curr_coordinates.longitude
				}
			};
		default:
			return state;
	}
}
