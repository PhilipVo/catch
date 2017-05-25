const moment = require('moment');
import React, { Component } from 'react';
import {
  Image,
  StatusBar,
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

import http from '../../services/http.service';

export default class FeedComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: null,
      selected: null,
      tab: 'FeedUpcomingListComponent',
    };

    this.tabBar = (
      <TabComponent
        navigate={this.props.screenProps.navigate}
        tab='feed' />
    );
  }

  navigate = tab => {
    this.navigator.dispatch(NavigationActions.navigate({ routeName: tab }));
    this.setState({ tab: tab });
  }

  setSelected = (modal, selected) => {
    console.log('setselected', modal)
    this.setState({
      modal: modal,
      selected: selected
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={false} />
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
              onNavigationStateChange={(prevState, newState) => {
                console.log('state changed', newState)
              }}
              ref={navigator => this.navigator = navigator} />

          </View>

          {this.tabBar}
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
              tabBar={this.tabBar} /> :
            this.state.modal === 'upcoming' ?
              <UpcomingModalComponent
                hideModal={() => this.setState({
                  modal: null,
                  selected: null
                })}
                navigate={this.props.navigation.navigate}
                selected={this.state.selected}
                tabBar={this.tabBar} /> :
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
  });

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
    fontSize: 16,
    paddingBottom: 10,
    textAlign: 'center'
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 1
  }
});