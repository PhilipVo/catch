import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

import ProfileListNotificationComponent from './profile-list-notification.component';
import ProfileListPastComponent from './profile-list-past.component';
import ProfileListUpcomingComponent from './profile-list-upcoming.component';

import styles from '../styles/styles';

export default class ProfileListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { tab: 'past' };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>

        {/* Tab bar */}
        <View style={styles.profileListTab}>
          <Icon
            color={this.state.tab === 'past' ? 'black' : 'gray'}
            name='photo-camera'
            onPress={() => this.setState({ tab: 'past' })}
            size={33}
            underlayColor='transparent' />
          <Icon
            color={this.state.tab === 'upcoming' ? 'black' : 'gray'}
            name='card-giftcard'
            onPress={() => this.setState({ tab: 'upcoming' })}
            size={33}
            underlayColor='transparent' />
          <Icon
            color={this.state.tab === 'notification' ? 'black' : 'gray'}
            name='mail-outline'
            onPress={() => this.setState({ tab: 'notification' })}
            size={33}
            underlayColor='transparent' />
        </View>

        {/* Tabs */}
        <View style={{ flex: 10 }}>
          <ProfileListPastComponent
            style={this.state.tab === 'past'
              ? null : { display: 'none' }} />
          <ProfileListUpcomingComponent
            style={this.state.tab === 'upcoming'
              ? null : { display: 'none' }} />
          <ProfileListNotificationComponent
            style={this.state.tab === 'notification'
              ? null : { display: 'none' }} />
        </View>

      </View>
    );
  }
}