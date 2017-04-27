const moment = require('moment');
import React, { Component } from 'react';
import {
  Image,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';

import FeedModalComponent from './feed-modal.component';
import FeedPastComponent from './feed-past.component';
import FeedUpcomingComponent from './feed-upcoming.component';
import TabComponent from './tab.component';

import http from '../services/http.service';

import styles from '../styles/styles';

export default class FeedComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      selected: null,
      tab: 'upcoming',
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
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
              setSelected={selected => this.setState({
                showModal: true,
                selected: selected
              })}
              style={this.state.tab === 'upcoming' ? null : { display: 'none' }} />
            <FeedPastComponent
              style={this.state.tab === 'past' ? null : { display: 'none' }} />

          </View>
          <TabComponent navigator={this.props.navigator} tab='feed' />
        </View>

        {
          this.state.showModal ?
            <FeedModalComponent
              selected={this.state.selected}
              hideModal={() => this.setState({ showModal: false })} /> :
            null
        }

      </View>
    );
  }
}