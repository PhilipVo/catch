const moment = require('moment');
import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  Image,
  Keyboard,
  ListView,
  Platform,
  Text,
  TextInput,
  TouchableHighlight,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';
import { ShareDialog } from 'react-native-fbsdk';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modalbox';
import Video from 'react-native-video';

import http from '../../services/http.service';
import session from '../../services/session.service';

export default class PastModalComponent extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      comment: '',
      comments: [],
      dataSource: this.ds.cloneWithRows([]),
      done: false,
      index: 0,
      item: null,
      loading: true,
      rate: 1.0,
      shared: false,
      showComments: false,
      stories: [],
      timerDownAnimation: new Animated.Value(1),
      timerUpAnimation: new Animated.Value(0)
    };
  }

  componentDidMount() {
    http.get(`/api/events/get-contributions-for-event/${this.props.event.id}`)
      .then(data => {
        if (data.stories.length > 0) {
          this.setState({
            comments: data.comments,
            dataSource: this.ds.cloneWithRows(data.comments),
            item: data.stories[0],
            loading: false,
            stories: data.stories
          });
        } else {
          this.setState({
            comments: data.comments,
            dataSource: this.ds.cloneWithRows(data.comments),
            loading: false
          });
        }
      }).catch(error => {
        this.props.hideModal();
        Alert.alert('Error', typeof error === 'string' ? error : 'Oops, something went wrong.');
      });
  }

  componentDidUpdate() {
    setTimeout(() => {
      if (this._listView) this._listView.scrollToEnd();
    }, 1000);
  }

  comment = () => {
    if (this.state.comment.length > 0) {
      http.post('/api/comments', JSON.stringify({
        comment: this.state.comment,
        username: this.props.event.username,
        eventId: this.props.event.id,
        title: this.props.event.title
      })).then(() => {
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

        socket.emit('commented', {
          commenter: session.username,
          creator: this.props.event.username,
          title: this.props.event.title
        });
      }).catch(() => { });
    }
  }

  nextItem = () => {
    if (this.animation) {
      this.animation.stop();
      this.animation = undefined;
    }

    const currentItem = this.state.item;
    const nextItem = this.state.stories[this.state.index + 1];
    if (nextItem) {
      this.setState({
        index: this.state.index + 1,
        item: nextItem,
        timerDownAnimation: new Animated.Value(1),
        timerUpAnimation: new Animated.Value(0)
      });
    } else if (session.isFacebookUser) {
      this.setState({
        done: true,
        // rate: 0.0
      });
    } else this.props.hideModal();
  }

  onBuffer = data => {
    if (data.isBuffering && this.animation) this.animation.stop();
    else if (this.animation && !this.state.showComments)
      this.animation.start(data => {
        if (data.finished) {
          this.animation = undefined;
          this.nextItem();
        }
      });
  }

  onLoad = data => {
    const duration = data.duration ? parseInt(data.duration * 1000, 10) : false;

    this.animation = Animated.parallel([
      Animated.timing(this.state.timerDownAnimation, {
        duration: duration ? duration : 4000,
        toValue: 0
      }),
      Animated.timing(this.state.timerUpAnimation, {
        duration: duration ? duration : 4000,
        toValue: 1
      })
    ]);

    if (!duration && !this.state.showComments)
      this.animation.start(data => {
        if (data.finished) {
          this.animation = undefined;
          this.nextItem();
        }
      });
  }

  previousItem = () => {
    const currentItem = this.state.item;
    const previousItem = this.state.stories[this.state.index - 1];

    if (previousItem) {
      if (this.animation) {
        this.animation.stop();
        this.animation = undefined;
      }

      this.setState({
        index: this.state.index - 1,
        item: previousItem,
        timerDownAnimation: new Animated.Value(1),
        timerUpAnimation: new Animated.Value(0)
      });
    } else {
      this.animation.reset();

      if (this.state.item.type === 1) this.player.seek(0);

      this.animation.start(data => {
        if (data.finished) {
          this.animation = undefined;
          this.nextItem();
        }
      });
    }
  }

  share = () => {
    const shareLinkContent = {
      contentType: 'link',
      contentUrl: 'https://itunes.apple.com/app/id1246628137',
      contentDescription: `${session.username} recently opened a Catch!`,
    };

    ShareDialog.canShow(shareLinkContent)
      .then(canShow => {
        if (canShow) return ShareDialog.show(shareLinkContent);
      }).then(result => {
        if (result.isCancelled) Alert.alert('Share operation was cancelled.');
        else this.setState({ shared: true });
      }, error => Alert.alert('Share failed with error: ' + error.message));
  }

  toggleComments = () => {
    if (this.state.showComments) {
      this.setState({
        rate: 1.0,
        showComments: false
      });

      if (this.animation)
        this.animation.start(data => {
          if (data.finished) {
            this.animation = undefined;
            this.nextItem();
          }
        });
    } else {
      if (this.animation) {
        console.log('stopping')
        this.animation.stop();
        this.animation.stop();
      };
      this.setState({
        rate: 0.0,
        showComments: true
      });
      console.log('animation', this.animation)
    }
  }

  viewUser = username => {
    this.props.hideModal();
    this.props.navigate('ProfileComponent', {
      tabComponent: this.props.tabComponent,
      username: username
    });
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
        onClosed={this.props.hideModal}
        swipeToClose={true}>
        <StatusBar hidden={true} />

        {
          this.state.loading ?
            <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
              <ActivityIndicator />
              <Text>Loading...</Text>
            </View> : !this.state.item ?
              <View style={styles.empty}>
                <Text style={{ color: 'white' }}>No posts were added to this event</Text>
              </View> :
              <View style={{ flex: 1 }}>
                {
                  this.state.item.type === 1 ?
                    <Video source={{ uri: `${http.s3}/events/${this.props.event.id}/${this.state.item.id}` }}
                      ref={ref => this.player = ref}         // Store reference
                      rate={this.state.rate}                  // 0 is paused, 1 is normal.
                      volume={this.state.rate}                // 0 is muted, 1 is normal.
                      muted={false}                           // Mutes the audio entirely.
                      paused={false}                          // Pauses playback entirely.
                      resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
                      repeat={false}                           // Repeat forever.
                      playInBackground={false}                // Audio continues to play when app entering background.
                      playWhenInactive={true}                 // [iOS] Video continues to play when control or notification center are shown.
                      ignoreSilentSwitch={"obey"}             // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
                      onLoad={this.onLoad}               // Callback when video loads
                      onEnd={this.onEnd}                      // Callback when playback finishes
                      onError={this.videoError}               // Callback when video cannot be loaded
                      onBuffer={this.onBuffer}                // Callback when remote video is buffering
                      onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
                      style={styles.background} /> :
                    <Image
                      onLoad={this.onLoad}
                      source={{ uri: `${http.s3}/events/${this.props.event.id}/${this.state.item.id}` }}
                      style={styles.background} />
                }

                <View style={styles.top}>
                  { // Timer bars:
                    !this.state.done &&
                    <View style={{ flexDirection: 'row' }}>{bars}</View>
                  }

                  <View style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                    <Text
                      onPress={() => this.viewUser(this.state.item.username)}
                      style={styles.poster}>
                      {this.state.item.username !== this.props.event.username && this.state.item.username}
                    </Text>
                    <Text
                      onPress={() => this.viewUser(this.props.event.username)}
                      style={styles.title}>
                      {this.props.event.title}
                    </Text>
                  </View>
                  <Text
                    onPress={() => this.viewUser(this.props.event.username)}
                    style={styles.username}>
                    {this.props.event.username}
                  </Text>
                </View>

                <TouchableHighlight
                  onPress={this.previousItem}
                  style={{
                    bottom: 150,
                    left: 0,
                    position: 'absolute',
                    right: Dimensions.get('window').width / 2,
                    top: 150,
                  }}
                  underlayColor='transparent'>
                  <View />
                </TouchableHighlight>

                <TouchableHighlight
                  onPress={this.nextItem}
                  style={{
                    bottom: 150,
                    left: Dimensions.get('window').width / 2,
                    position: 'absolute',
                    right: 0,
                    top: 150
                  }}
                  underlayColor='transparent'>
                  <View />
                </TouchableHighlight>

                {
                  this.state.showComments &&
                  <TouchableHighlight
                    onPress={Keyboard.dismiss}
                    style={{
                      bottom: 0,
                      left: 0,
                      padding: 20,
                      position: 'absolute',
                      right: 0,
                      top: 100
                    }}
                    underlayColor='transparent'>
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                      <Text
                        onPress={this.toggleComments}
                        style={{ color: 'white', fontWeight: 'bold' }}>
                        Close
                        </Text>
                      <ListView
                        dataSource={this.state.dataSource}
                        enableEmptySections={true}
                        ref={listView => this._listView = listView}
                        removeClippedSubviews={false}
                        renderRow={(rowData, sectionID, rowID) => (
                          <TouchableHighlight
                            onPress={() => this.viewUser(rowData.username)}>
                            <View style={styles.commentView}>
                              <Image
                                source={{ uri: `${http.s3}/users/${rowData.username}` }}
                                style={styles.commentImage} />
                              <View style={{ flex: 1 }}>
                                <Text style={styles.comment}>{rowData.comment}</Text>
                              </View>
                            </View>
                          </TouchableHighlight>
                        )} />

                      <View style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                      }}>
                        <View style={{ flex: 6 }}>
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
                        </View>
                        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                          <Icon
                            color='white'
                            name='clear'
                            onPress={Keyboard.dismiss}
                            size={30}
                            underlayColor='transparent' />
                        </View>
                      </View>

                    </View>
                  </TouchableHighlight>
                }

                { // Comments
                  !this.state.showComments &&
                  <View style={styles.bottom}>
                    <Icon
                      color='white'
                      name='arrow-up'
                      onPress={this.toggleComments}
                      size={30}
                      type='simple-line-icon' />
                    <Text
                      onPress={this.toggleComments}
                      style={styles.username}>
                      comments
                    </Text>
                  </View>
                }

                { // Share to Facebook:
                  this.state.done &&
                  <View style={{
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    bottom: 0,
                    justifyContent: 'center',
                    left: 0,
                    position: 'absolute',
                    right: 0,
                    top: 0
                  }}>
                    <Text style={{
                      color: 'white',
                      fontSize: 16,
                      paddingHorizontal: 50,
                      textAlign: 'center'
                    }}>
                      {this.state.shared ? 'Successfully shared!' :
                        `Know anyone else that would enjoy ${this.props.event.title}?`}
                    </Text>
                    {
                      !this.state.shared &&
                      <TouchableHighlight
                        disabled={this.state.disabled}
                        onPress={this.share}
                        underlayColor='#3b5998'>
                        <View style={styles.share}>
                          <Text style={styles.buttonText}>Share to Facebook  </Text>
                          <Icon
                            color='white'
                            name='ios-redo'
                            type='ionicon'
                          />
                        </View>
                      </TouchableHighlight>
                    }
                  </View>
                }

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
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
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
    bottom: 0,
    backgroundColor: 'rgb(30,30,30)',
    flex: 1,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0
  },
  image: {
    flex: 1,
    height: null,
    paddingHorizontal: 10,
    width: null
  },
  modalTextInput: {
    backgroundColor: 'white',
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 1,
    height: 40,
    marginVertical: 20,
    padding: 10
  },
  poster: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 16,
    textAlign: 'left',
  },
  share: {
    alignItems: 'center',
    backgroundColor: '#3b5998',
    borderRadius: 5,
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    marginTop: 50,
    width: 300
  },
  top: {
    flex: 1,
    padding: 5,
    marginTop: 20
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 20,
    textAlign: 'right',
  },
  username: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 16,
    textAlign: 'right',
  }
});