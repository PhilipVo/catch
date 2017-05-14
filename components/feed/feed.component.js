const moment = require('moment');
import React, { Component } from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';

import FeedUpcomingListComponent from './feed-upcoming-list.component';
import PastListComponent from '../common/past-list.component';
import PastModalComponent from '../common/past-modal.component';
import TabComponent from '../common/tab.component';
import UpcomingModalComponent from '../common/upcoming-modal.component';

import http from '../../services/http.service';

export default class FeedComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: null,
      selected: null,
      tab: 'upcoming',
    };
  }

  render() {
    const tabBar = (
      <TabComponent
        navigate={this.props.screenProps.navigate}
        tab='feed' />
    );

    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={false} />
        <View style={styles.avoidTop}>
          <View style={{ flex: 11 }}>

            <Text style={styles.header}>Catch</Text>

            {/* Tab bar */}
            <View style={styles.tabBar}>
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

            {/* Upcoming list */}
            <FeedUpcomingListComponent
              setSelected={selected => this.setState({
                modal: 'upcoming',
                selected: selected,
              })}
              style={this.state.tab === 'upcoming' ? null : { display: 'none' }} />

            {/* Past list */}
            <PastListComponent
              setSelected={(modal, selected) => {
                this.setState({
                  modal: 'past',
                  selected: selected,
                })
              }}
              style={this.state.tab === 'past' ? null : { display: 'none' }} />

          </View>

          {tabBar}
        </View>

        { // Modals
          this.state.modal === 'past' ?
            <PastModalComponent
              hideModal={() => this.setState({
                modal: null,
                selected: null
              })}
              navigate={this.props.navigation.navigate}
              selected={this.state.selected}
              tabBar={tabBar} /> :
            this.state.modal === 'upcoming' ?
              <UpcomingModalComponent
                hideModal={() => this.setState({
                  modal: null,
                  selected: null
                })}
                navigate={this.props.navigation.navigate}
                selected={this.state.selected}
                tabBar={tabBar} /> :
              null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  activeTab: {
    borderBottomColor: 'red',
    borderBottomWidth: 1,
    flex: 1
  },
  activeTabText: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  avoidTop: {
    flex: 1,
    paddingTop: 20
  },
  header: {
    fontSize: 16,
    paddingBottom: 10,
    textAlign: 'center'
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 1
  }
});