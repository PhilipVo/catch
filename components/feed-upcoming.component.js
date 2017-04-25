const moment = require('moment');
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

import upcoming from './sample-upcoming';

export default class FeedUpcomingComponent extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      data: upcoming,
      dataSource: this.ds.cloneWithRows(upcoming)
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        data: upcoming,
        dataSource: this.ds.cloneWithRows(upcoming)
      });
    }, 1000);
  }

  renderCountdowns = () => {
    return
    <Text>{this.state.time}</Text>
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        removeClippedSubviews={false}
        renderRow={(rowData, sectionID, rowID) => (
          <Image source={{ uri: rowData.cover }} style={styles.feedImage}>
            <Text style={styles.feedText}>{rowData.event}</Text>
            {/*<Icon color='white' name='play-circle-outline' size={33} />*/}

            {/* Timer */}
            <View style={{ flexDirection: 'row' }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.feedTimerText}>
                  {moment(rowData.date).diff(Date.now(), 'days')}
                </Text>
                <Text style={styles.feedTimerText}>Days</Text>
              </View>
              <Text style={styles.feedTimerText}>:</Text>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.feedTimerText}>
                  {moment(rowData.date).diff(Date.now(), 'hours') % 24}
                </Text>
                <Text style={styles.feedTimerText}>Hrs</Text>
              </View>
              <Text style={styles.feedTimerText}>:</Text>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.feedTimerText}>
                  {moment(rowData.date).diff(Date.now(), 'minutes') % 60}
                </Text>
                <Text style={styles.feedTimerText}>Mins</Text>
              </View>
            </View>
          </Image>)
        }
        style={this.props.style}
      />
    );
  }
}