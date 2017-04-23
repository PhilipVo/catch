import React, { Component } from 'react';
import { Image, ListView } from 'react-native';
import { Icon, Text } from 'react-native-elements';

import styles from '../styles/styles';

import past from './sample-past';
import upcoming from './sample-past-contributions';

export default class ListComponent extends Component {
  constructor(props) {
    super(props);

    const data = this.props.tab === 'past' ? past : upcoming
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      data: data,
      dataSource: ds.cloneWithRows(data)
    }
  }

  componentDidMount() {
    console.log('mounted ListComponent');
  }

  render() {
    return (
      <ListView
        style={this.props.style}
        dataSource={this.state.dataSource}
        removeClippedSubviews={false}
        renderRow={(rowData, sectionID, rowID) => (
          <Image source={{ uri: rowData.cover }} style={styles.coverImage}>
            <Text style={styles.coverText}>{rowData.event}</Text>
          </Image>)
        }
      />
    );
  }
}