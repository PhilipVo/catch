import React, { Component } from 'react';
import { AppRegistry, AsyncStorage, Image, View } from 'react-native';
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
		// 3 - new user
		this.state = { mode: 0 };
	}

	componentDidMount() {
		navigation.login = this.checkEULA;
		navigation.logout = () => this.setState({ mode: 2 });
		navigation.register = () => this.setState({ mode: 3 });

		MessageBarManager.registerMessageBar(this.refs.alert);

		AsyncStorage.getItem('catchToken')
			.then(catchToken => {
				if (catchToken) {
					return session.setSession(catchToken)
						.then(this.checkEULA)
						.catch(error => { throw error });
				}
				else this.setState({ mode: 2 });
			}).catch(() => { });
	}

	checkEULA = () => {
		return AsyncStorage.getItem('catchEULA')
			.then(catchEULA => {
				if (catchEULA === 'signed') this.setState({ mode: 1 });
				else this.setState({ mode: 3 });
			});
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
			const LoginComponent = require('./components/login.component');

			this.Navigator = require('react-navigation').StackNavigator(
				{
					FacebookRegisterComponent: { screen: FacebookRegisterComponent },
					LoginComponent: { screen: LoginComponent }
				},
				{
					cardStyle: { backgroundColor: 'white' },
					headerMode: 'none',
					initialRouteName: 'LoginComponent'
				}
			);
		} else if (nextState.mode === 3) {
			const EULAComponent = require('./components/ftue/eula.component');
			const FTUEComponent = require('./components/ftue/ftue.component');

			this.Navigator = require('react-navigation').StackNavigator(
				{
					EULAComponent: { screen: EULAComponent },
					FTUEComponent: { screen: FTUEComponent },
				},
				{
					cardStyle: { backgroundColor: 'white' },
					headerMode: 'none',
					initialRouteName: 'EULAComponent'
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
