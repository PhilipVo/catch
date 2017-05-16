const moment = require('moment');
import React, { Component } from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import { h3, Icon, Text } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

export default class CreateCompleteComponent extends Component {
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
        <Image source={{ uri: params.event.cover }} style={{ height: 120 }} />

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

        <Text style={styles.text}>
          until you can view the event.{'\n\n'}
          Black Widow and Ironman also added to this event.{'\n\n'}
          When the countdown is complete, you will be able to view {params.event.event}
        </Text>
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