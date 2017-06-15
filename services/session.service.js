const base64 = require('base-64');
import { AsyncStorage } from 'react-native';

import http from './http.service';
import socket from './socket.service';

class SessionService {
  constructor() {
    this.isFacebookUser = false;
    this.username;
  }

  facebookLogin(data) {
    return http.post('/users/facebook-login', JSON.stringify(data))
      .then(catchToken => {
        if (catchToken.isNew) throw { isNew: true };
        AsyncStorage.setItem('catchToken', catchToken);
      }).then(() => AsyncStorage.getItem('catchToken'))
      .then(catchToken => {
        this.setSession(catchToken);
        this.isFacebookUser = true;
      }).catch(error => {
        if (error.isNew === true) return Promise.resolve(true);
        return Promise.reject(error);
      });
  }

  facebookRegister(data) {
    return http.post('/users/facebook-register', JSON.stringify(data))
      .then(catchToken => AsyncStorage.setItem('catchToken', catchToken))
      .then(() => AsyncStorage.getItem('catchToken'))
      .then(catchToken => {
        this.setSession(catchToken);
        this.isFacebookUser = true;
      }).catch(error => Promise.reject(error));
  }

  login(data) {
    return http.post('/users/login', JSON.stringify(data))
      .then(catchToken => AsyncStorage.setItem('catchToken', catchToken))
      .then(() => AsyncStorage.getItem('catchToken'))
      .then(catchToken => this.setSession(catchToken))
      .catch(error => Promise.reject(error));
  }

  logout() {
    return AsyncStorage.removeItem('catchToken')
      .then(() => {
        socket.disconnect();

        this.img = undefined;
        this.username = undefined;
      })
      .catch(error => Promise.reject(error));
  }

  register(data) {
    return http.post('/users/register', JSON.stringify(data))
      .then(catchToken => AsyncStorage.setItem('catchToken', catchToken))
      .then(() => AsyncStorage.getItem('catchToken'))
      .then(catchToken => this.setSession(catchToken))
      .catch(error => Promise.reject(error));
  }

  setSession(catchToken) {
    return new Promise((resolve, reject) => {
      try {
        // Set user:
        payload = JSON.parse(base64.decode(catchToken.split('.')[1].replace('-', '+').replace('_', '/')));
        this.username = payload.username;

        // Connect to sockets:
        socket.connect();

        return resolve();
      } catch (error) {
        return reject('Error encountered while setting session.');
      }
    })
  }
}

export default new SessionService();
