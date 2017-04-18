import React, { Component } from 'react';
import {
  Image,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Camera from 'react-native-camera';

import http from '../services/http.service';
import styles from '../services/styles.service';

export default class CameraComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 1,
      mirror: false,
    };
  }

  capture() {
    this.camera.capture()
      .then(data => this.props.navigator.push({ component: 'PreviewComponent', path: data.path }))
      .catch(error => { });
  }

  toggle() {
    if (this.state.type === 1)
      this.setState({ type: 2, mirror: true });
    else
      this.setState({ type: 1, mirror: false });
  }

  render() {
    return (
      <Camera style={styles.camera}
        captureTarget={Camera.constants.CaptureTarget.temp}
        mirrorImage={this.state.mirror}
        ref={cam => this.camera = cam}
        type={this.state.type} >
        <View style={styles.cameraView}>
          <TouchableHighlight underlayColor='transparent' onPress={this.capture}>
            <View style={styles.cameraWhiteCircle} />
          </TouchableHighlight>
        </View>
      </Camera >
    );
  }
}