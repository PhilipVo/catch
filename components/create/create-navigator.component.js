import React, { Component } from 'react';
import { NavigationActions, StackNavigator } from 'react-navigation';

import CreateCameraComponent from './create-camera.component';
import CreateCompleteComponent from './create-complete.component';
import CreateNewEventComponent from './create-new-event.component';
import CreatePreviewComponent from './create-preview.component';

module.exports = class CreateNavigatorComponent extends Component {
  render() {
    const CreateNavigator = StackNavigator(
      {
        CreateCameraComponent: { screen: CreateCameraComponent },
        CreateCompleteComponent: { screen: CreateCompleteComponent },
        CreateNewEventComponent: { screen: CreateNewEventComponent },
        CreatePreviewComponent: { screen: CreatePreviewComponent, key: 'preview' }
      },
      {
        cardStyle: { backgroundColor: 'white' },
        headerMode: 'none',
        initialRouteName: 'CreateCameraComponent',
      }
    );

    return (
      <CreateNavigator
        ref={nav => this.navigator = nav}
        screenProps={{
          navigate: this.props.navigation.navigate,
          reset: () => this.navigator.dispatch(NavigationActions.reset({
            actions: [NavigationActions.navigate({ routeName: 'CreateCameraComponent' })],
            index: 0
          }))
        }} />
    );
  }
}