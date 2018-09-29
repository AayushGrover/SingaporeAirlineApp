import { POI_LOADING, PLACES_OF_INTEREST } from '../actions/types';

const INITIAL_STATE = {
	poi: null,
	poi_loading: false
};

export default function(state = INITIAL_STATE, action) {
	let result = Object.assign({}, state);
	switch (action.type) {
		case PLACES_OF_INTEREST:
			return {
				...result,
				poi: action.poi
			};
		case POI_LOADING:
			return {
				...result,
				poi_loading: action.poi_loading
			};
		default:
			return state;
	}
}
