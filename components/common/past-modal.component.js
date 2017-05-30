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
  ActivityIndicator,
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
      item: null,
      loading: true,
      story: []
    };
  }

  componentDidMount() {
    http.get(`/api/stories/get-stories-for-event/${this.props.event.id}`)
      .then(story => {
        console.log('story', story)
        if (story.length > 0)
          this.setState({
            item: story[0],
            loading: false,
            story: story
          });
        else this.setState({ loading: false });
      })
      .catch(() => { })
  }

  componentDidUpdate() {
    this.setItem();
  }

  setItem = () => {
    const currentItem = this.state.item;
    const nextItem = this.state.story[this.state.index + 1];

    if (nextItem) {
      this.interval = TimerMixin.setTimeout(() => {
        this.setState({
          index: this.state.index + 1,
          item: nextItem,
        });
      }, 4000);
    }
    else
      this.interval = TimerMixin.setTimeout(this.props.hideModal, 4000);
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

        {
          this.state.loading ?
            <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
              <ActivityIndicator />
              <Text>Loading...</Text>
            </View> :
            this.state.story.length > 0 ?
              <Image
                source={{ uri: `${http.s3}/events/${this.props.event.id}/${this.state.item.id}` }}
                style={styles.image}>
                <View style={styles.top}>
                  <PastModalTimerComponent
                    index={this.state.index}
                    length={this.state.story.length}
                    duration={4000} />

                  <Text style={styles.text}>
                    {this.props.event.title}
                  </Text>
                </View>
                <View style={styles.bottom}>
                  <Text style={{ backgroundColor: 'transparent' }}>comments</Text>
                </View>
              </Image> :
              <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                <Text>No posts were added to this event</Text>
              </View>
        }

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