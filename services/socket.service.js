import { AsyncStorage } from 'react-native';
import PushNotification from 'react-native-push-notification';
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
      this.socket.on('commented', data => {
        observer.next(data);
        PushNotification.localNotification({
          message: `${data.commenter} commented on ${data.title}`,
        });
      });
    });

    this.onContacted = new Observable(observer => {
      this.socket.on('contacted', data => {
        observer.next(data);
        PushNotification.localNotification({
          message: `${data.username} added you as a contact`,
        });
      });
    });

    this.onContributed = new Observable(observer => {
      this.socket.on('contributed', data => {
        observer.next(data);
        PushNotification.localNotification({
          message: `${data.contributor} added to ${data.title}`,
        });
      });
    });

    this.onContributorAccepted = new Observable(observer => {
      this.socket.on('contributor accepted', data => {
        observer.next(data);
        PushNotification.localNotification({
          message: `You can now add to ${data.title}`,
        });
      });
    });

    this.onContributorRequested = new Observable(observer => {
      this.socket.on('contributor requested', data => {
        observer.next(data);
        PushNotification.localNotification({
          message: `New users have requested to add to ${data.title}`,
        });
      });
    });

    this.onEvent = new Observable(observer => {
      this.socket.on('event', () => observer.next());
    });

    this.onWatchAccepted = new Observable(observer => {
      this.socket.on('watch accepted', data => {
        observer.next(data);
        PushNotification.localNotification({
          message: `You can now view ${data.title}`,
        });
      });
    });

    this.onWatchRequested = new Observable(observer => {
      this.socket.on('watch requested', data => {
        observer.next(data);
        PushNotification.localNotification({
          message: `${data.watcher} requested to watch to ${data.title}`,
        });
      });
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
