import React, { Component } from 'react';
import { Image, ListView, Text, View } from 'react-native';

import TabBarComponent from './tab-bar.component';

import feed from './sample-feed';
import http from '../services/http.service';
import styles from '../services/styles.service';

export default class FeedComponent extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      data: feed,
      dataSource: ds.cloneWithRows(feed)
    }
  }

  componentDidMount() {
    console.log('mounted feed');
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 11 }}>
          <Text style={{ fontSize: 16, textAlign: 'center', padding: 30 }}>Catch</Text>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData, sectionID, rowID) => {
              return (
                <Image style={styles.coverImage} source={{ uri: rowData.cover }}>
                  <Text style={styles.coverText}>{rowData.event}</Text>
                </Image>
              );
            }} />
        </View>
        <TabBarComponent navigator={this.props.navigator} tab={'feed'} />
      </View>
    );
  }
}