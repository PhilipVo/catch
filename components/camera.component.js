import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Camera from 'react-native-camera';
import { Icon } from 'react-native-elements';

import TabComponent from './tab.component'

import http from '../services/http.service';

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
        <View style={styles.view}>
          <TouchableHighlight onPress={this.capture} underlayColor='transparent'>
            <View style={styles.button} />
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

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  view: {
    alignItems: 'center',
    flex: 11,
    justifyContent: 'flex-end'
  },
  button: {
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: 45,
    borderWidth: 2,
    height: 90,
    width: 90
  },
});