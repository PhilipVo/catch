const moment = require('moment');
import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ListView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modalbox';

import FeedPastComponent from './feed-past.component';
import FeedUpcomingComponent from './feed-upcoming.component';
import TabComponent from './tab.component';

import http from '../services/http.service';

import styles from '../styles/styles';

import chat from '../samples/chat';
import story from '../samples/story';

export default class FeedPastModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
      item: story[0]
    };
  }

  componentDidMount() {
    this.setItem();
  }

  componentWillUpdate() {
    this.setItem();
  }

  setItem = () => {
    const nextItem = story[this.state.index];
    if (nextItem) {
      setTimeout(() => {
      this.setState({
        index: this.state.index + 1,
        item: nextItem
      });
      }, this.state.item.duration); 
    }
    else
      setTimeout(this.props.hideModal, this.state.item.duration); 
  }

  render() {
    return (
      <Modal
        isOpen={true}
        onClosed={this.props.hideModal}
        swipeToClose={true}>
        <KeyboardAvoidingView
          behavior={'padding'}
          style={{ flex: 1 }}>
          <Image source={{ uri: this.state.item.uri }} style={{
            flex: 1,
            width: null,
            height: null,
          }}>
          <View style={{alignSelf: 'center', flex: 1}}>
            <Text style={{backgroundColor: 'transparent', color: 'white'}}>{this.props.selected.event}</Text>
            </View>
          <View style={{alignSelf: 'center', flex: 1, justifyContent: 'flex-end'}}>
            <Text style={{backgroundColor: 'transparent'}}>comments</Text>
            </View>
          </Image>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
}