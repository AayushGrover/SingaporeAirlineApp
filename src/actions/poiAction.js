import { POI_LOADING, PLACES_OF_INTEREST } from './types';
import { handleError } from './errorAction';

export const getPOI = to => {
	return dispatch => {
		// return new Promise((resolve, reject) => {
		dispatch(poiLoading(true));
		city = to.split(' ').join('+');
		url =
			'https://maps.googleapis.com/maps/api/place/textsearch/json?query=' +
			city +
			'+point+of+interest&language=en&key=AIzaSyAOrqTj_ZRrnzLVkAKGE62vVm8tNx0BLaM';
		fetch(url)
			.then(data => {
				return data.json();
			})
			.then(data => {
				dispatch(getPOIhelper(data));
				dispatch(poiLoading(false));
			})
			.catch(error => {
				dispatch(handleError(error));
				dispatch(poiLoading(false));
			});
		// });
	};
};

function poiLoading(bool) {
	return {
		type: POI_LOADING,
		poi_loading: bool
	};
}

function getPOIhelper(poi) {
	return {
		type: PLACES_OF_INTEREST,
		poi: poi
	};
}
