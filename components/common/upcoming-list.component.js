const moment = require('moment');
import React, { Component } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';
import TimerMixin from 'react-timer-mixin';

import http from '../../services/http.service';
import session from '../../services/session.service';

export default class UpcomingListComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.screenProps.upcoming,
      now: Date.now(),
      refreshing: false,
      requesting: false
    }

    this.interval = TimerMixin.setInterval(() => {
      this.setState(() => ({ now: Date.now() }));
    }, 60000);
  }

  componentWillUnmount() {
    TimerMixin.clearInterval(this.interval);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(() => ({
      data: nextProps.screenProps.upcoming,
      now: Date.now()
    }));
  }

  onRefresh = () => {
    if (!this.state.refreshing) {
      this.setState({ refreshing: true });
      this.props.screenProps.onRefresh()
        .then(() => {
          this.setState({
            now: Date.now(),
            refreshing: false
          });
        }).catch(() => this.setState({ refreshing: false }));
    }
  }

  requestToContribute = (item, index) => {
    if (!this.state.requesting) {
      this.setState({ requesting: true });

      http.post('/api/contributors/request-to-contribute', JSON.stringify(item))
        .then(() => {
          const data = this.state.data.slice();
          data[index].isContributor = 0;
          this.setState(() => ({
            data: data,
            requesting: false
          }));
        }).catch(() => { });
    }
  }

  requestToWatch = (item, index) => {
    if (!this.state.requesting) {
      this.setState({ requesting: true });

      http.post('/api/contributors/request-to-watch', JSON.stringify(item))
        .then(() => {
          const data = this.state.data.slice();
          data[index].isWatcher = 0;
          this.setState(() => ({
            data: data,
            requesting: false
          }));
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
          <FlatList
            data={this.state.data}
            extraData={this.state}
            keyExtractor={item => item.id}
            refreshControl={
              <RefreshControl
                enabled={!this.state.refreshing}
                onRefresh={this.onRefresh}
                refreshing={this.state.refreshing}
                size={RefreshControl.SIZE.SMALL} />
            }
            renderItem={({ item, index }) => (
              <View style={{ marginBottom: 20 }}>
                <Image
                  source={{ uri: `${http.s3}/events/${item.id}/cover` }}
                  style={styles.image} />

                {/* Header */}
                <View style={styles.header}>
                  <View>
                    <Text style={{ fontSize: 16 }}>{item.title}</Text>

                    {
                      item.username === session.username ?
                        <View style={{ flexDirection: 'row' }}>
                          <Icon color='purple' name='star' size={15} />
                          <Text style={{ fontSize: 12 }}>You created this event</Text>
                        </View> : item.isContributor === 1 ?
                          <Text style={{ fontSize: 12 }}>You're a contributor</Text> :
                          item.isContributor === 0 ?
                            <Text style={{ fontSize: 12 }}>You've requested to contribute</Text> :
                            item.isWatcher === 1 ?
                              <Text style={{ fontSize: 12 }}>You're watching this event</Text> :
                              item.isWatcher === 0 ?
                                <Text style={{ fontSize: 12 }}>You've requested to watch</Text> : null
                    }

                    {
                      item.username === session.username &&
                      <Text
                        onPress={() => this.props.screenProps.setEvent('delete', item)}
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
                        {moment(item.date).diff(this.state.now, 'days')}
                      </Text>
                      <Text style={{ color: 'red' }}>Days</Text>
                    </View>
                    <Text style={{ color: 'red' }}>:</Text>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={{ color: 'red' }}>
                        {moment(item.date).diff(this.state.now, 'hours') % 24}
                      </Text>
                      <Text style={{ color: 'red' }}>Hrs</Text>
                    </View>
                    <Text style={{ color: 'red' }}>:</Text>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={{ color: 'red' }}>
                        {moment(item.date).diff(this.state.now, 'minutes') % 60}
                      </Text>
                      <Text style={{ color: 'red' }}>Mins</Text>
                    </View>
                  </View>
                </View>

                { // Request buttons:
                  item.username !== session.username &&
                  <View style={{ alignItems: 'center' }}>
                    {
                      (item.isContributor === null) &&
                      <TouchableHighlight
                        onPress={() => this.requestToContribute(item, index)}
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
                      item.audience === 1 && item.isWatcher === null &&
                      <TouchableHighlight
                        onPress={() => this.requestToWatch(item, index)}
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

                <Text style={styles.description}>{item.description}</Text>

                <View style={styles.iconView}>
                  <Icon
                    name='chat-bubble-outline'
                    onPress={() => this.props.screenProps.setEvent('upcoming', item)}
                    size={25} />
                  <Icon
                    name='people-outline'
                    onPress={() => this.props.screenProps.setEvent('invited', item)}
                    size={25} />
                  {
                    (item.isContributor === 1 || item.username === session.username) &&
                    <Icon
                      name='group-add'
                      onPress={() => this.props.screenProps.setEvent('invite', item)}
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