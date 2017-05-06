const moment = require('moment');
import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';

import FeedUpcomingComponent from './feed-upcoming.component';
import FeedUpcomingModalComponent from './feed-upcoming-modal.component';
import PastListComponent from '../common/past-list.component';
import PastModalComponent from '../common/past-modal.component';
import TabComponent from '../common/tab.component';

import http from '../../services/http.service';

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

            <FeedUpcomingComponent
              setSelected={selected => this.setState({
                hideStatusBar: true,
                modal: 'upcoming',
                selected: selected,
              })}
              style={this.state.tab === 'upcoming' ? null : { display: 'none' }} />

            <PastListComponent
              onPress={selected => {
                {/*this.setState({
                  hideStatusBar: true,
                  modal: 'past',
                  selected: selected,
                })*/}

                this.props.feedNavigator.push({
                  component: 'StoryComponent',
                  selected: selected
                });
              }}
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
              <PastModalComponent
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