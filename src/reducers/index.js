import currencyReducer from './currencyReducer';
import weatherReducer from './weatherReducer';
import poiReducer from './poiReducer';
import pnrReducer from './pnrReducer';
import locationReducer from './locationReducer';
import foodReducer from './foodReducer';

// Collection of all the reducers with keys to gathers their
// results into a single state object.
const allReducers = {
	currency: currencyReducer,
	weather: weatherReducer,
	poi: poiReducer,
	pnr: pnrReducer,
	location: locationReducer,
	food: foodReducer
};

export default allReducers;
