import { AsyncStorage } from 'react-native';

import http from './http.service';
import socket from './socket.service';

class SessionService {
  login(data) {
    return http.post('/users/login', JSON.stringify(data))
      .then(catchToken => AsyncStorage.setItem('catchToken', catchToken))
      .then(() => AsyncStorage.getItem('catchToken'))
      .then(catchToken => this.setSession(catchToken))
      .catch(error => Promise.reject(error));
  }

  logout() {
    return AsyncStorage.removeItem('catchToken')
      .then(() => socket.disconnect())
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
    try {
      socket.connect();
    } catch (e) {
      this.logout();
    }
  }

}

export default new SessionService();
