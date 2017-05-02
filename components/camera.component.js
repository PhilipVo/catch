import React, { Component } from 'react';
import {
  Image,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Camera from 'react-native-camera';
import { Icon } from 'react-native-elements';

import TabComponent from './tab.component'

import http from '../services/http.service';
import styles from '../styles/styles';

export default class CameraComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 1,
      mirror: false
    };
  }

  capture() {
    console.log('captured')
    // this.camera.capture()
    //   .then(data => this.props.navigator.push({ component: 'PreviewComponent', path: data.path }))
    //   .catch(error => { });
  }

  toggle() {
    if (this.state.type === 1)
      this.setState({ type: 2, mirror: true });
    else
      this.setState({ type: 1, mirror: false });
  }

  render() {
    return (
      <Camera
        captureTarget={Camera.constants.CaptureTarget.temp}
        mirrorImage={this.state.mirror}
        ref={cam => this.camera = cam}
        style={styles.camera}
        type={this.state.type} >
        <View style={styles.cameraView}>
          <TouchableHighlight onPress={this.capture} underlayColor='transparent'>
            <View style={styles.cameraWhiteCircle} />
          </TouchableHighlight>
        </View>
        <TabComponent
          capture={this.capture}
          mainNavigator={this.props.mainNavigator}
          tab='create' />
      </Camera>
    );
  }
}