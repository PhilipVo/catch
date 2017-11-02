import React, { Component } from 'react';
import { AppRegistry, AsyncStorage, Image, View } from 'react-native';
import { MessageBar, MessageBarManager } from 'react-native-message-bar';

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
			const AccountNavigatorComponent = require('./components/account/account-navigator.component');
			const CameraComponent = require('./components/camera.component');
			const CreateNavigatorComponent = require('./components/create/create-navigator.component');
			const FeedNavigatorComponent = require('./components/feed/feed-navigator.component');

			this.Navigator = require('react-navigation').TabNavigator(
				{
					AccountNavigatorComponent: { screen: AccountNavigatorComponent },
					CameraComponent: { screen: CameraComponent },
					CreateNavigatorComponent: { screen: CreateNavigatorComponent },
					FeedNavigatorComponent: { screen: FeedNavigatorComponent },
				},
				{
					headerMode: 'none',
					initialRouteName: 'FeedNavigatorComponent',
					navigationOptions: { tabBarVisible: false }
				}
			);

			this.screenProps = { logout: () => this.setState({ mode: 2 }) };
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

			this.screenProps = {
				login: this.checkEULA,
				register: () => this.setState({ mode: 3 })
			};
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

			this.screenProps = { login: this.checkEULA };
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
						<this.Navigator screenProps={this.screenProps} />
				}

				<MessageBar ref='alert' />
			</View>
		);
	}
}

AppRegistry.registerComponent('Catch', () => Catch);
