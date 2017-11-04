import React, { Component } from 'react';
import { NavigationActions, StackNavigator } from 'react-navigation';

import CreateComponent from './create.component';
import CreatePreviewComponent from './create-preview.component';
import TabComponent from '../common/tab.component';

import ResetService from '../../services/reset.service';

module.exports = class CreateNavigatorComponent extends Component {
	componentDidMount() {
		ResetService.resetCreate = () => {
			this.props.navigation.navigate('CameraComponent');
			this.reset('CreateComponent');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.navigation.state.params)
			this.reset('CreatePreviewComponent', nextProps.navigation.state.params);
	}

	shouldComponentUpdate() {
		return false;
	}

	reset = (routeName, params) => {
		this.navigator.dispatch(NavigationActions.reset({
			actions: [NavigationActions.navigate({ routeName: routeName, params: params })],
			index: 0
		}));
	}

	render() {
		return (
			<CreateNavigator
				ref={nav => this.navigator = nav}
				screenProps={{
					navigate: this.props.navigation.navigate,
					tabComponent: <TabComponent
						navigate={this.props.navigation.navigate}
						tab='create' />
				}} />
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