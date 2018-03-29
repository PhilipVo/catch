import { AsyncStorage } from 'react-native';
import PushNotification from 'react-native-push-notification';

import http from './http.service';
import navigation from './navigation.service';

class NotificationService {
	configure() {
		PushNotification.configure({
			onNotification: notification => {
				navigation.resetAccount();
				navigation.resetFeed();
			},
			onRegister: device => {
				AsyncStorage.setItem('deviceToken', device.token);
			},
			permissions: {
				alert: true,
				badge: false,
				sound: true
			}
		});

		AsyncStorage.getItem('deviceToken')
			.then(deviceToken => {
				if (deviceToken)
					return http.put('/api/users/update-device-token', JSON.stringify({ deviceToken: deviceToken }));
			}).catch(error => { });
	}
}

export default new NotificationService();