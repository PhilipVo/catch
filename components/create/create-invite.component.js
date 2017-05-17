import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

import friends from '../../samples/friends';

export default class CreateNewEventComponent extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      data: friends,
      dataSource: this.ds.cloneWithRows(friends),
      invitees: []
    }
  }

  complete = () => {
    console.log('complete')
    this.props.navigation.dispatch(NavigationActions.reset({
      actions: [
        NavigationActions.navigate({
          routeName: 'CreateCompleteComponent',
          params: {
            event: this.props.navigation.state.params.event,
            invitees: this.state.invitees
          }
        })
      ],
      index: 0
    }))
  }

  render() {
    return (
      <View style={{ flex: 1 }}>

        {/* Header */}
        <View style={{ alignItems: 'center', flex: 1, flexDirection: 'row', marginTop: 20 }}>
          <View style={{ flex: 1 }}>
            <Icon
              name='angle-left'
              onPress={() => this.props.navigation.goBack()}
              size={40}
              style={{ marginLeft: 10 }}
              type='font-awesome'
              underlayColor='transparent' />
          </View>
          <View style={{ flex: 10 }}>
            <Text style={{ fontSize: 20, textAlign: 'center' }}>Add to ...</Text>
          </View>
          <View style={{ flex: 1 }}>
          </View>
        </View>

        {/* Body */}
        <View style={{ flex: 10, padding: 20 }}>
          <ListView
            dataSource={this.state.dataSource}
            removeClippedSubviews={false}
            renderRow={(rowData, sectionID, rowID) => (
              <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                <Text style={{ fontSize: 16 }}>{rowData.username}</Text>
                <TouchableHighlight
                  onPress={() => { }}
                  underlayColor='transparent'>
                  <View style={{ alignItems: 'center', borderWidth: 0.5, borderRadius: 10, flexDirection: 'row', paddingHorizontal: 10 }}>
                    <Text>Invite</Text>
                    <Icon name='add' />
                  </View>
                </TouchableHighlight>
              </View>
            )} />
        </View>

        {/* Footer */}
        <TouchableHighlight
          onPress={this.complete}
          underlayColor='transparent'>
          <View style={styles.footer}>
            <Text style={{ fontSize: 20 }}>Complete Event  </Text>
            <Icon
              name='angle-right'
              size={40}
              type='font-awesome'
              underlayColor='transparent' />
          </View>
        </TouchableHighlight>

      </View >
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10
  },
});