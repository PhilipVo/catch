const moment = require('moment');
import React, { Component } from 'react';
import { Image, ListView, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';

import styles from '../styles/styles';

import past from '../samples/past';

export default class ProfileListPastComponent extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      data: past,
      dataSource: ds.cloneWithRows(past)
    }
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
          <Image source={{ uri: rowData.cover }} style={styles.pastImage}>
            <Text style={styles.pastTimer}>
              {moment(rowData.date).fromNow().toString()}
            </Text>
            <View style={styles.pastImageView}>
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