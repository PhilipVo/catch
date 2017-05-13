import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Display from 'react-native-display';

import PastModalComponent from './past-modal.component';
import ProfileListComponent from './profile-list.component';
import ProfileDetailsComponent from './profile-details.component';
import TabComponent from '../common/tab.component';

import users from '../../samples/users';

export default class ProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideStatusBar: false,
      selected: null
    };
  }

  componentWillUnmount() {
    console.log('unmounted')
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.view}>
          <View style={{ flex: 11 }}>
            <ProfileDetailsComponent
              goBack={this.props.navigation.goBack}
              user={users[this.props.navigation.state.params.username]} />
            <ProfileListComponent
              navigate={this.props.navigation.navigate}
              onPress={selected => this.setState({ selected: selected })} />
          </View>
          {/*{this.props.tabComponent}*/}
          <TabComponent
            navigate={this.props.screenProps.navigate}
            tab={this.props.navigation.state.params.tab} />
        </View>

        {
          this.state.selected ?
            <PastModalComponent
              hideModal={() => this.setState({ selected: null })}
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