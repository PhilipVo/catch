import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

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
        screenProps={{ navigate: this.props.navigation.navigate }} />
    );
  }
}