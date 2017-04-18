import { AsyncStorage } from 'react-native';
import { Observable } from 'rxjs/Observable';
import IO from 'socket.io-client/dist/socket.io';

import http from './http.service';

class SocketService {
  constructor() {
    this.onSent;
  }

  connect() {
    this.socket = IO(http.ip, { jsonp: false });

    //////////////////////////////////////////////////////
    //               SOCKET EVENT HANDLERS
    //////////////////////////////////////////////////////
    this.onSent = new Observable(observer => {
      this.socket.on('sent', data => {
        observer.next(data);
      });
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.emit('disconnect');
      this.socket.disconnect();
      this.socket = null;
      this.onSent = null;
    }
  }

  emit(event, data) {
    this.socket.emit(event, data);
  }

}

export default new SocketService();
