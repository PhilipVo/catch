import { AsyncStorage, Platform } from 'react-native';

// const IP = 'https://anvyl.online';
const IP = 'http://10.0.0.214:8000';
const S3 = 'https://s3-us-west-1.amazonaws.com/ronin.catch';

class HttpService {
  constructor() {
    this.ip = IP;
    this.s3 = S3;
  }

  handleResponse(response) {
    // Reject on error:
    if (response.status >= 300)
      return response.json()
        .then(data => Promise.reject(data.message))
        .catch(error => {
          if (typeof error === 'string') return Promise.reject(error);
          else return Promise.reject(response);
        });
    // Resolve on success:
    else return response.json()
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
      }).then(response => this.handleResponse(response))
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


// -------------------------------------------------------------- Android HTTP -------------------------------------------------------------------------------------------

class AndroidHttpService {
  constructor() {
    this.ip = IP;
    this.s3 = S3;
  }

  handleResponse(response) {
    // Reject on error:
    if (response.status >= 300)
      return response.json()
        .then(data => Promise.reject(data.message))
        .catch(error => {
          if (typeof error === 'string') return Promise.reject(error);
          else return Promise.reject(response);
        });
    // Resolve on success:
    else return response.json()
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
      }).then(response => this.handleResponse(response))
      .catch(error => Promise.reject(error));
  }

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

module.exports = (device) => {
  if (device === 'android'){
    console.log('serve android http');
    return new AndroidHttpService();
  } else {
    console.log('serve normal http');
    return new HttpService();
  }
}
