import http from './http.service';

export default function (payload) {
	return fetch('https://vrate.p.mashape.com/mediarating', {
		method: 'POST',
		headers: {
			'X-Mashape-Key': 'UozoGPyDCSmshlMrE56kkOuHfGxrp1KAWngjsn952KRGrMos9O',
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: JSON.stringify({ payload: payload })
	}).then(data => http.handleResponse(data))
		.then(data => {
			if (data.RatingCode === 'V03' && data.Confidence === 'High')
				return Promise.reject('Upload failed: media contains inapproproate content.');
			return Promise.resolve();
		}).catch(error => Promise.reject(error))
};