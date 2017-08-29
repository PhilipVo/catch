import React, { Component } from 'react';
import { View } from 'react-native';

export default class CreateCameraComponent extends Component {
  componentDidMount() {
    console.log('mounting create and resetting')
    this.props.navigation.navigate('CreateCameraComponent');
  }
  componentWillUnmount() {
    console.log('unmounting')
  }

  render() {
    return (<View />);
  }
}