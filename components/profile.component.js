import React, { Component } from 'react';
import { View } from 'react-native';
import Display from 'react-native-display';

import ProfileListComponent from './profile-list.component';
import ProfilePictureComponent from './profile-picture.component';
import ProfileSettingsComponent from './profile-settings.component';
import ProfileUserComponent from './profile-user.component';
import TabComponent from './tab.component';

import styles from '../styles/styles';

export default class ProfileComponent extends Component {
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
            <ProfileUserComponent setView={this.setView} />
            <ProfileListComponent />
          </View>
          <TabComponent navigator={this.props.navigator} tab='profile' />
        </Display>

        {
          this.state.view === 'picture' ?
            <ProfilePictureComponent setView={this.setView} style={{ flex: 11 }} /> :
            this.state.view === 'settings' ?
              <ProfileSettingsComponent setView={this.setView} style={{ flex: 11 }} /> :
              null
        }

      </View>
    );
  }
}