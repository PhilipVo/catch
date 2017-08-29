import React, { Component } from 'react';
import { NavigationActions, StackNavigator } from 'react-navigation';

import CreateComponent from './create.component';
import CreatePreviewComponent from './create-preview.component';
import TabComponent from '../common/tab.component';

module.exports = class CreateNavigatorComponent extends Component {
  componentWillReceiveProps(nextProps) {
    console.log('got nextProps', nextProps)
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
          reset: () => {
            this.props.navigation.navigate('CameraComponent');
            this.reset('CreateComponent');
          },
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