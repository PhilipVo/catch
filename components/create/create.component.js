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

import TabComponent from '../common/tab.component';

import http from '../../services/http.service';

export default class CreateCameraComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mirror: false,
      type: 1
    };
  }

  capture() {
    // this.camera.capture()
    //   .then(data => this.props.createNavigator.push({ component: 'PreviewComponent', path: data.path }))
    //   .catch(error => { });
  }

  toggle() {
    if (this.state.type === 1)
      this.setState({ mirror: true, type: 2 });
    else
      this.setState({ mirror: false, type: 1 });
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
          navigator={this.props.navigator}
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
  button: {
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: 45,
    borderWidth: 2,
    height: 90,
    width: 90
  },
  view: {
    alignItems: 'center',
    flex: 11,
    justifyContent: 'flex-end'
  }
});