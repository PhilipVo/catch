import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class ProfileComponent extends Component {
  componentDidMount() {
    console.log('mounted profile');
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'green' }}>

        <Text>Profile Component</Text>
      </View>
    );
  }
}