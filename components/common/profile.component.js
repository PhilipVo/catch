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
import Display from 'react-native-display';

import PastModalComponent from './past-modal.component';
import ProfileListComponent from './profile-list.component';
import ProfileDetailsComponent from './profile-details.component';
import UpcomingModalComponent from '../common/upcoming-modal.component';

import users from '../../samples/users';

export default class ProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: null,
      selected: null
    };
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
            <ProfileListComponent
              navigate={this.props.navigation.navigate}
              setSelected={(modal, selected) => this.setState({
                modal: modal,
                selected: selected
              })} />
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

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingTop: 20
  }
});