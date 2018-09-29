import { CURRENCY_URL, CURRENCY_LOADING, CURRENCY_RATE } from './types';
import { handleError } from './errorAction';

export const getCurrencyRate = (from, to) => {
	return dispatch => {
		// return new Promise((resolve, reject) => {
		dispatch(currencyLoading(true));
		url = CURRENCY_URL + from + '_' + to + '&compact=y';
		fetch(url)
			.then(data => {
				return data.json();
			})
			.then(data => {
				dispatch(storeCurrencyRate(data[from + '_' + to]['val']));
				dispatch(currencyLoading(false));
			})
			.catch(error => {
				dispatch(handleError(error));
				dispatch(currencyLoading(false));
			});
		// });
	};
};

function currencyLoading(bool) {
	return {
		type: CURRENCY_LOADING,
		currency_loading: bool
	};
}

function storeCurrencyRate(rate) {
	return {
		type: CURRENCY_RATE,
		currency_rate: rate
	};
}
