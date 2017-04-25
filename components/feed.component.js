import React, { Component } from 'react';
import {
  Image,
  ListView,
  Navigator,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';

import FeedPastComponent from './feed-past.component';
import FeedUpcomingComponent from './feed-upcoming.component';
import TabComponent from './tab.component';

import http from '../services/http.service';

import styles from '../styles/styles';

export default class FeedComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { tab: 'upcoming' };
  }

  componentDidMount() {
    console.log('mounted feed');
  }

  render() {
    return (
      <View style={styles.avoidTop}>
        <View style={{ flex: 11 }}>
          <Text style={styles.header}>Catch</Text>

          {/* Tab bar */}
          <View style={styles.feedTab}>
            <TouchableHighlight
              onPress={() => this.setState({ tab: 'upcoming' })}
              style={this.state.tab === 'upcoming' ?
                styles.activeTab : { flex: 1 }}
              underlayColor='transparent'>
              <Text style={this.state.tab === 'upcoming' ?
                styles.activeTabText : { textAlign: 'center' }}>Upcoming</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => this.setState({ tab: 'past' })}
              style={this.state.tab === 'past' ? styles.activeTab : { flex: 1 }}
              underlayColor='transparent'>
              <Text style={this.state.tab === 'past' ?
                styles.activeTabText : { textAlign: 'center' }}>Past</Text>
            </TouchableHighlight>
          </View>

          <FeedUpcomingComponent
            style={this.state.tab === 'upcoming' ? null : { display: 'none' }} />
          <FeedPastComponent
            style={this.state.tab === 'past' ? null : { display: 'none' }} />
        </View>
        <TabComponent navigator={this.props.navigator} tab='feed' />
      </View>
    );
  }
}