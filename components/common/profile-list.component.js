import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';

import PastListComponent from './past-list.component';
import UpcomingListComponent from './upcoming-list.component';

export default class ProfileListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { tab: 'past' };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>

        {/* Tab bar */}
        <View style={styles.view}>
          <Icon
            color={this.state.tab === 'past' ? 'black' : 'gray'}
            name='photo-camera'
            onPress={() => this.setState({ tab: 'past' })}
            size={33}
            underlayColor='transparent' />
          <Icon
            color={this.state.tab === 'upcoming' ? 'black' : 'gray'}
            name='card-giftcard'
            onPress={() => this.setState({ tab: 'upcoming' })}
            size={33}
            underlayColor='transparent' />
        </View>

        {/* Tabs */}
        <View style={{ flex: 10 }}>
          <PastListComponent
            style={this.state.tab === 'past'
              ? null : { display: 'none' }} />
          <UpcomingListComponent
            style={this.state.tab === 'upcoming'
              ? null : { display: 'none' }} />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    borderTopColor: 'gray',
    borderTopWidth: 0.5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});