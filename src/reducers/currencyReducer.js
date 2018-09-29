import { CURRENCY_LOADING, CURRENCY_RATE } from '../actions/types';

const INITIAL_STATE = {
	currency_rate: null,
	currency_loading: false
};

export default function(state = INITIAL_STATE, action) {
	let result = Object.assign({}, state);
	switch (action.type) {
		case CURRENCY_RATE:
			return {
				...result,
				currency_rate: action.currency_rate
			};
		case CURRENCY_LOADING:
			return {
				...result,
				currency_loading: action.currency_loading
			};
		default:
			return state;
	}
}
