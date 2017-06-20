import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationActions, TabNavigator } from 'react-navigation';
import PushNotification from 'react-native-push-notification';

import AccountDetailsComponent from './account-details.component';
import AccountNotificationListComponent from './account-notification-list.component';
import PastListComponent from '../common/past-list.component';
import PastModalComponent from '../common/past-modal.component';
import TabComponent from '../common/tab.component';
import UpcomingListComponent from '../common/upcoming-list.component';
import UpcomingModalComponent from '../common/upcoming-modal.component';

import http from '../../services/http.service';
import session from '../../services/session.service';
import socket from '../../services/socket.service';

export default class AccountComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      event: null,
      loading: true,
      modal: null,
      notifications: [],
      past: [],
      tab: 'PastListComponent',
      upcoming: [],
      user: {},
    };

    // Tab component:    
    this.tabComponent = <TabComponent navigate={this.props.screenProps.navigate} tab='account' />

    // Socket events:
    this.onCommented = socket.onCommented.subscribe(data => {
      this.getEvents();
      PushNotification.localNotificationSchedule({
        date: new Date,
        message: `${data.commenter} commented on ${data.title}`,
        number: 1
      });
    });

    this.onContacted = socket.onContacted.subscribe(data => {
      console.log(`${data.username} added ${data.contact}`)
      this.getEvents();
      PushNotification.localNotificationSchedule({
        date: new Date,
        message: `${data.username} added you as a contact`,
        number: 1
      });
    });

    this.onContributed = socket.onContributed.subscribe(data => {
      this.getEvents();
      PushNotification.localNotificationSchedule({
        date: new Date,
        message: `${data.contributor} added to ${data.title}`,
        number: 1
      });
    });

    this.onEvent = socket.onEvent.subscribe(() => this.getEvents());
  }

  componentDidMount() {
    this.getEvents();
  }

  componentWillUnmount() {
    this.onCommented.unsubscribe();
    this.onContacted.unsubscribe();
    this.onContributed.unsubscribe();
    this.onEvent.unsubscribe();
  }

  getEvents = () => {
    http.get('/api/users/get-my-info')
      .then(data => {
        this.setState({
          loading: false,
          notifications: data.notifications,
          past: data.past,
          upcoming: data.upcoming,
          user: data.user
        });
      }).catch(() => { });
  }

  hideModal = () => {
    this.setState({
      event: null,
      modal: null
    });
  }

  navigate = tab => {
    this.navigator.dispatch(NavigationActions.navigate({ routeName: tab }));
    this.setState({ tab: tab });
  }

  setEvent = (modal, event) => {
    this.setState({
      event: event,
      modal: modal
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.view}>
          <View style={{ flex: 11 }}>

            <AccountDetailsComponent
              events={this.state.past.length + this.state.upcoming.length}
              navigate={this.props.navigation.navigate}
              user={this.state.user} />

            {/* Top tab bar */}
            <View style={styles.tabBar}>
              <Icon
                color={this.state.tab === 'PastListComponent' ? 'black' : 'gray'}
                name='camrecorder'
                onPress={() => this.navigate('PastListComponent')}
                size={30}
                type='simple-line-icon'
                underlayColor='transparent' />
              <Icon
                color={this.state.tab === 'UpcomingListComponent' ? 'black' : 'gray'}
                name='present'
                onPress={() => this.navigate('UpcomingListComponent')}
                size={30}
                type='simple-line-icon'
                underlayColor='transparent' />
              <Icon
                color={this.state.tab === 'AccountNotificationListComponent' ? 'black' : 'gray'}
                name='envelope'
                onPress={() => this.navigate('AccountNotificationListComponent')}
                size={30}
                type='simple-line-icon'
                underlayColor='transparent' />
            </View>

            {/* List navigator */}
            <View style={{ flex: 10 }}>
              <Navigator
                ref={navigator => this.navigator = navigator}
                screenProps={{
                  forceUpdate: this.forceUpdate,
                  loading: this.state.loading,
                  notifications: this.state.notifications,
                  past: this.state.past,
                  setEvent: this.setEvent,
                  upcoming: this.state.upcoming
                }} />
            </View>

          </View>
          {this.tabComponent}
        </View>

        { // Modals
          this.state.modal === 'upcoming' ?
            <UpcomingModalComponent
              event={this.state.event}
              hideModal={this.hideModal}
              navigate={this.props.navigation.navigate}
              tabComponent={this.tabComponent} /> :
            this.state.modal === 'past' ?
              <PastModalComponent
                event={this.state.event}
                hideModal={this.hideModal}
                navigate={this.props.navigation.navigate}
                tabComponent={this.tabComponent} /> :
              null
        }

      </View>
    );
  }
}

const Navigator = TabNavigator(
  {
    AccountNotificationListComponent: { screen: AccountNotificationListComponent },
    PastListComponent: { screen: PastListComponent },
    UpcomingListComponent: { screen: UpcomingListComponent }
  },
  {
    headerMode: 'none',
    initialRouteName: 'PastListComponent',
    navigationOptions: { tabBarVisible: false }
  }
);

const styles = StyleSheet.create({
  tabBar: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderTopColor: 'black',
    borderTopWidth: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  view: {
    flex: 1,
    paddingTop: 20
  }
});