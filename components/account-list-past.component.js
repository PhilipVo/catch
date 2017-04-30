const moment = require('moment');
import React, { Component } from 'react';
import { Image, ListView, StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';

import past from '../samples/past';

export default class AccountListPastComponent extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      data: past,
      dataSource: ds.cloneWithRows(past)
    };
  }

  componentDidMount() {
    console.log('mounted ListComponent');
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        removeClippedSubviews={false}
        renderRow={(rowData, sectionID, rowID) => (
          <Image source={{ uri: rowData.cover }} style={styles.image}>
            <Text style={styles.pastTimer}>
              {moment(rowData.date).fromNow().toString()}
            </Text>
            <View style={styles.view}>
              <Text style={styles.feedText}>{rowData.event}</Text>
              <Icon color='white' name='play-circle-outline' size={33} />
            </View>
          </Image>)
        }
        style={this.props.style}
      />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 120,
    justifyContent: 'space-between'
  },
  view: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});