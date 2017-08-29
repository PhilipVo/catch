import { AsyncStorage, PushNotificationIOS } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { Subject } from 'rxjs/Subject';

import http from './http.service';

PushNotificationIOS.addEventListener('notification', notification => console.log('==================NOTIFICATION==================', notification));
PushNotificationIOS.addEventListener('register', data => console.log('====================REGISTER=====================', data));

class NotificationService {
  constructor() {
    this.subject = new Subject();

    // Configure notifications:        
    PushNotification.configure({
      onNotification: notification => {
        subject.onNext(notification);
      },
      onRegister: device => {
        console.log('====================================================\ncalling onRegister', device.token)
        AsyncStorage.setItem('deviceToken', device.token);
      },
      permissions: { badge: false }
    });
  }

  clearDeviceToken() {
    http.put('/api/users/clear-device-token').catch(error => console.log(error));
  }

  updateDeviceToken() {
    AsyncStorage.getItem('deviceToken')
      .then(deviceToken => {
        console.log('====================================================\ncalling update token', deviceToken)
        if (deviceToken)
          return http.put('/api/users/update-device-token', JSON.stringify({ deviceToken: deviceToken }));
      }).catch(error => console.log(error));
  }
}

export default new NotificationService();