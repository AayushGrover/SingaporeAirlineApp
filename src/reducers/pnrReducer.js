import { PNR_LOADING, PNR } from '../actions/types';

const INITIAL_STATE = {
	pnr: null,
	pnr_loading: false
};

export default function(state = INITIAL_STATE, action) {
	let result = Object.assign({}, state);
	switch (action.type) {
		case PNR:
			return {
				...result,
				pnr: action.pnr
			};
		case PNR_LOADING:
			return {
				...result,
				pnr_loading: action.pnr_loading
			};
		default:
			return state;
	}
}
