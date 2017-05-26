import React, { Component } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationActions, TabNavigator } from 'react-navigation';

import AccountDetailsComponent from './account-details.component';
import AccountNotificationListComponent from './account-notification-list.component';
import PastListComponent from '../common/past-list.component';
import PastModalComponent from '../common/past-modal.component';
import TabComponent from '../common/tab.component';
import UpcomingListComponent from '../common/upcoming-list.component';
import UpcomingModalComponent from '../common/upcoming-modal.component';

import http from '../../services/http.service';

export default class AccountComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      modal: null,
      past: [],
      selected: null,
      tab: 'PastListComponent',
      upcoming: []
    };
  }

  componentDidMount() {
    this.getEvents();
  }

  getEvents = () => {
    http.get('/api/events/get-public-upcoming-events')
      .then(events => {
        this.setState({
          loading: false,
          past: events,
          upcoming: events
        });
      })
      .catch(error => { console.log(error) });
  }

  navigate = tab => {
    this.navigator.dispatch(NavigationActions.navigate({ routeName: tab }));
    this.setState({ tab: tab });
  }

  setSelected = (modal, selected) => {
    this.setState({
      modal: modal,
      selected: selected
    });
  }

  render() {
    const tabBar = (
      <TabComponent
        navigate={this.props.screenProps.navigate}
        tab='account' />
    );

    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={false} />
        <View style={styles.view}>
          <View style={{ flex: 11 }}>

            <AccountDetailsComponent navigate={this.props.navigation.navigate} />

            {/* Top tab bar */}
            <View style={styles.tabBar}>
              <Icon
                color={this.state.tab === 'PastListComponent' ? 'black' : 'gray'}
                name='photo-camera'
                onPress={() => this.navigate('PastListComponent')}
                size={33}
                underlayColor='transparent' />
              <Icon
                color={this.state.tab === 'UpcomingListComponent' ? 'black' : 'gray'}
                name='card-giftcard'
                onPress={() => this.navigate('UpcomingListComponent')}
                size={33}
                underlayColor='transparent' />
              <Icon
                color={this.state.tab === 'AccountNotificationListComponent' ? 'black' : 'gray'}
                name='mail-outline'
                onPress={() => this.navigate('AccountNotificationListComponent')}
                size={33}
                underlayColor='transparent' />
            </View>

            {/* List navigator */}
            <View style={{ flex: 10 }}>
              <Navigator
                onNavigationStateChange={(a, b, c) => console.log('changed', a, b, c)}
                ref={navigator => this.navigator = navigator}
                screenProps={{
                  loading: this.state.loading,
                  past: this.state.past,
                  setSelected: this.setSelected,
                  upcoming: this.state.upcoming
                }} />
            </View>

          </View>
          {tabBar}
        </View>

        { // Modals
          this.state.modal === 'upcoming' ?
            <UpcomingModalComponent
              hideModal={() => this.setState({
                modal: null,
                selected: null
              })}
              navigate={this.props.navigation.navigate}
              selected={this.state.selected}
              tabBar={tabBar} /> :
            this.state.modal === 'past' ?
              <PastModalComponent
                hideModal={() => this.setState({
                  modal: null,
                  selected: null
                })}
                navigate={this.props.navigation.navigate}
                selected={this.state.selected}
                tabBar={tabBar} /> :
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
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    borderTopColor: 'gray',
    borderTopWidth: 0.5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  view: {
    flex: 1,
    paddingTop: 20
  }
});