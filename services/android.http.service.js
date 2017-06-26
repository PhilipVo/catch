import { AsyncStorage, Platform } from 'react-native';

class HttpAndroidService {
  constructor() {
    // this.ip = 'https://anvyl.online';
    this.ip = 'http://10.0.0.214:8000';
    this.s3 = 'https://s3-us-west-1.amazonaws.com/ronin.catch';
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
    else return response.json()
      .then(data => Promise.resolve(data))
      .catch(error => Promise.resolve(response));
  }

  /////////////////////////////////////////////////
  //                HTTP METHODS
  /////////////////////////////////////////////////

  post(url, body) {
    return AsyncStorage.getItem('catchToken')
      .then(catchToken => {
        return fetch(`${this.ip}${url}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${catchToken}`,
            'Content-Type': 'multipart/form-data'
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
            'Content-Type': 'multipart/form-data'
          },
          body: body
        });
      })
      .then(response => this.handleResponse(response))
      .catch(error => Promise.reject(error));
  }

}

module.exports = new HttpAndroidService();
