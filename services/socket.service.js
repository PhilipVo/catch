import { AsyncStorage } from 'react-native';
import { Observable } from 'rxjs/Observable';
import IO from 'socket.io-client';

import http from './http.service';

class SocketService {
  connect(username) {
    this.socket = IO(http.ip, { jsonp: false });
    this.socket.emit('join', username);

    //////////////////////////////////////////////////////
    //               SOCKET OBSERVABLES
    //////////////////////////////////////////////////////
    this.onCommented = new Observable(observer => {
      this.socket.on('commented', data => observer.next(data));
    });

    this.onContacted = new Observable(observer => {
      this.socket.on('contacted', data => observer.next(data));
    });

    this.onContributed = new Observable(observer => {
      this.socket.on('contributed', data => observer.next(data));
    });

    this.onEvent = new Observable(observer => {
      this.socket.on('event', () => observer.next());
    });

  }

  disconnect(username) {
    if (this.socket) {
      this.socket.emit('disconnect', username);
      this.socket.disconnect();
    }
  }

  emit(event, data) {
    this.socket.emit(event, data);
  }

}

export default new SocketService();
