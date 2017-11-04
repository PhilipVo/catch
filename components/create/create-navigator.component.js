import React, { Component } from 'react';
import { NavigationActions, StackNavigator } from 'react-navigation';

import CreateComponent from './create.component';
import CreatePreviewComponent from './create-preview.component';
import TabComponent from '../common/tab.component';

import navigation from '../../services/navigation.service';

module.exports = class CreateNavigatorComponent extends Component {
	componentDidMount() {
		navigation.resetCreate = () => {
			navigation.navigate('Camera');
			this.navigator.dispatch(NavigationActions.reset({
				actions: [NavigationActions.navigate({ routeName: 'CreateComponent' })],
				index: 0
			}));
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.navigation.state.params)
			this.navigator.dispatch(NavigationActions.reset({
				actions: [NavigationActions.navigate({
					routeName: 'CreatePreviewComponent',
					params: nextProps.navigation.state.params
				})],
				index: 0
			}));
	}

	shouldComponentUpdate() {
		return false;
	}

	render() {
		return (
			<CreateNavigator ref={nav => this.navigator = nav} />
		);
	}
}

const CreateNavigator = StackNavigator(
	{
		CreateComponent: { screen: CreateComponent },
		CreatePreviewComponent: { screen: CreatePreviewComponent }
	},
	{
		cardStyle: { backgroundColor: 'white' },
		headerMode: 'none',
		initialRouteName: 'CreateComponent',
	}
);