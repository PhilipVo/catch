import React, { Component } from 'react';
import { Alert, AppRegistry, AsyncStorage, Image, View } from 'react-native';
import { MessageBar, MessageBarManager } from 'react-native-message-bar';

import navigation from './services/navigation.service';
import session from './services/session.service';

console.ignoredYellowBox = [
	'Warning: Accessing',
	'Warning: BackAndroid',
	'Warning: checkPropTypes',
	'Warning: View.propTypes',
	'Warning: Invalid argument supplied to oneOf'
];

export default class Catch extends Component {
	constructor(props) {
		super(props);

		// Modes:
		// 0 - loading
		// 1 - logged in
		// 2 - logged out
		// 3 - first time opening app
		this.state = { mode: 0 };
	}

	componentDidMount() {
		navigation.login = () => this.setState({ mode: 1 });
		navigation.logout = () => this.setState({ mode: 2 });

		MessageBarManager.registerMessageBar(this.refs.alert);

		AsyncStorage.getItem('isFirstTime')
			.then(isFirstTime => {
				if (isFirstTime !== "false") {
					this.setState({ mode: 3 });
				} else {
					AsyncStorage.getItem('catchToken')
						.then(catchToken => {
							if (catchToken) {
								return session.setSession(catchToken)
									.catch(error => { throw error });
							} else this.setState({ mode: 2 });
						}).catch(error => { Alert.alert('error', error) });
				}
			}).catch(error => { Alert.alert('error', error) });
	}

	componentWillUpdate(nextProps, nextState) {
		// Conditionally load components ('lazy loading'):
		if (nextState.mode === 1) {
			const Account = require('./components/account/account-navigator.component');
			const Camera = require('./components/camera.component');
			const Create = require('./components/create/create-navigator.component');
			const Feed = require('./components/feed/feed-navigator.component');

			this.Navigator = require('react-navigation').TabNavigator(
				{
					Account: { screen: Account },
					Camera: { screen: Camera },
					Create: { screen: Create },
					Feed: { screen: Feed },
				},
				{
					headerMode: 'none',
					initialRouteName: 'Feed',
					navigationOptions: { tabBarVisible: false }
				}
			);
		} else if (nextState.mode === 2) {
			const FacebookRegisterComponent = require('./components/facebook-register.component');
			const EULAComponent = require('./components/eula.component');
			const LoginComponent = require('./components/login.component');

			this.Navigator = require('react-navigation').StackNavigator(
				{
					FacebookRegisterComponent: { screen: FacebookRegisterComponent },
					EULAComponent: { screen: EULAComponent },
					LoginComponent: { screen: LoginComponent }
				},
				{
					cardStyle: { backgroundColor: 'white' },
					headerMode: 'none',
					initialRouteName: 'LoginComponent'
				}
			);
		} else if (nextState.mode === 3) {
			const FTUEComponent = require('./components/ftue/ftue.component');

			this.Navigator = require('react-navigation').StackNavigator(
				{
					FTUEComponent: { screen: FTUEComponent }
				},
				{
					cardStyle: { backgroundColor: 'white' },
					headerMode: 'none'
				}
			);
		}
	}

	componentWillUnmount() {
		MessageBarManager.unregisterMessageBar();
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				{
					this.state.mode === 0 ?
						<Image style={{ flex: 1, width: null }} source={require('./images/splash.png')} /> :
						<this.Navigator />
				}

				<MessageBar ref='alert' />
			</View>
		);
	}
}

AppRegistry.registerComponent('Catch', () => Catch);
