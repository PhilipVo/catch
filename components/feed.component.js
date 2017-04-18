import React, { Component } from 'react';
import { Image, ListView, Text, View } from 'react-native';
// import { CountDown } from 'react-native-countdown';
import { Icon, List, ListItem, Tab, Tabs } from 'react-native-elements';

import feed from './sample-feed';
import http from '../services/http.service';
import styles from '../services/styles.service';

export default class FeedComponent extends Component {
  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      data: feed,
      dataSource: ds.cloneWithRows(feed)
    }
  }

  componentDidMount() { }

  render() {
    return (
      <View>
        <View style={{ height: 50, marginTop: 30 }}>
          <Text style={{ fontSize: 16, textAlign: 'center' }}>Catch</Text>
        </View>
        <ListView dataSource={this.state.dataSource}
          renderRow={(rowData, sectionID, rowID) => {
            return (
              <Image style={styles.coverImage} source={{ uri: rowData.cover }}>
                <Text style={styles.coverText}>{rowData.event}</Text>

                <Text> </Text>
              </Image>
            );
          }}
        >

        </ListView>
      </View>
    );
  }
}