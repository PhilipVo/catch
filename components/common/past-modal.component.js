////////////////////////////////////////////////////////////
//                PastModalComponent
// Modal that shows the stories of an event. Appears when a
// past event is clicked on.
// 
//                Required props
// hideModal (function): actions to take when modal closes
// navigate (function): navigate to new screen
// event (object): current event
// tabComponent (component): bottom tab component
////////////////////////////////////////////////////////////

const moment = require('moment');
import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ListView,
  Text,
  TextInput,
  TouchableHighlight,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modalbox';
import TimerMixin from 'react-timer-mixin';
import Video from 'react-native-video';

import PastModalTimerComponent from './past-modal-timer.component.js';

import http from '../../services/http.service';

export default class PastModalComponent extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      comment: '',
      comments: [],
      dataSource: this.ds.cloneWithRows([]),
      index: 0,
      item: null,
      loading: true,
      rate: 1.0,
      showComments: false,
      stories: [],
      timerDownAnimation: new Animated.Value(1),
      timerUpAnimation: new Animated.Value(0)
    };
  }

  componentDidMount() {
    http.get(`/api/events/get-contributions-for-event/${this.props.event.id}`)
      .then(data => {
        console.log(data)
        if (data.stories.length > 0)
          this.setState({
            comments: data.comments,
            dataSource: this.ds.cloneWithRows(data.comments),
            item: data.stories[0],
            loading: false,
            stories: data.stories
          });
        else this.setState({
          comments: data.comments,
          dataSource: this.ds.cloneWithRows(data.comments),
          loading: false
        });
      }).catch(error => {
        console.log(error)
        this.props.hideModal();
        Alert.alert('Error', typeof error === 'string' ? error : 'Oops, something went wrong.');
      })
  }

  componentWillUpdate(nextProps, nextState) {
    if (!this.state.showComments && nextState.showComments)
      _listView.scrollToEnd();
  }

  componentDidUpdate() {
    this.setItem();
    this.animation = Animated.parallel([
      Animated.timing(this.state.timerDownAnimation, {
        duration: 4000,
        toValue: 0
      }),
      Animated.timing(this.state.timerUpAnimation, {
        duration: 4000,
        toValue: 1
      })
    ]).start();
  }

  comment = () => {
    if (this.state.comment.length > 0) {
      const data = {
        comment: this.state.comment,
        eventId: this.props.event.id
      };

      http.post('/api/comments', JSON.stringify(data))
        .then(() => {
          const _comments = this.state.comments.slice();
          _comments.push({
            comment: this.state.comment,
            username: session.username
          });

          this.setState({
            comment: '',
            comments: _comments,
            dataSource: this.ds.cloneWithRows(_comments)
          });
        }).catch(error => {
          console.log(error)
          Alert.alert('Error', typeof error === 'string' ? error : 'Oops, something went wrong.');
        });
    }
  }

  nextItem = () => {
    console.log('next called')
    if (this.animation) this.animation.stop();
    if (this.interval) TimerMixin.clearInterval(this.interval);

    const currentItem = this.state.item;
    const nextItem = this.state.stories[this.state.index + 1];
    if (nextItem) {
      this.setState({
        index: this.state.index + 1,
        item: nextItem,
        timerDownAnimation: new Animated.Value(1),
        timerUpAnimation: new Animated.Value(0)
      });
    } else this.props.hideModal();
  }

  previousItem = () => {
    console.log('previous called')
    if (this.animation) this.animation.stop();
    if (this.interval) TimerMixin.clearInterval(this.interval);

    const currentItem = this.state.item;
    const previousItem = this.state.stories[this.state.index - 1];
    if (previousItem) {
      this.setState({
        index: this.state.index - 1,
        item: previousItem,
        timerDownAnimation: new Animated.Value(1),
        timerUpAnimation: new Animated.Value(0)
      });
    } else {
      this.setState({
        timerDownAnimation: new Animated.Value(1),
        timerUpAnimation: new Animated.Value(0)
      });
    }
  }

  setItem = () => {
    console.log('setItem called')
    const currentItem = this.state.item;
    const nextItem = this.state.stories[this.state.index + 1];
    if (nextItem) {
      this.interval = TimerMixin.setTimeout(() => {
        this.setState({
          index: this.state.index + 1,
          item: nextItem,
          timerDownAnimation: new Animated.Value(1),
          timerUpAnimation: new Animated.Value(0)
        });
      }, 4000);
    } else this.interval = TimerMixin.setTimeout(this.props.hideModal, 4000);
  }

  viewUser = username => {
    http.get(`/api/users/get-info-for-user/${username}`)
      .then(data => {
        TimerMixin.clearInterval(this.interval);
        this.props.hideModal();
        this.props.navigate('ProfileComponent', {
          data: data,
          tabComponent: this.props.tabComponent
        });
      })
      .catch(() => { });
  }

  render() {
    let bars = [];
    for (let i = 0; i < this.state.stories.length; i++) {
      bars.push(
        <View
          key={i}
          style={styles.bar}>
          {
            i === this.state.index ?
              <View style={styles.barView}>
                <Animated.View style={{
                  backgroundColor: 'white',
                  borderRadius: 5,
                  flex: this.state.timerUpAnimation
                }} />
                <Animated.View style={{ flex: this.state.timerDownAnimation }} />
              </View> : null
          }
        </View>
      );
    }

    return (
      <Modal
        isOpen={true}
        onClosed={() => {
          TimerMixin.clearInterval(this.interval);
          this.props.hideModal();
        }}
        swipeToClose={true}>
        <StatusBar hidden={true} />

        {
          this.state.loading ?
            <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
              <ActivityIndicator />
              <Text>Loading...</Text>
            </View> : this.state.stories.length > 0 ?
              <View style={{ flex: 1 }}>

                {
                  this.state.item.type === 1 ?
                    <Video source={{ uri: `${http.s3}/events/${this.props.event.id}/${this.state.item.id}` }}
                      ref={(ref) => {
                        this.player = ref
                      }}                                      // Store reference
                      rate={this.state.rate}                  // 0 is paused, 1 is normal.
                      volume={this.state.rate}                // 0 is muted, 1 is normal.
                      muted={false}                           // Mutes the audio entirely.
                      paused={false}                          // Pauses playback entirely.
                      resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
                      repeat={true}                           // Repeat forever.
                      playInBackground={false}                // Audio continues to play when app entering background.
                      playWhenInactive={true}                 // [iOS] Video continues to play when control or notification center are shown.
                      ignoreSilentSwitch={"obey"}             // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
                      progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
                      onLoadStart={this.loadStart}            // Callback when video starts to load
                      onLoad={this.setDuration}               // Callback when video loads
                      onProgress={this.setTime}               // Callback every ~250ms with currentTime
                      onEnd={this.onEnd}                      // Callback when playback finishes
                      onError={this.videoError}               // Callback when video cannot be loaded
                      onBuffer={this.onBuffer}                // Callback when remote video is buffering
                      onTimedMetadata={data => console.log('metadata is:', data)}  // Callback when the stream receive some metadata
                      style={styles.background} /> :
                    <Image
                      source={{ uri: `${http.s3}/events/${this.props.event.id}/${this.state.item.id}` }}
                      style={styles.background} />
                }

                <View style={styles.top}>
                  {/* Timer bars */}
                  <View style={{ flexDirection: 'row' }}>{bars}</View>

                  <Text style={styles.title}>{this.props.event.title}</Text>
                  <Text
                    onPress={() => this.viewUser(this.props.event.username)}
                    style={styles.username}>
                    {this.props.event.username}
                  </Text>
                </View>

                <KeyboardAvoidingView
                  behavior='padding'
                  style={this.state.showComments ? { flex: 1 } : { display: 'none' }}>
                  <ListView
                    dataSource={this.state.dataSource}
                    enableEmptySections={true}
                    ref={listView => _listView = listView}
                    removeClippedSubviews={false}
                    renderRow={(rowData, sectionID, rowID) => (
                      <View style={styles.commentView}>
                        <TouchableHighlight
                          onPress={() => this.viewUser(rowData.username)}>
                          <Image
                            source={{ uri: `${http.s3}/users/${rowData.username}` }}
                            style={styles.commentImage} />
                        </TouchableHighlight>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.comment}>{rowData.comment}</Text>
                        </View>
                      </View>
                    )} />

                  <TextInput
                    autoCapitalize='sentences'
                    autoCorrect={true}
                    maxLength={120}
                    onChangeText={(comment) => this.setState({ comment: comment })}
                    onSubmitEditing={this.comment}
                    placeholder='comment'
                    returnKeyType='send'
                    style={styles.modalTextInput}
                    value={this.state.comment} />
                </KeyboardAvoidingView>

                <View style={this.state.showComments ? { display: 'none' } : styles.bottom}>
                  <Icon
                    color='white'
                    name='arrow-up'
                    onPress={() => this.setState({ showComments: true })}
                    size={30}
                    type='simple-line-icon' />
                  <Text
                    onPress={() => this.setState({ showComments: true })}
                    style={styles.username}>
                    comments
                      </Text>
                </View>

                <TouchableHighlight
                  onPress={this.previousItem}
                  style={styles.left}
                  underlayColor='transparent'>
                  <View />
                </TouchableHighlight>

                <TouchableHighlight
                  onPress={this.nextItem}
                  style={styles.right}
                  underlayColor='transparent'>
                  <View />
                </TouchableHighlight>

              </View> :

              <View style={styles.empty}>
                <Text>No posts were added to this event</Text>
              </View>
        }

      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0
  },
  bar: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 5,
    height: 2,
    marginHorizontal: 1
  },
  barView: {
    borderRadius: 5,
    flex: 1,
    flexDirection: 'row'
  },
  bottom: {
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10
  },
  comment: {
    backgroundColor: 'white',
    flex: 1,
    minHeight: 50,
    padding: 10
  },
  commentImage: {
    height: 50,
    width: 50
  },
  commentView: {
    flex: 1,
    flexDirection: 'row',
    padding: 2
  },
  empty: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
    flex: 1,
    justifyContent: 'center'
  },
  image: {
    flex: 1,
    height: null,
    paddingHorizontal: 10,
    width: null
  },
  left: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: Dimensions.get('window').width / 2,
    top: 100,
  },
  modalTextInput: {
    backgroundColor: 'white',
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 1,
    height: 40,
    marginTop: 5,
    padding: 10
  },
  right: {
    bottom: 0,
    left: Dimensions.get('window').width / 2,
    position: 'absolute',
    right: 0,
    top: 100,
  },
  top: {
    flex: 1,
    paddingTop: 20
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 20,
    textAlign: 'right',
    textShadowColor: 'black',
    textShadowOffset: { width: 0.5, height: 0.5 }
  },
  username: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 16,
    textAlign: 'right',
    textShadowColor: 'black',
    textShadowOffset: { width: 0.5, height: 0.5 }
  }
});