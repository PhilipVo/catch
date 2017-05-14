import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Display from 'react-native-display';

import AccountDetailsComponent from './account-details.component';
import AccountListComponent from './account-list.component';
import PastModalComponent from '../common/past-modal.component';
import TabComponent from '../common/tab.component';
import UpcomingModalComponent from '../common/upcoming-modal.component';

export default class AccountComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: null,
      selected: null
    };
  }

  render() {
    const tabBar = (
      <TabComponent
        navigate={this.props.screenProps.navigate}
        tab='account' />
    );

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.view}>
          <View style={{ flex: 11 }}>
            <AccountDetailsComponent navigate={this.props.navigation.navigate} />
            <AccountListComponent
              navigate={this.props.navigation.navigate}
              setSelected={(modal, selected) => this.setState({
                modal: modal,
                selected: selected
              })} />
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

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingTop: 20
  }
});