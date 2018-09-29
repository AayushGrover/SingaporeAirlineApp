import { WEATHER_LOADING, WEATHER } from '../actions/types';

const INITIAL_STATE = {
	weather: null,
	weather_loading: false
};

export default function(state = INITIAL_STATE, action) {
	let result = Object.assign({}, state);
	switch (action.type) {
		case WEATHER:
			return {
				...result,
				weather: action.weather
			};
		case WEATHER_LOADING:
			return {
				...result,
				weather_loading: action.weather_loading
			};
		default:
			return state;
	}
}
