////////////////////////////////////////////////////////////
//                ProfileComponent
//  User's profile component which includes their details
//  and their list of catches. 
//  
//                Required params
//  tabBar: instance of TabBarComponent
//  username: 'username'
////////////////////////////////////////////////////////////

import React, { Component } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationActions, TabNavigator } from 'react-navigation';

import PastListComponent from '../common/past-list.component';
import PastModalComponent from './past-modal.component';
import ProfileDetailsComponent from './profile-details.component';
import UpcomingListComponent from '../common/upcoming-list.component';
import UpcomingModalComponent from '../common/upcoming-modal.component';

import http from '../../services/http.service';

import users from '../../samples/users';

export default class ProfileComponent extends Component {
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
    const { params } = this.props.navigation.state;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={false} />
        <View style={styles.view}>
          <View style={{ flex: 11 }}>

            <ProfileDetailsComponent
              goBack={this.props.navigation.goBack}
              user={users[params.username]} />

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
                onPress={() => this.setState({ tab: 'UpcomingListComponent' })}
                size={33}
                underlayColor='transparent' />
            </View>

            {/* List navigator */}
            <View style={{ flex: 10 }}>
              <Navigator
                ref={navigator => this.navigator = navigator}
                screenProps={{
                  loading: this.state.loading,
                  past: this.state.past,
                  setSelected: this.setSelected,
                  upcoming: this.state.upcoming
                }} />
            </View>

          </View>
          {params.tabBar}
        </View>

        { // Modals
          this.state.modal === 'past' ?
            <PastModalComponent
              hideModal={() => this.setState({
                modal: null,
                selected: null
              })}
              navigate={this.props.navigation.navigate}
              selected={this.state.selected}
              tabBar={params.tabBar} /> :
            this.state.modal === 'upcoming' ?
              <UpcomingModalComponent
                hideModal={() => this.setState({
                  modal: null,
                  selected: null
                })}
                navigate={this.props.navigation.navigate}
                selected={this.state.selected}
                tabBar={params.tabBar} /> :
              null
        }

      </View>
    );
  }
}

const Navigator = TabNavigator(
  {
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