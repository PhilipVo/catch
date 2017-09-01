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
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import TabComponent from './common/tab.component';

module.exports = class CameraComponent extends Component {
  constructor(props) {
    super(props);

    this.captureOptions = {
      mode: Camera.constants.CaptureMode.still,
      target: Camera.constants.CaptureTarget.temp
    };

    this.recordOptions = {
      audio: true,
      mode: Camera.constants.CaptureMode.video,
      target: Camera.constants.CaptureTarget.temp,
      totalSeconds: 8
    };

    this.state = {
      flashMode: 2,
      mirror: false,
      recordAnimation: new Animated.Value(0),
      type: 1
    };
  }

  capture = () => {
    this.camera.capture(this.captureOptions)
      .then(data => this.props.navigation.navigate('CreateNavigatorComponent', { story: data.path }))
      .catch(() => { });
  }

  onZoomChanged = () => { }

  record = () => {
    this.refs.circle.performLinearAnimation(100, 8000);
    this.camera.capture(this.recordOptions)
      .then(data => {
        this.props.navigation.navigate('CreateNavigatorComponent', {
          isVideo: true,
          story: data.path
        });
      }).catch(() => { });
  }

  stop = () => {
    this.refs.circle.state.chartFillAnimation.resetAnimation();
    this.setState({ recordAnimation: new Animated.Value(0) });
    this.camera.stopCapture();
  }

  toggleFlashMode = () => {
    if (this.state.flashMode === 2) this.setState({ flashMode: 1 });
    else if (this.state.flashMode === 1) this.setState({ flashMode: 0 });
    else this.setState({ flashMode: 2 });
  }

  toggleType = () => {
    if (this.state.type === 1) this.setState({ mirror: true, type: 2 });
    else this.setState({ mirror: false, type: 1 });
  }

  render() {
    return (
      <Camera
        flashMode={this.state.flashMode}
        orientation='portrait'
        mirrorImage={this.state.mirror}
        onZoomChanged={this.onZoomChanged}
        ref={cam => this.camera = cam}
        style={styles.camera}
        type={this.state.type}>

        {/* Skip button */}
        <View style={styles.skipView}>
          <Text
            onPress={() => this.props.navigation.navigate('CreateNavigatorComponent')}
            style={styles.skipText}>Skip  </Text>
          <Icon
            color='rgba(255,255,255,0.5)'
            name='angle-right'
            onPress={() => this.props.navigation.navigate('CreateNavigatorComponent')}
            size={33}
            type='font-awesome'
            underlayColor='transparent' />
        </View>

        {/* Capture button */}
        <View style={styles.view}>
          <View style={styles.light}>
            <Icon
              color='rgba(255,255,255,0.5)'
              name={this.state.flashMode === 0 ? 'flash-off' :
                this.state.flashMode === 1 ? 'flash-on' :
                  'flash-auto'}
              onPress={this.toggleFlashMode}
              size={35}
              style={{ marginBottom: 30 }}
              underlayColor='transparent' />
          </View>
          <View style={styles.buttonView}>
            <AnimatedCircularProgress
              backgroundColor='gray'
              fill={0}
              ref='circle'
              rotation={0}
              size={90}
              style={{
                alignSelf: 'center',
                backgroundColor: 'transparent',
              }}
              tintColor="rgba(255,0,0,1)"
              width={5}>
              {() => (
                <TouchableHighlight
                  onLongPress={this.record}
                  onPress={this.capture}
                  onPressOut={this.stop}
                  style={{ alignSelf: 'center', position: 'absolute' }}
                  underlayColor='transparent'>
                  <View style={styles.button} />
                </TouchableHighlight>
              )}
            </AnimatedCircularProgress>
          </View>
          <View style={styles.flip}>
            <Icon
              color='rgba(255,255,255,0.5)'
              name='loop'
              onPress={this.toggleType}
              size={35}
              style={{ marginBottom: 30 }}
              underlayColor='transparent' />
          </View>
        </View>

        <TabComponent navigate={this.props.navigation.navigate} tab='camera' />
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
    borderRadius: 45,
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
  light: {
    alignItems: 'flex-end',
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