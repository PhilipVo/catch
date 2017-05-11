import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import CreateComponent from './create.component';

module.exports = class CreateNavigatorComponent extends Component {
  constructor(props) {
    super(props);
    console.log('constructed create navigator')
  }

  render() {
    const CreateNavigator = StackNavigator({
      CreateComponent: { screen: CreateComponent }
    }, {
        headerMode: 'none'
      });

    return (
      <CreateNavigator screenProps={{ navigate: this.props.navigation.navigate }} />
    );
  }
}