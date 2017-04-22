import React, { Component } from 'react';
import { Image, ListView } from 'react-native';
import { Icon, Text } from 'react-native-elements';

import styles from '../styles/styles';

import upcoming from './sample-upcoming';

export default class UpcomingComponent extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      data: upcoming,
      dataSource: ds.cloneWithRows(upcoming)
    }
  }

  componentDidMount() {
    console.log('mounted upcoming');
  }

  render() {
    return (
      <ListView
       dataSource={this.state.dataSource} 
       renderRow={(rowData, sectionID, rowID) => (
        <Image style={styles.coverImage} source={{ uri: rowData.cover }}>
          <Text style={styles.coverText}>{rowData.event}</Text>
        </Image>)
        } 
      />
    );
  }
}