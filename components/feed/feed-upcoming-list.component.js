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

const http = require('../../services/http.service');

export default class FeedUpcomingListComponent extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.screenProps.upcoming),
      now: Date.now()
    };

    // Update timers every 60 seconds:
    this.interval = TimerMixin.setInterval(() => {
      this.setState({
        dataSource: this.ds.cloneWithRows(this.props.screenProps.upcoming),
        now: Date.now()
      })
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
              new Date(rowData.date).getTime() > this.state.now ?
                <TouchableHighlight
                  onPress={() => this.props.screenProps.setEvent('upcoming', rowData)}
                  underlayColor='transparent'>
                  <Image
                    source={{ uri: `${http.s3}/events/${rowData.id}/cover` }}
                    style={styles.coverImage}>
                    <Text style={styles.eventText}>{rowData.title}</Text>

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
                </TouchableHighlight> :
                <TouchableHighlight
                  onPress={() => this.props.screenProps.setEvent('past', rowData)}
                  underlayColor='transparent'>
                  <Image
                    source={{ uri: `${http.s3}/events/${rowData.id}/cover` }}
                    style={styles.image}>
                    <Text style={styles.timer}>
                      {moment(rowData.date).fromNow().toString()}
                    </Text>
                    <View style={styles.view}>
                      <Text style={styles.text}>{rowData.title}</Text>
                      <Icon color='white' name='play-circle-outline' size={33} />
                    </View>
                  </Image>
                </TouchableHighlight>
            )}
            style={{ flex: 1 }}
          /> :
          <View style={{ marginTop: 20 }}>
            <Text style={styles.grayText}>No upcoming events found</Text>
          </View>
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
  grayText: {
    color: 'gray',
    textAlign: 'center'
  },
  image: {
    height: 120,
    justifyContent: 'space-between'
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 5,
    textShadowColor: 'black',
    textShadowOffset: { width: 0.5, height: 0.5 }
  },
  timer: {
    alignSelf: 'flex-end',
    color: 'white',
    fontWeight: 'bold',
    paddingRight: 5,
    textShadowColor: 'black',
    textShadowOffset: { width: 0.5, height: 0.5 }
  },
  timerText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: { width: 0.5, height: 0.5 }
  },
  view: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});