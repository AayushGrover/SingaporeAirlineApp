import { FOOD_LOADING, FOOD } from '../actions/types';

const INITIAL_STATE = {
	food: null,
	food_loading: false
};

export default function(state = INITIAL_STATE, action) {
	let result = Object.assign({}, state);
	switch (action.type) {
		case FOOD:
			return {
				...result,
				food: action.food
			};
		case FOOD_LOADING:
			return {
				...result,
				food_loading: action.food_loading
			};
		default:
			return state;
	}
}
