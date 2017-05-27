////////////////////////////////////////////////////////////
//                PastModalComponent
// Modal that shows the story of an event. Appears when a
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
  Image,
  ListView,
  Text,
  TextInput,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import Modal from 'react-native-modalbox';
import TimerMixin from 'react-timer-mixin';

import PastModalTimerComponent from './past-modal-timer.component.js';

import http from '../../services/http.service';

export default class PastModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      item: story[0],
      loading: true
    };
  }

  componentDidMount() {

    http.get(`/api/stories/get-story/${this.props.event.id}`)
    this.setItem();
  }

  componentDidUpdate() {
    this.setItem();
  }

  setItem = () => {
    const currentItem = this.state.item;
    const nextItem = story[this.state.index + 1];

    if (nextItem) {
      this.interval = TimerMixin.setTimeout(() => {
        this.setState({
          index: this.state.index + 1,
          item: nextItem,
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
        <StatusBar hidden={true} />
        <Image source={{ uri: this.state.item.uri }} style={styles.image}>
          <View style={styles.top}>
            <PastModalTimerComponent
              index={this.state.index}
              length={story.length}
              duration={this.state.item.duration} />

            <Text style={styles.text}>
              {this.props.event.event}
            </Text>
          </View>
          <View style={styles.bottom}>
            <Text style={{ backgroundColor: 'transparent' }}>comments</Text>
          </View>
        </Image>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  bottom: {
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'flex-end'
  },
  image: {
    flex: 1,
    height: null,
    paddingHorizontal: 10,
    width: null
  },
  top: {
    flex: 1,
    paddingTop: 20
  },
  text: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 20,
    textAlign: 'right',
    textShadowColor: 'black',
    textShadowOffset: { width: 0.5, height: 0.5 }
  }
});