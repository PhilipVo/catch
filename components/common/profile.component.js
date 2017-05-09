import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Display from 'react-native-display';

import ProfileListComponent from './profile-list.component';
import ProfileDetailsComponent from './profile-details.component';
// import TabComponent from '../common/tab.component';

export default class ProfileComponent extends Component {
  render() {
    return (
      <View style={styles.view}>
        <View style={{ flex: 11 }}>
          <ProfileDetailsComponent navigator={this.props.navigator} />
          <ProfileListComponent navigator={this.props.navigator} />
        </View>
        {this.props.tabComponent}
        {/*<TabComponent mainNavigator={this.props.mainNavigator} tab={this.props.tab} />*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingTop: 20
  }
});