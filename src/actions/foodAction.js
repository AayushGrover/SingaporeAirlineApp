import { PNR_URL, FOOD_LOADING, FOOD } from './types';
import { handleError } from './errorAction';

export const getFood = (flight_num, flight_date) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			dispatch(foodLoading(true));
			url = PNR_URL + '/meal/upliftplan';
			fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					apikey: 'aghk73f4x5haxeby7z24d2rc'
				},
				body: JSON.stringify({
					flightNo: flight_num,
					flightDate: flight_date
				})
			})
				.then(data => {
					return data.json();
				})
				.then(data => {
					dispatch(getFOODhelper(data));
					dispatch(foodLoading(false));
					resolve();
				})
				.catch(error => {
					dispatch(handleError(error));
					dispatch(foodLoading(false));
					reject();
				});
		});
	};
};

function foodLoading(bool) {
	return {
		type: FOOD_LOADING,
		food_loading: bool
	};
}

function getFOODhelper(food) {
	return {
		type: FOOD,
		food: food
	};
}
