const moment = require('moment');
import React, { Component } from 'react';
import {
  PushNotificationIOS,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationActions, TabNavigator } from 'react-navigation';

import FeedUpcomingListComponent from './feed-upcoming-list.component';
import PastListComponent from '../common/past-list.component';
import PastModalComponent from '../common/past-modal.component';
import TabComponent from '../common/tab.component';
import UpcomingModalComponent from '../common/upcoming-modal.component';

import socket from '../../services/socket.service';

import http from '../../services/http.service';

export default class FeedComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      event: null,
      loading: true,
      modal: null,
      past: [],
      tab: 'FeedUpcomingListComponent',
      upcoming: [],
    };

    // Tab component:
    this.tabComponent = <TabComponent
      navigate={this.props.screenProps.navigate}
      reset={this.props.screenProps.reset}
      tab='feed' />

    // Socket events:
    // this.onEvent = socket.onEvent.subscribe(() => this.getEvents());
    // PushNotificationIOS.addEventListener('notification', () => console.log('in feed'))
  }

  componentDidMount() {
    this.getEvents();
  }

  componentWillUnmount() {
    // this.onEvent.unsubscribe();
    // PushNotificationIOS.removeEventListener('notification', this.getMyInfo);
  }

  getEvents = () => {
    http.get('/api/events/get-public-events')
      .then(events => {
        this.setState({
          loading: false,
          past: events.past,
          upcoming: events.upcoming
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
        <View style={styles.avoidTop}>
          <View style={{ flex: 11 }}>

            <Text style={styles.header}>Catch</Text>

            {/* Top tab bar */}
            <View style={styles.tabBar}>
              <TouchableHighlight
                onPress={() => this.navigate('FeedUpcomingListComponent')}
                style={this.state.tab === 'FeedUpcomingListComponent' ?
                  styles.activeTab : { flex: 1 }}
                underlayColor='transparent'>
                <Text style={this.state.tab === 'FeedUpcomingListComponent' ?
                  styles.activeTabText : { textAlign: 'center' }}>Upcoming</Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => this.navigate('PastListComponent')}
                style={this.state.tab === 'PastListComponent' ?
                  styles.activeTab : { flex: 1 }}
                underlayColor='transparent'>
                <Text style={this.state.tab === 'PastListComponent' ?
                  styles.activeTabText : { textAlign: 'center' }}>Past</Text>
              </TouchableHighlight>
            </View>

            <Navigator
              ref={navigator => this.navigator = navigator}
              screenProps={{
                loading: this.state.loading,
                past: this.state.past,
                setEvent: this.setEvent,
                upcoming: this.state.upcoming
              }} />

          </View>
          {this.tabComponent}
        </View>

        { // Modals
          this.state.modal === 'past' ?
            <PastModalComponent
              event={this.state.event}
              hideModal={this.hideModal}
              navigate={this.props.navigation.navigate}
              tabComponent={this.tabComponent} /> :
            this.state.modal === 'upcoming' ?
              <UpcomingModalComponent
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
    FeedUpcomingListComponent: { screen: FeedUpcomingListComponent },
    PastListComponent: { screen: PastListComponent }
  },
  {
    headerMode: 'none',
    initialRouteName: 'FeedUpcomingListComponent',
    navigationOptions: { tabBarVisible: false }
  }
);

const styles = StyleSheet.create({
  activeTab: {
    borderBottomColor: 'red',
    borderBottomWidth: 1,
    flex: 1
  },
  activeTabText: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  avoidTop: {
    flex: 1,
    paddingTop: 20
  },
  header: {
    fontFamily: 'Palatino',
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 5,
    textAlign: 'center'
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 1
  }
});