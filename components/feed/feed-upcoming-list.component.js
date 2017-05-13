const moment = require('moment');
import React, { Component } from 'react';
import {
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';
import TimerMixin from 'react-timer-mixin';

import http from '../../services/http.service';

import upcoming from '../../samples/upcoming';

export default class FeedUpcomingListComponent extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      data: upcoming,
      dataSource: this.ds.cloneWithRows(upcoming),
      now: Date.now()
    };

    TimerMixin.setInterval(() => {
      this.setState({
        data: upcoming,
        dataSource: this.ds.cloneWithRows(upcoming),
        now: Date.now()
      });
    }, 60000);
  }

  renderCountdowns = () => {
    return (
      <Text>{this.state.time}</Text>
    );
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        removeClippedSubviews={false}
        renderRow={(rowData, sectionID, rowID) => (
          <TouchableHighlight
            onPress={() => this.props.setSelected(rowData)}
            underlayColor='transparent'>
            <Image source={{ uri: rowData.cover }} style={styles.coverImage}>
              <Text style={styles.eventText}>{rowData.event}</Text>
              {/*<Icon color='white' name='play-circle-outline' size={33} />*/}

              {/* Timer */}
              <View style={{ flexDirection: 'row' }}>
                <View style={{ alignItems: 'center' }}>
                  <Text style={styles.timerText}>
                    {moment(rowData.date).diff(this.state.now, 'days')}
                  </Text>
                  <Text style={styles.timerText}>Days</Text>
                </View>
                <Text style={styles.timerText}>:</Text>
                <View style={{ alignItems: 'center' }}>
                  <Text style={styles.timerText}>
                    {moment(rowData.date).diff(this.state.now, 'hours') % 24}
                  </Text>
                  <Text style={styles.timerText}>Hrs</Text>
                </View>
                <Text style={styles.timerText}>:</Text>
                <View style={{ alignItems: 'center' }}>
                  <Text style={styles.timerText}>
                    {moment(rowData.date).diff(this.state.now, 'minutes') % 60}
                  </Text>
                  <Text style={styles.timerText}>Mins</Text>
                </View>
              </View>
            </Image>
          </TouchableHighlight>)
        }
        style={this.props.style}
      />
    );
  }
}

const styles = StyleSheet.create({
  coverImage: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    height: 120,
    justifyContent: 'space-between'
  },
  eventText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 5,
    textShadowColor: 'black',
    textShadowOffset: { width: 0.5, height: 0.5 }
  },
  timerText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: { width: 0.5, height: 0.5 }
  }
});