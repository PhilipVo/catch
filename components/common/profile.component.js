////////////////////////////////////////////////////////////
//                ProfileComponent
//  User's profile component which includes their details
//  and their list of catches. 
//  
//                Required params
//  data (object): contains a user's information
//  tabComponent (component): instance of TabBarComponent
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

export default class ProfileComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      event: null,
      loading: true,
      modal: null,
      past: [],
      tab: 'PastListComponent',
      upcoming: [],
      user: {}
    };
  }

  hideModal = () => this.setState({
    event: null,
    modal: null
  })

  navigate = tab => {
    this.navigator.dispatch(NavigationActions.navigate({ routeName: tab }));
    this.setState({ tab: tab });
  }

  setEvent = (modal, event) => {
    this.setState({
      modal: modal,
      event: event
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
              events={params.data.past.length + params.data.upcoming.length}
              goBack={this.props.navigation.goBack}
              user={params.data.user} />

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
            </View>

            {/* List navigator */}
            <View style={{ flex: 10 }}>
              <Navigator
                ref={navigator => this.navigator = navigator}
                screenProps={{
                  loading: false,
                  past: params.data.past,
                  setEvent: this.setEvent,
                  upcoming: params.data.upcoming
                }} />
            </View>

          </View>
          {params.tabComponent}
        </View>

        { // Modals
          this.state.modal === 'past' ?
            <PastModalComponent
              event={this.state.event}
              hideModal={this.hideModal}
              navigate={this.props.navigation.navigate}
              tabComponent={params.tabComponent} /> :
            this.state.modal === 'upcoming' ?
              <UpcomingModalComponent
                event={this.state.event}
                hideModal={this.hideModal}
                navigate={this.props.navigation.navigate}
                tabComponent={params.tabComponent} /> :
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