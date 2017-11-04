import React, { Component } from 'react';
import { NavigationActions, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import FeedComponent from './feed.component';
import ProfileComponent from '../common/profile.component';

import navigation from '../../services/navigation.service';

module.exports = class FeedNavigatorComponent extends Component {
	componentDidMount() {
		navigation.resetFeed = () => this.navigator.dispatch(NavigationActions.reset({
			actions: [NavigationActions.navigate({ routeName: 'FeedComponent' })],
			index: 0
		}));;
	}

	shouldComponentUpdate() {
		return false;
	}

	render() {
		return (
			<FeedNavigator
				ref={nav => this.navigator = nav} />
		);
	}
}

const FeedNavigator = StackNavigator(
	{
		FeedComponent: { screen: FeedComponent },
		ProfileComponent: { screen: ProfileComponent }
	},
	{
		cardStyle: { backgroundColor: 'white' },
		headerMode: 'none',
		initialRouteName: 'FeedComponent'
	}
);