import { AsyncStorage } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { Observable } from 'rxjs/Observable';
import IO from 'socket.io-client';

const http = require('./http.service');

class SocketService {
  connect(username) {
    this.socket = IO(http.ip, { jsonp: false });
    this.socket.emit('join', username);

    //////////////////////////////////////////////////////
    //               SOCKET OBSERVABLES
    //////////////////////////////////////////////////////
    this.onCommented = new Observable(observer => {
      this.socket.on('commented', data => {
        console.log('commented ')
        observer.next(data);
        PushNotification.localNotificationSchedule({
          date: new Date,
          message: `${data.commenter} commented on ${data.title}`,
          number: 1
        });
      });
    });

    this.onContacted = new Observable(observer => {
      this.socket.on('contacted', data => {
        observer.next(data);
        PushNotification.localNotificationSchedule({
          date: new Date,
          message: `${data.username} added you as a contact`,
          number: 1
        });
      });
    });

    this.onContributed = new Observable(observer => {
      this.socket.on('contributed', data => {
        observer.next(data);
        PushNotification.localNotificationSchedule({
          date: new Date,
          message: `${data.contributor} added to ${data.title}`,
          number: 1
        });
      });
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
