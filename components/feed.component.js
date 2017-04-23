import React, { Component } from 'react';
import {
  Image,
  ListView,
  Navigator,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import TabComponent from './tab.component';

import http from '../services/http.service';

import styles from '../styles/styles';

import past from './sample-past';
import upcoming from './sample-upcoming';

export default class FeedComponent extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      pastData: past,
      pastDataSource: ds.cloneWithRows(past),
      upcomingData: upcoming,
      upcomingDataSource: ds.cloneWithRows(upcoming),
      feed: 'upcoming'
    };
  }

  componentDidMount() {
    console.log('mounted feed');
  }

  changeFeed = (feed) => {
    if (this.state.feed !== feed) {
      // const data = feed === 'past' ? past : upcoming;
      this.setState({
        // data: data,
        // dataSource: this.state.dataSource.cloneWithRows(data),
        feed: feed
      });
    }
  }

  render() {
    return (
      <View style={styles.avoidTop}>
        <View style={{ flex: 11 }}>
          <Text style={styles.header}>Catch</Text>
          <View style={styles.feedTab}>
            <TouchableHighlight
              onPress={() => this.changeFeed('upcoming')}
              style={this.state.feed === 'upcoming' ?
                styles.activeFeed : { flex: 1 }}
              underlayColor='transparent'>
              <Text style={{ textAlign: 'center' }}>Upcoming</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => this.changeFeed('past')}
              style={this.state.feed === 'past' ? styles.activeFeed : { flex: 1 }}
              underlayColor='transparent'>
              <Text style={{ textAlign: 'center' }}>Past</Text>
            </TouchableHighlight>
          </View>
          <ListView
            dataSource={this.state.pastDataSource}
            removeClippedSubviews={false}
            renderRow={(rowData, sectionID, rowID) => (
              <Image source={{ uri: rowData.cover }} style={styles.coverImage}>
                <Text style={styles.coverText}>{rowData.event}</Text>
              </Image>)
            }
            style={this.state.feed === 'upcoming' ? { display: 'none' } : null}
          />
          <ListView
            dataSource={this.state.upcomingDataSource}
            removeClippedSubviews={false}
            renderRow={(rowData, sectionID, rowID) => (
              <Image source={{ uri: rowData.cover }} style={styles.coverImage}>
                <Text style={styles.coverText}>{rowData.event}</Text>
              </Image>)
            }
            style={this.state.feed === 'past' ? { display: 'none' } : null}
          />
        </View>
        <TabComponent navigator={this.props.navigator} tab={'feed'} />
      </View>
    );
  }
}