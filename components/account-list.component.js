import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';

import AccountListNotificationComponent from './account-list-notification.component';
import AccountListPastComponent from './account-list-past.component';
import AccountListUpcomingComponent from './account-list-upcoming.component';

export default class AccountListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { tab: 'past' };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>

        {/* Tab bar */}
        <View style={styles.view}>
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
          <AccountListPastComponent
            style={this.state.tab === 'past'
              ? null : { display: 'none' }} />
          <AccountListUpcomingComponent
            style={this.state.tab === 'upcoming'
              ? null : { display: 'none' }} />
          <AccountListNotificationComponent
            style={this.state.tab === 'notification'
              ? null : { display: 'none' }} />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    borderTopColor: 'gray',
    borderTopWidth: 0.5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});