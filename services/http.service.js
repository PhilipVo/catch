import { AsyncStorage } from 'react-native';

class HttpService {
  constructor() {
    this.ip = 'http://10.0.0.44:8001';
  }

  handleResponse(response) {
    // Reject on error:
    if (response.status >= 300)
      return response.json()
        .then(data => {
          if (data.message) return Promise.reject(data.message);
          else return Promise.reject(response);
        })
    // Resolve on success:
    else
      return response.json()
        .then(data => Promise.resolve(data))
        .catch(error => Promise.resolve(response));
  }

  /////////////////////////////////////////////////
  //                HTTP METHODS
  /////////////////////////////////////////////////
  delete(url) {
    return AsyncStorage.getItem('catchToken')
      .then(catchToken => {
        return fetch(`${this.ip}${url}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${catchToken}`
          }
        });
      })
      .then(response => this.handleResponse(response))
      .catch(error => Promise.reject(error));
  }

  get(url) {
    return AsyncStorage.getItem('catchToken')
      .then(catchToken => {
        return fetch(`${this.ip}${url}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${catchToken}`
          }
        });
      })
      .then(response => this.handleResponse(response))
      .catch(error => Promise.reject(error));
  }

  post(url, body) {
    return AsyncStorage.getItem('catchToken')
      .then(catchToken => {
        return fetch(`${this.ip}${url}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${catchToken}`,
            'Content-Type': 'application/json'
          },
          body: body
        });
      })
      .then(response => this.handleResponse(response))
      .catch(error => Promise.reject(error));
  }

  put(url, body) {
    return AsyncStorage.getItem('catchToken')
      .then(catchToken => {
        return fetch(`${this.ip}${url}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${catchToken}`,
            'Content-Type': 'application/json'
          },
          body: body
        });
      })
      .then(response => this.handleResponse(response))
      .catch(error => Promise.reject(error));
  }

}

export default new HttpService();
