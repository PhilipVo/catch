import React, { Component } from 'react';
import { Text } from 'react-native';

import CameraComponent from './camera.component';
import PreviewComponent from './preview.component';

export default class CreateComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: '',
    };
  }

  componentDidMount() {
    console.log('mounted create')
  }

  reset() {

  }

  render() {
    return (
      this.state.path ?
        <PreviewComponent path={this.state.path} /> :
        <CameraComponent navigator={this.props.navigator} path={this.state.path} />
    );
  }
}