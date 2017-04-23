import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

import ListComponent from './list.component';
import NotificationComponent from './notification.component';
import TabComponent from './tab.component';
import UpcomingComponent from './upcoming.component';
import UserComponent from './user.component';

import styles from '../styles/styles';

export default class ProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { component: 'ListComponent' };
  }

  componentDidMount() {
    console.log('mounted profile');
  }

  renderComponent = () => {
    let component;
    switch (this.state.component) {
      case 'ListComponent':
        component = <ListComponent />
        break;
      case 'UpcomingComponent':
        component = <UpcomingComponent />
        break;
      case 'NotificationComponent':
        component = <NotificationComponent />
        break;
      default:
        component = <ListComponent />
        break;
    }

    return (
      <View style={{ flex: 10 }}>{component}</View>
    );
  }

  shouldDisplay(component) {
    if (this.state.component === component)
      return null;
    return { display: 'none' };
  }

  render() {
    return (
      <View style={styles.avoidTop}>
        <View style={{ flex: 11 }}>
          <UserComponent navigator={this.props.navigator} style={{ flex: 2 }} />
          <View style={styles.profileNavigator}>
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
        <TabComponent navigator={this.props.navigator} tab={'profile'} />
      </View>
    );
  }
}