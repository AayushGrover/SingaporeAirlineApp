import currencyReducer from './currencyReducer';
import weatherReducer from './weatherReducer';
import poiReducer from './poiReducer';

// Collection of all the reducers with keys to gathers their
// results into a single state object.
const allReducers = {
	currency: currencyReducer,
	weather: weatherReducer,
	poi: poiReducer
};

export default allReducers;
