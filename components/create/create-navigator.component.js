import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import CreateCameraComponent from './create-camera.component';
import CreatePreviewComponent from './create-preview.component';

module.exports = class CreateNavigatorComponent extends Component {
  constructor(props) {
    super(props);
    console.log('constructed create navigator')
  }

  render() {
    const CreateNavigator = StackNavigator({
      CreateCameraComponent: { screen: CreateCameraComponent },
      CreatePreviewComponent: { screen: CreatePreviewComponent }
    }, {
        headerMode: 'none',
        initialRouteName: 'CreateCameraComponent',
      });

    return (
      <CreateNavigator screenProps={{ navigate: this.props.navigation.navigate }} />
    );
  }
}