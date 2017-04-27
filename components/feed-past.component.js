import React, { Component } from 'react';
import {
  Image,
  ListView,
  Text,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';

import http from '../services/http.service';

import styles from '../styles/styles';

import past from '../samples/past';

export default class FeedComponent extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      data: past,
      dataSource: ds.cloneWithRows(past),
    };
  }

  componentDidMount() {
    console.log('mounted feed');
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        removeClippedSubviews={false}
        renderRow={(rowData, sectionID, rowID) => (
          <Image source={{ uri: rowData.cover }} style={styles.feedImage}>
            <Text style={styles.feedText}>{rowData.event}</Text>
            <Icon color='white' name='play-circle-outline' size={33} />
          </Image>)
        }
        style={this.props.style}
      />
    );
  }
}