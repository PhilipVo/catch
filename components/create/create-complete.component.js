const moment = require('moment');
import React, { Component } from 'react';
import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import { h3, Icon, Text } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

import http from '../../services/http.service';
import session from '../../services/session.service';
import socket from '../../services/socket.service';

export default class CreateCompleteComponent extends Component {
  componentDidMount() {
    const { event } = this.props.navigation.state.params;
    if (event.id && event.username !== session.username)
      socket.emit('contributed', {
        contributor: session.username,
        creator: event.username,
        title: event.title
      });
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={{ marginTop: 20 }}>
        <StatusBar hidden={false} />
        <Icon
          color='black'
          name='clear'
          onPress={() => {
            const resetAction = NavigationActions.reset({
              actions: [NavigationActions.navigate({ routeName: 'CreateCameraComponent' })],
              index: 0
            });
            this.props.navigation.dispatch(resetAction);
          }}
          size={33}
          style={{ alignSelf: 'flex-start' }} />
        <Text h3 style={{ textAlign: 'center' }}>Congratulations!</Text>
        <Image
          source={{ uri: params.event.cover ? `${params.event.cover}` : `${http.s3}/events/${params.event.id}/cover` }}
          style={{ height: 120 }} />

        {/* Timer */}
        <View style={styles.timerView}>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.timerText}>
              {moment(params.event.date).diff(Date.now(), 'days')}
            </Text>
            <Text style={styles.timerText}>Days</Text>
          </View>
          <Text style={styles.timerText}>:</Text>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.timerText}>
              {moment(params.event.date).diff(Date.now(), 'hours') % 24}
            </Text>
            <Text style={styles.timerText}>Hrs</Text>
          </View>
          <Text style={styles.timerText}>:</Text>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.timerText}>
              {moment(params.event.date).diff(Date.now(), 'minutes') % 60}
            </Text>
            <Text style={styles.timerText}>Mins</Text>
          </View>
        </View>

        {
          params.isNew ?
            <Text style={styles.text}>
              until you can view the event.{'\n\n'}
              Others may request to add content or view your event.{'\n\n'}
              Check your profile to approve/deny them!
            </Text> :
            <Text style={styles.text}>
              until you can view the event.{'\n\n'}
              Black Widow and Ironman also added to this event.{'\n\n'}
              When the countdown is complete, you will be able to view {params.event.title}
            </Text>
        }

      </View >
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    padding: 30,
    textAlign: 'center'
  },
  timerText: {
    color: 'red',
    fontSize: 30
  },
  timerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50
  }
});