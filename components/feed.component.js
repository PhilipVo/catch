const moment = require('moment');
import React, { Component } from 'react';
import {
  Image,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';

import FeedPastComponent from './feed-past.component';
import FeedPastModalComponent from './feed-past-modal.component';
import FeedUpcomingComponent from './feed-upcoming.component';
import FeedUpcomingModalComponent from './feed-upcoming-modal.component';
import TabComponent from './tab.component';

import http from '../services/http.service';

import styles from '../styles/styles';

export default class FeedComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: null,
      selected: null,
      hideStatusBar: false,
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
                modal: 'upcoming',
                selected: selected,
                hideStatusBar: true
              })}
              style={this.state.tab === 'upcoming' ? null : { display: 'none' }} />

            <FeedPastComponent
              setSelected={selected => this.setState({
                modal: 'past',
                selected: selected,
                hideStatusBar: true
              })}
              style={this.state.tab === 'past' ? null : { display: 'none' }} />

          </View>
          <TabComponent
            navigator={this.props.navigator}
            hideStatusBar={this.state.hideStatusBar}
            tab='feed' />
        </View>

        {
          this.state.modal === 'upcoming' ?
            <FeedUpcomingModalComponent
              selected={this.state.selected}
              hideModal={() => this.setState({
                modal: null,
                hideStatusBar: false
              })} /> :
            this.state.modal === 'past' ?
              <FeedPastModalComponent
                selected={this.state.selected}
                hideModal={() => this.setState({
                  modal: null,
                  hideStatusBar: false
                })} /> :
              null
        }

      </View>
    );
  }
}