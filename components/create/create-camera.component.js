import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Camera from 'react-native-camera';
import { Icon } from 'react-native-elements';
import ProgressCircle from 'react-native-progress/Circle';

import TabComponent from '../common/tab.component';

export default class CreateCameraComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      d: 0,
      recordAnimation: new Animated.Value(0),
      mirror: false,
      type: 1
    };
  }

  capture = () => {
    const options = {
      target: Camera.constants.CaptureTarget.temp,
      mode: Camera.constants.CaptureMode.still
    };

    this.camera.capture(options)
      .then(data => this.props.navigation.navigate('CreatePreviewComponent', { story: data.path }))
      .catch(error => console.log(error));
  }

  record = () => {
    const options = {
      audio: true,
      mode: Camera.constants.CaptureMode.video,
      target: Camera.constants.CaptureTarget.temp,
      totalSeconds: 8
    };

    Animated.timing(this.state.recordAnimation, {
      duration: 8000,
      toValue: 1
    }).start();

    this.camera.capture(options)
      .then(data => {
        this.props.navigation.navigate('CreatePreviewComponent', {
          isVideo: true,
          story: data.path
        });
      }).catch(() => { });
  }

  stop = () => {
    this.setState({ recordAnimation: new Animated.Value(0) });
    this.camera.stopCapture();
  }

  toggle = () => {
    if (this.state.type === 1) this.setState({ mirror: true, type: 2 });
    else this.setState({ mirror: false, type: 1 });
  }

  render() {
    return (
      <Camera
        mirrorImage={this.state.mirror}
        ref={cam => this.camera = cam}
        style={styles.camera}
        type={this.state.type}>

        {/* Skip button */}
        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('CreateNewEventComponent')}
          style={{ flex: 1 }}>
          <View style={styles.skipView}>
            <Text style={styles.skipText}>Skip  </Text>
            <Icon
              color='rgba(255,255,255,0.5)'
              name='angle-right'
              size={33}
              type='font-awesome'
              underlayColor='transparent' />
          </View>
        </TouchableHighlight>

        {/* Capture button */}
        <View style={styles.view}>
          <View style={{ flex: 1 }} />
          <View style={styles.buttonView}>
            <TouchableHighlight
              onLongPress={this.record}
              onPress={this.capture}
              onPressOut={this.stop}
              style={{ alignSelf: 'center' }}
              underlayColor='transparent'>
              <View style={styles.button}>
                <View style={{
                  backgroundColor: 'red',
                  borderRadius: 45 * this.state.d,
                  height: 90 * this.state.d,
                  width: 90 * this.state.d,
                }} />
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.flip}>
            <Icon
              color='rgba(255,255,255,0.5)'
              name='loop'
              onPress={this.toggle}
              size={35}
              style={{ marginBottom: 30 }}
              underlayColor='transparent' />
          </View>
        </View>

        <TabComponent navigate={this.props.screenProps.navigate} tab='create' />

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
  buttonView: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  flip: {
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'flex-end'
  },
  skipText: {
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,0.5)',
    fontSize: 20
  },
  skipView: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10
  },
  view: {
    flex: 10,
    flexDirection: 'row'
  }
});