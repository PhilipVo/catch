const moment = require('moment');
import React, { Component } from 'react';
import {
  ActivityIndicator,
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
import session from '../../services/session.service';
import socket from '../../services/socket.service';

export default class UpcomingListComponent extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.screenProps.upcoming),
      now: Date.now(),
      requesting: false
    }

    this.interval = TimerMixin.setInterval(() => {
      this.setState({
        dataSource: this.ds.cloneWithRows(this.props.screenProps.upcoming),
        now: Date.now()
      });
    }, 60000);
  }

  componentWillUnmount() {
    TimerMixin.clearInterval(this.interval);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.ds.cloneWithRows(nextProps.screenProps.upcoming),
      now: Date.now()
    });
  }

  requestToContribute = rowData => {
    if (!this.state.requesting) {
      this.setState({ requesting: true });

      http.post('/api/contributors/request-to-contribute', JSON.stringify(rowData))
        .then(() => {
          socket.emit('contributor requested', {
            creator: rowData.username,
            title: rowData.title
          });
          rowData.status = 2;
          this.setState({ requesting: false });
        }).catch(() => { });
    }
  }

  requestToWatch = rowData => {
    if (!this.state.requesting) {
      this.setState({ requesting: true });

      http.post('/api/contributors/request-to-watch', JSON.stringify(rowData))
        .then(() => {
          socket.emit('watcher requested', {
            creator: rowData.username,
            title: rowData.title
          });
          rowData.status = 0;
          this.setState({ requesting: false });
        }).catch(() => { });
    }
  }

  render() {
    return (
      this.props.screenProps.loading ?
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator style={{ alignSelf: 'center' }} />
        </View> :
        this.props.screenProps.upcoming.length > 0 ?
          <ListView
            dataSource={this.state.dataSource}
            removeClippedSubviews={false}
            renderRow={(rowData, sectionID, rowID) => (
              <View style={{ marginBottom: 20 }}>
                <Image
                  source={{ uri: `${http.s3}/events/${rowData.id}/cover` }}
                  style={styles.image} />

                {/* Header */}
                <View style={styles.header}>
                  <View>
                    <Text style={{ fontSize: 16 }}>{rowData.title}</Text>

                    {
                      rowData.username === session.username ?
                        <View style={{ flexDirection: 'row' }}>
                          <Icon color='purple' name='star' size={15} />
                          <Text style={{ fontSize: 12 }}>You created this event</Text>
                        </View> : rowData.status === 0 ?
                          <Text style={{ fontSize: 12 }}>You've requested to watch</Text> :
                          rowData.status === 1 ?
                            <Text style={{ fontSize: 12 }}>You're watching this event</Text> :
                            rowData.status === 2 ?
                              <Text style={{ fontSize: 12 }}>You've requested to contribute</Text> :
                              rowData.status === 3 ?
                                <Text style={{ fontSize: 12 }}>You're a contributor</Text> : null
                    }

                    {
                      rowData.username === session.username &&
                      <Text
                        onPress={() => this.props.screenProps.setEvent('delete', rowData)}
                        style={{ color: 'red', fontSize: 12, fontWeight: 'bold' }}
                        underlayColor='transparent'>
                        Delete event
                      </Text>
                    }

                  </View>

                  {/* Timer */}
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={{ color: 'red' }}>
                        {moment(rowData.date).diff(this.state.now, 'days')}
                      </Text>
                      <Text style={{ color: 'red' }}>Days</Text>
                    </View>
                    <Text style={{ color: 'red' }}>:</Text>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={{ color: 'red' }}>
                        {moment(rowData.date).diff(this.state.now, 'hours') % 24}
                      </Text>
                      <Text style={{ color: 'red' }}>Hrs</Text>
                    </View>
                    <Text style={{ color: 'red' }}>:</Text>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={{ color: 'red' }}>
                        {moment(rowData.date).diff(this.state.now, 'minutes') % 60}
                      </Text>
                      <Text style={{ color: 'red' }}>Mins</Text>
                    </View>
                  </View>
                </View>

                { // Request buttons:
                  rowData.username !== session.username &&
                  <View style={{ alignItems: 'center' }}>
                    {
                      (rowData.status === null || rowData.status < 2) &&
                      <TouchableHighlight
                        onPress={() => this.requestToContribute(rowData)}
                        style={{
                          alignItems: 'center',
                          backgroundColor: '#f74434',
                          borderRadius: 5,
                          marginBottom: 10,
                          padding: 7,
                          width: 300
                        }}
                        underlayColor='#f74434'>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>
                          Request Invite to Contribute
                        </Text>
                      </TouchableHighlight>
                    }

                    {
                      rowData.status === null && rowData.audience === 1 &&
                      <TouchableHighlight
                        onPress={() => this.requestToWatch(rowData)}
                        style={{
                          alignItems: 'center',
                          backgroundColor: '#f74434',
                          borderRadius: 5,
                          padding: 7,
                          width: 300
                        }}
                        underlayColor='#f74434'>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>
                          Request Invite to Watch
                        </Text>
                      </TouchableHighlight>
                    }
                  </View>
                }

                <Text style={styles.description}>{rowData.description}</Text>

                <View style={styles.iconView}>
                  <Icon
                    name='chat-bubble-outline'
                    onPress={() => this.props.screenProps.setEvent('upcoming', rowData)}
                    size={25} />
                  <Icon
                    name='people-outline'
                    onPress={() => this.props.screenProps.setEvent('invited', rowData)}
                    size={25} />
                  {
                    (rowData.status === 3 || rowData.username === session.username) &&
                    <Icon
                      name='group-add'
                      onPress={() => this.props.screenProps.setEvent('invite', rowData)}
                      size={25} />
                  }
                </View>

              </View>)
            }
            style={{ flex: 1 }}
          /> :
          <View style={{ marginTop: 20 }}>
            <Text style={styles.grayText}>No upcoming events found</Text>
          </View >
    );
  }
}

const styles = StyleSheet.create({
  description: {
    paddingHorizontal: 30,
    marginTop: 10,
    textAlign: 'justify'
  },
  grayText: {
    color: 'gray',
    textAlign: 'center'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  iconView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10
  },
  image: {
    alignItems: 'flex-end',
    height: 120,
    justifyContent: 'flex-end'
  },
});