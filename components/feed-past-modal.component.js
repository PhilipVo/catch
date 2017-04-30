const moment = require('moment');
import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ListView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  PanResponder,
  StyleSheet,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modalbox';
import TimerMixin from 'react-timer-mixin';

import FeedPastComponent from './feed-past.component';
import FeedUpcomingComponent from './feed-upcoming.component';
import TabComponent from './tab.component';

import http from '../services/http.service';

import chat from '../samples/chat';
import story from '../samples/story';

export default class FeedPastModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
      item: story[0],
      timerDownAnimation: new Animated.Value(1),
      timerUpAnimation: new Animated.Value(0)
    };
  }

  componentDidMount() {
    this.setItem();
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        console.log('pan released')
        this.props.hideModal();
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        console.log('pan terminated')
        this.props.hideModal();
      }
    });
  }

  componentDidUpdate() {
    this.setItem();
  }

  renderTimerBar = () => {
    let TimerBar = [];
    for (let i = 0; i < story.length; i++) {
      TimerBar.push(
        <View
          key={i}
          ref='bar'
          style={{
            flex: 1,
            borderRadius: 5,
            height: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            marginHorizontal: 1,
          }}>
          {
            i === this.state.index - 1 ?
              <View style={{
                flex: 1,
                borderRadius: 5,
                flexDirection: 'row'
              }}>
                <Animated.View style={{
                  backgroundColor: 'white',
                  borderRadius: 5,
                  flex: this.state.timerUpAnimation
                }} />
                <Animated.View style={{
                  flex: this.state.timerDownAnimation
                }} />
              </View> : null
          }
        </View>
      );
    }

    return TimerBar;
  }

  setItem = () => {
    const currentItem = this.state.item;
    const nextItem = story[this.state.index];

    Animated.parallel([
      Animated.timing(this.state.timerDownAnimation, {
        toValue: 0,
        duration: currentItem.duration
      }),
      Animated.timing(this.state.timerUpAnimation, {
        toValue: 1,
        duration: currentItem.duration
      })
    ]).start();

    if (nextItem) {
      this.interval = TimerMixin.setTimeout(() => {
        this.setState({
          index: this.state.index + 1,
          item: nextItem,
          timerDownAnimation: new Animated.Value(1),
          timerUpAnimation: new Animated.Value(0)
        });
      }, currentItem.duration);
    }
    else
      this.interval = TimerMixin.setTimeout(this.props.hideModal, currentItem.duration);
  }

  render() {
    return (
      <Modal
        isOpen={true}
        onClosed={() => {
          TimerMixin.clearInterval(this.interval);
          this.props.hideModal();
        }}
        swipeToClose={true}>
        <KeyboardAvoidingView
          behavior={'padding'}
          style={{ flex: 1 }}>
          <Image source={{ uri: this.state.item.uri }} style={{
            flex: 1,
            paddingHorizontal: 10,
            width: null,
            height: null,
          }}>
            <View style={{ paddingTop: 20, flex: 1 }}>
              <View style={{ flexDirection: 'row' }}>
                {this.renderTimerBar()}
              </View>

              <Text style={{
                backgroundColor: 'transparent',
                color: 'white',
                fontSize: 20,
                textAlign: 'right',
                textShadowColor: 'black',
                textShadowOffset: { width: 0.5, height: 0.5 }
              }}>
                {this.props.selected.event}
              </Text>
            </View>
            <View style={{ alignSelf: 'center', flex: 1, justifyContent: 'flex-end' }}>
              <Text style={{ backgroundColor: 'transparent' }}>comments</Text>
            </View>
          </Image>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
}

const styless = StyleSheet.create({
});