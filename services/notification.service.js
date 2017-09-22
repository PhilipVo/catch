import { AsyncStorage } from 'react-native';
import PushNotification from 'react-native-push-notification';

import http from './http.service';

class NotificationService {
  constructor() {
    this.refreshAccount;
    this.refreshFeed;

    // Configure notifications:        
    PushNotification.configure({
      onNotification: notification => {
        try {
          this.refreshAccount();
          this.refreshFeed();
        } catch (error) { }
      },
      onRegister: device => {
        AsyncStorage.setItem('deviceToken', device.token);
      },
      permissions: { badge: false }
    });
  }

  updateDeviceToken() {
    AsyncStorage.getItem('deviceToken')
      .then(deviceToken => {
        if (deviceToken)
          return http.put('/api/users/update-device-token', JSON.stringify({ deviceToken: deviceToken }));
      }).catch(error => { });
  }
}

export default new NotificationService();