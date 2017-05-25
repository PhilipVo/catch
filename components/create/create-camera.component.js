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

export default class CreateCameraComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mirror: false,
      type: 1
    };
  }

  capture = () => {
    this.camera.capture()
      .then(data => this.props.navigation.navigate('CreatePreviewComponent', { story: data.path }))
      .catch(error => { });
  }

  toggle = () => {
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
              onPress={this.capture}
              style={{ alignSelf: 'center' }}
              underlayColor='transparent'>
              <View style={styles.button} />
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

        <TabComponent
          hideStatusBar={true}
          navigate={this.props.screenProps.navigate}
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