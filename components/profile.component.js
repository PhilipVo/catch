import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

import AvailableComponent from './available.component';
import NotificationComponent from './notification.component';
import TabBarComponent from './tab-bar.component';
import UpcomingComponent from './upcoming.component';
import UserComponent from './user.component';

import styles from '../styles/styles';

export default class ProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { component: 'AvailableComponent' };
  }

  componentDidMount() {
    console.log('mounted profile');
  }

  renderComponent = () => {
    let component;
    switch (this.state.component) {
      case 'AvailableComponent':
        component = <AvailableComponent />
        break;
      case 'UpcomingComponent':
        component = <UpcomingComponent />
        break;
      case 'NotificationComponent':
        component = <NotificationComponent />
        break;
      default:
        component = <AvailableComponent />
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
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', borderTopColor: 'gray', borderTopWidth: 0.5, borderBottomColor: 'gray', borderBottomWidth: 0.5 }}>
            <Icon
              name={'photo-camera'}
              size={33} />
            <Icon
              name={'card-giftcard'}
              size={33} />
            <Icon
              name={'mail-outline'}
              size={33} />
          </View>
          {this.renderComponent()}
        </View>
        <TabBarComponent navigator={this.props.navigator} tab={'profile'} />
      </View>
    );
  }
}