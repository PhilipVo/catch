import React, { Component } from 'react';
import { Image, StyleSheet, TouchableHighlight, View } from 'react-native';
import { h4, Icon, Text } from 'react-native-elements';
import { NavigationActions, TabNavigator } from 'react-navigation';

import AccountContactsComponent from './account-contacts.component';
import AccountSearchComponent from './account-search.component';

import http from '../../services/http.service';
import session from '../../services/session.service';

export default class AccountFriendsComponent extends Component {
  constructor(props) {
    super(props);

    this.tabComponent = <TabComponent
      navigate={this.props.screenProps.navigate}
      reset={this.props.screenProps.reset}
      tab='account' />
  }

  navigate = tab => {
    this.navigator.dispatch(NavigationActions.navigate({ routeName: tab }));
    this.setState({ tab: tab });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 11 }}>

          {/* Top tab bar */}
          <View style={styles.tabBar}>
            <TouchableHighlight
              onPress={() => this.navigate('AccountContactsComponent')}
              style={this.state.tab === 'AccountContactsComponent' ?
                styles.activeTab : { flex: 1 }}
              underlayColor='transparent'>
              <Text style={this.state.tab === 'AccountContactsComponent' ?
                styles.activeTabText : { textAlign: 'center' }}>Your contacts</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => this.navigate('AccountSearchComponent')}
              style={this.state.tab === 'AccountSearchComponent' ?
                styles.activeTab : { flex: 1 }}
              underlayColor='transparent'>
              <Text style={this.state.tab === 'AccountSearchComponent' ?
                styles.activeTabText : { textAlign: 'center' }}>Search users</Text>
            </TouchableHighlight>
          </View>

          {/* List navigator */}
          <View style={{ flex: 10 }}>
            <Navigator
              ref={navigator => this.navigator = navigator} />
          </View>

        </View>
        {this.tabComponent}
      </View>
    );
  }
}

const Navigator = TabNavigator(
  {
    AccountContactsComponent: { screen: AccountContactsComponent },
    AccountSearchComponent: { screen: AccountSearchComponent }
  },
  {
    headerMode: 'none',
    initialRouteName: 'AccountContactsComponent',
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
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 1
  }
});