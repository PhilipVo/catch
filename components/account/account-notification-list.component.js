const moment = require('moment');
import React, { Component } from 'react';
import {
  ActivityIndicator,
  Image,
  ListView,
  Text,
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';

import http from '../../services/http.service';
import session from '../../services/session.service';
import socket from '../../services/socket.service';

export default class AccountNotificationListComponent extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = { dataSource: this.ds.cloneWithRows(this.props.screenProps.notifications) };
  }

  addContact = () => {

  }

  componentWillReceiveProps(nextProps) {
    this.setState({ dataSource: this.ds.cloneWithRows(nextProps.screenProps.notifications) });
  }

  render() {
    return (
      this.props.screenProps.loading ?
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator style={{ alignSelf: 'center' }} />
        </View> :
        this.props.screenProps.notifications.length > 0 ?
          <ListView
            dataSource={this.state.dataSource}
            removeClippedSubviews={false}
            renderRow={(rowData, sectionID, rowID) => (
              <View style={{ alignItems: 'center', flexDirection: 'row', padding: 10 }}>

                {/* Profile picture */}
                <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                  <Image
                    style={{ borderRadius: 15, height: 30, width: 30 }}
                    source={{ uri: `${http.s3}/users/${rowData.notifier}` }} />
                </View>

                {/* Middle text */}
                <View style={{ flex: 3, justifyContent: 'center' }}>
                  <Text style={{ fontSize: 13 }}>
                    {
                      rowData.type === 'commented' ?
                        `${rowData.notifier} commented on ${rowData.title}` :
                        rowData.type === 'contacted' ?
                          `${rowData.notifier} added you as a contact` :
                          rowData.type === 'contributed' ?
                            `${rowData.notifier} added to {${rowData.title}}` : null
                    }
                  </Text>
                </View>

                {/* Actions */}
                <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                  {
                    rowData.type === 'contacted' ?
                      <TouchableHighlight
                        onPress={this.addContact}
                        style={rowData.action === 0 && styles.follow}
                        underlayColor='transparent' >
                        {
                          rowData.action === 0 ?
                            <View style={styles.addContactView}>
                              <Text style={{ fontSize: 12 }}>Follow</Text>
                            </View> :
                            <View style={styles.addContactView}>
                              <Text style={{ color: 'red', fontSize: 12, fontWeight: 'bold' }}>Following</Text>
                            </View>
                        }
                      </TouchableHighlight> : null
                  }
                </View>

              </View>
            )}
            style={{ flex: 1 }} /> :
          <View style={{ marginTop: 20 }}>
            <Text style={styles.grayText}>No notifications</Text>
          </View>
    );
  }
}

const styles = StyleSheet.create({
  addContactView: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  follow: {
    alignSelf: 'center',
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: 'gray',
    marginTop: 5,
    padding: 5
  },
  grayText: {
    color: 'gray',
    textAlign: 'center'
  }, image: {
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
  view: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});