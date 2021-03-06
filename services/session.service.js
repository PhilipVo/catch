const base64 = require('base-64');
import { AsyncStorage } from 'react-native';
import { LoginManager } from 'react-native-fbsdk';

import http from './http.service';
import navigation from './navigation.service';

class SessionService {
	constructor() {
		this.isFacebookUser;
		this.username;
	}

	facebookLogin(data) {
		return http.post('/users/facebook-login', JSON.stringify(data))
			.then(catchToken => {
				if (catchToken.isNew) throw { isNew: true };
				return AsyncStorage.setItem('catchToken', catchToken);
			}).then(() => AsyncStorage.getItem('catchToken'))
			.then(catchToken => this.setSession(catchToken))
			.then(navigation.login)
			.catch(error => error.isNew ? Promise.resolve(true) : Promise.reject(error));
	}

	facebookRegister(data) {
		return http.post('/users/facebook-register', JSON.stringify(data))
			.then(catchToken => AsyncStorage.setItem('catchToken', catchToken))
			.then(() => AsyncStorage.getItem('catchToken'))
			.then(catchToken => {
				this.setSession(catchToken);
				this.isFacebookUser = true;
				navigation.login();
			}).catch(error => Promise.reject(error));
	}

	login(data) {
		return http.post('/users/login', JSON.stringify(data))
			.then(catchToken => AsyncStorage.setItem('catchToken', catchToken))
			.then(() => AsyncStorage.getItem('catchToken'))
			.then(catchToken => this.setSession(catchToken))
			.then(navigation.login)
			.catch(error => Promise.reject(error));
	}

	logout() {
		return http.put('/api/users/clear-device-token')
			.then(() => AsyncStorage.removeItem('catchToken'))
			.then(() => {
				this.isFacebookUser && LoginManager.logOut();
				this.isFacebookUser = undefined;
				this.username = undefined;
				navigation.logout();
			}).catch(error => Promise.reject(error));
	}

	register(data) {
		return http.post('/users/register', JSON.stringify(data))
			.then(catchToken => AsyncStorage.setItem('catchToken', catchToken))
			.then(() => AsyncStorage.getItem('catchToken'))
			.then(catchToken => this.setSession(catchToken))
			.then(navigation.login)
			.catch(error => Promise.reject(error));
	}

	setSession(catchToken) {
		return new Promise((resolve, reject) => {
			try {
				// Set user:
				payload = JSON.parse(base64.decode(catchToken.split('.')[1].replace('-', '+').replace('_', '/')));
				this.isFacebookUser = payload.isFacebookUser;
				this.username = payload.username;

				return resolve();
			} catch (error) {
				this.logout();
				return reject('Error encountered while setting session.');
			}
		});
	}
}

export default new SessionService();
