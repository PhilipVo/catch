import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Display from 'react-native-display';

import AccountDetailsComponent from './account-details.component';
import AccountListComponent from './account-list.component';
import AccountPictureComponent from './account-picture.component';
import AccountSettingsComponent from './account-settings.component';
import TabComponent from '../common/tab.component';

export default class AccountComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.view}>
          <View style={{ flex: 11 }}>
            <AccountDetailsComponent accountNavigator={this.props.accountNavigator} />
            <AccountListComponent accountNavigator={this.props.accountNavigator} />
          </View>
          <TabComponent navigator={this.props.navigator} tab='account' />
        </View>

        {
          this.state.selected ?
            <PastModalComponent
              hideModal={() => this.setState({
                selected: null,
                hideStatusBar: false
              })}
              selected={this.state.selected} /> :
            null
        }
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