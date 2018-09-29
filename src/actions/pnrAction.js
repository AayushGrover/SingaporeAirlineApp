import { PNR_LOADING, PNR, PNR_URL } from './types';
import { handleError } from './errorAction';

export const getPNR = (ref, lname) => {
	return dispatch => {
		// return new Promise((resolve, reject) => {
		dispatch(pnrLoading(true));
		url = PNR_URL + '/pax/pnr';
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				apikey: 'aghk73f4x5haxeby7z24d2rc'
			},
			body: JSON.stringify({
				bookingReference: ref,
				bookingLastName: lname
			})
		})
			.then(data => {
				return data.json();
			})
			.then(data => {
				dispatch(getPNRhelper(data));
				dispatch(pnrLoading(false));
			})
			.catch(error => {
				dispatch(handleError(error));
				dispatch(pnrLoading(false));
			});
		// });
	};
};

function pnrLoading(bool) {
	return {
		type: PNR_LOADING,
		pnr_loading: bool
	};
}

function getPNRhelper(pnr) {
	return {
		type: PNR,
		pnr: pnr
	};
}
