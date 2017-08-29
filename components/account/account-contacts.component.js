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

export default class AccountContactsComponent extends Component {
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
      this.state.loading ?
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator style={{ alignSelf: 'center' }} />
        </View> : this.state.data.length > 0 ?
          <ListView
            dataSource={this.state.dataSource}
            removeClippedSubviews={false}
            renderRow={(rowData, sectionID, rowID) => (
              <Text
                onPress={() => this.props.viewUser(rowData.contact)}
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  padding: 5,
                  textAlign: 'center'
                }}>
                {rowData.contact}
              </Text>
            )} /> :
          <Text style={{ color: 'gray', textAlign: 'center' }}>
            No contacts found
          </Text>
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