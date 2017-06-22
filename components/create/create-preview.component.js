import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';
import Video from 'react-native-video';

import CreatePreviewModalComponent from './create-preview-modal.component';
import http from '../../services/http.service';


export default class CreatePreviewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      rate: 1.0,
      showModal: false
    };
  }

  componentDidMount() {
    http.get('/api/events/get-upcoming-associated-events')
      .then(events => this.setState({ events: events }))
      .catch(() => { })
  }

  render() {
    const { params } = this.props.navigation.state;
    return (

      <View style={{ flex: 1 }}>
        <StatusBar hidden={true} />

        {
          params.isVideo ?
            <Video source={{ uri: params.story }}
              ref={(ref) => {
                this.player = ref
              }}                                      // Store reference
              rate={this.state.rate}                              // 0 is paused, 1 is normal.
              volume={this.state.rate}                            // 0 is muted, 1 is normal.
              muted={false}                           // Mutes the audio entirely.
              paused={false}                          // Pauses playback entirely.
              resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
              repeat={true}                           // Repeat forever.
              playInBackground={false}                // Audio continues to play when app entering background.
              playWhenInactive={true}                // [iOS] Video continues to play when control or notification center are shown.
              ignoreSilentSwitch={"obey"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
              progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
              onLoadStart={this.loadStart}            // Callback when video starts to load
              onLoad={this.setDuration}               // Callback when video loads
              onProgress={this.setTime}               // Callback every ~250ms with currentTime
              onEnd={this.onEnd}                      // Callback when playback finishes
              onError={this.videoError}               // Callback when video cannot be loaded
              onBuffer={this.onBuffer}                // Callback when remote video is buffering
              onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
              style={styles.background} /> :
            <Image style={styles.background} source={{ uri: params.story }} />
        }


        {
          this.state.showModal ?
            <CreatePreviewModalComponent
              dispatch={this.props.navigation.dispatch}
              events={this.state.events}
              hideModal={() => this.setState({ showModal: false })}
              navigate={this.props.navigation.navigate}
              pause={() => this.setState({ rate: 0.0 })}
              play={() => this.setState({ rate: 1.0 })}
              story={params.story}
            /> : (
              <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <Icon
                  color='white'
                  name='clear'
                  onPress={() => this.props.navigation.goBack()}
                  size={40}
                  style={styles.clearIcon}
                  underlayColor='transparent' />
                <Icon
                  color='white'
                  name='angle-right'
                  onPress={() => this.setState({ showModal: true })}
                  size={60}
                  style={styles.arrowIcon}
                  type='font-awesome'
                  underlayColor='transparent' />
              </View>
            )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  arrowIcon: {
    alignSelf: 'flex-end',
    padding: 20
  },
  background: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0
  },
  clearIcon: {
    alignSelf: 'flex-start',
    marginTop: 20
  }
});
