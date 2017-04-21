import React, { Component } from 'react';
import { Text, View } from 'react-native';

import TabBarComponent from './tab-bar.component';

export default class ProfileComponent extends Component {
  componentDidMount() {
    console.log('mounted profile');
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 11, backgroundColor: 'green' }}>
          <Text>Profile Component</Text>
        </View>
        <TabBarComponent navigator={this.props.navigator} tab={'profile'} />
      </View>
    );
  }
}