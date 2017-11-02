import http from './http.service';

export default function (payload) {
	return fetch('https://vrate.p.mashape.com/mediarating', {
		method: 'POST',
		headers: {
			'X-Mashape-Key': 'UozoGPyDCSmshlMrE56kkOuHfGxrp1KAWngjsn952KRGrMos9O',
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: {
			payload: 'https://vrate.net/images/vratelogo3.45d93685.png'
		}
	}).then(data => http.handleResponse(data))
		.then(data => {
			console.log('data', data)
			if (data.RatingCode === 'V02' && data.Confidence === 'High')
				return Promise.reject('Upload failed: media contains inapproproate content.');
			return Promise.resolve();
		}).catch(error => Promise.reject(error))
};