import React, { Component } from 'react';
import { View } from 'react-native';
import Display from 'react-native-display';

import AccountListComponent from './account-list.component';
import AccountPictureComponent from './account-picture.component';
import AccountSettingsComponent from './account-settings.component';
import AccountUserComponent from './account-user.component';
import TabComponent from './tab.component';

import styles from '../styles/styles';

export default class AccountComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { view: 'default' };
  }

  setView = (view) => {
    this.setState({ view: view });
  }

  render() {
    return (
      <View style={styles.avoidTop}>

        {/* Default view */}
        <Display enable={this.state.view === 'default'} keepAlive style={{ flex: 1 }}>
          <View style={{ flex: 11 }}>
            <AccountUserComponent setView={this.setView} />
            <AccountListComponent />
          </View>
          <TabComponent mainNavigator={this.props.mainNavigator} tab='account' />
        </Display>

        {
          this.state.view === 'picture' ?
            <AccountPictureComponent setView={this.setView} style={{ flex: 11 }} /> :
            this.state.view === 'settings' ?
              <AccountSettingsComponent setView={this.setView} style={{ flex: 11 }} /> :
              null
        }

      </View>
    );
  }
}