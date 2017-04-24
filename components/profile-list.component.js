import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

import ListComponent from './list.component';
import NotificationComponent from './notification.component';
import UpcomingComponent from './upcoming.component';

import styles from '../styles/styles';

export default class ProfileListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { component: 'ListComponent' };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.profileListTab}>
          <Icon
            color={this.state.component === 'ListComponent' ? 'black' : 'gray'}
            name='photo-camera'
            onPress={() => this.setState({ component: 'ListComponent' })}
            size={33}
            underlayColor='transparent' />
          <Icon
            color={this.state.component === 'UpcomingComponent' ? 'black' : 'gray'}
            name='card-giftcard'
            onPress={() => this.setState({ component: 'UpcomingComponent' })}
            size={33}
            underlayColor='transparent' />
          <Icon
            color={this.state.component === 'NotificationComponent' ? 'black' : 'gray'}
            name='mail-outline'
            onPress={() => this.setState({ component: 'NotificationComponent' })}
            size={33}
            underlayColor='transparent' />
        </View>
        <View style={{ flex: 10 }}>
          <ListComponent
            style={this.state.component === 'ListComponent'
              ? null : { display: 'none' }} />
          <UpcomingComponent
            style={this.state.component === 'UpcomingComponent'
              ? null : { display: 'none' }} />
          <NotificationComponent
            style={this.state.component === 'NotificaionComponent'
              ? null : { display: 'none' }} />
        </View>
      </View>
    );
  }
}