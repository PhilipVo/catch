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

  render() {
    return (
      <View style={styles.avoidTop}>
        <View style={{ flex: 11 }}>
          <UserComponent style={{ flex: 2 }} />
          <View style={styles.profileNavigator}>
            <Icon
              color={this.state.component === 'ListComponent' ? 'black' : '#5e6977'}
              name='photo-camera'
              onPress={() => this.setState({ component: 'ListComponent' })}
              size={33}
              underlayColor='transparent' />
            <Icon
              color={this.state.component === 'UpcomingComponent' ? 'black' : '#5e6977'}
              name='card-giftcard'
              onPress={() => this.setState({ component: 'UpcomingComponent' })}
              size={33}
              underlayColor='transparent' />
            <Icon
              color={this.state.component === 'NotificationComponent' ? 'black' : '#5e6977'}
              name='mail-outline'
              onPress={() => this.setState({ component: 'NotificationComponent' })}
              size={33}
              underlayColor='transparent' />
          </View>
          {this.renderComponent()}
        </View>
        <TabComponent navigator={this.props.navigator} tab={'profile'} />
      </View>
    );
  }
}