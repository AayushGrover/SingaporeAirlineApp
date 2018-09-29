import { WEATHER_LOADING, WEATHER } from './types';
import { handleError } from './errorAction';

export const getWeather = to => {
	return dispatch => {
		// return new Promise((resolve, reject) => {
		dispatch(weatherLoading(true));
		url =
			'http://api.openweathermap.org/data/2.5/weather?q=' +
			to +
			'&APPID=4bce2eb0c7f0d7116f5b88f714a4f4f2&units=metric';
		fetch(url)
			.then(data => {
				return data.json();
			})
			.then(data => {
				dispatch(getWeatherHelper(data));
			})
			.catch(error => {
				dispatch(handleError(error));
			});
		// });
	};
};

function weatherLoading(bool) {
	return {
		type: WEATHER_LOADING,
		weather_loading: bool
	};
}

function getWeatherHelper(weather) {
	return {
		type: WEATHER,
		weather: weather
	};
}
