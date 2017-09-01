import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
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

export default class AccountNotificationListComponent extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      accepting: false,
      dataSource: this.ds.cloneWithRows(this.props.screenProps.notifications)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ dataSource: this.ds.cloneWithRows(nextProps.screenProps.notifications) });
  }

  acceptContributor = rowData => {
    if (!this.state.accepting) {
      this.setState({ accepting: true });

      http.put(`/api/contributors/accept-contributor`, JSON.stringify(rowData))
        .then(() => {
          rowData.action = 1;
          this.setState({ accepting: false });
        }).catch(error => {
          Alert.alert('Error', typeof error === 'string' ? error : 'Oops, something went wrong.');
        });
    }
  }

  acceptWatcher = rowData => {
    if (!this.state.accepting) {
      this.setState({ accepting: true });

      http.put(`/api/contributors/accept-watcher`, JSON.stringify(rowData))
        .then(() => {
          rowData.action = 1;
          this.setState({ accepting: false });
        }).catch(error => {
          Alert.alert('Error', typeof error === 'string' ? error : 'Oops, something went wrong.');
        });
    }
  }

  viewUser = username => {
    this.props.screenProps.navigate('ProfileComponent', {
      tabComponent: this.props.screenProps.tabComponent,
      username: username
    });
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
              <View style={{ alignItems: 'center', flexDirection: 'row', paddingVertical: 5 }}>

                {/* Profile picture */}
                <TouchableHighlight
                  onPress={() => this.viewUser(rowData.notifier)}
                  style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}
                  underlayColor='transparent'>
                  <Image
                    style={{ borderRadius: 15, height: 30, width: 30 }}
                    source={{ uri: `${http.s3}/users/${rowData.notifier}` }} />
                </TouchableHighlight>

                {/* Middle text */}
                <View style={{ flex: 4, justifyContent: 'center' }}>
                  <Text style={{ fontSize: 13 }}>
                    {
                      rowData.type === 'commented' ?
                        `${rowData.notifier} commented on ${rowData.title}` :
                        rowData.type === 'contacted' ?
                          `${rowData.notifier} added you as a contact` :
                          rowData.type === 'contributed' ?
                            `${rowData.notifier} added to ${rowData.title}` :
                            rowData.type === 'contributor accepted' ?
                              `You can now add to ${rowData.title}` :
                              rowData.type === 'contributor requested' ?
                                `Can ${rowData.notifier} add to ${rowData.title}?` :
                                rowData.type === 'watch accepted' ?
                                  `You can now view ${rowData.title}` :
                                  rowData.type === 'watch requested' ?
                                    `Can ${rowData.notifier} watch ${rowData.title}?` : null
                    }
                  </Text>
                </View>

                {/* Actions */}
                <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                  {
                    rowData.type === 'contributor requested' && rowData.action === 0 ?
                      <Icon
                        name='add-circle-outline'
                        onPress={() => this.acceptContributor(rowData)} /> :
                      rowData.type === 'contributor requested' && rowData.action === 1 ?
                        <Icon
                          color='#f74434'
                          name='check-circle' /> :
                        rowData.type === 'watch requested' && rowData.action === 0 ?
                          <Icon
                            name='add-circle-outline'
                            onPress={() => this.acceptWatcher(rowData)} /> :
                          rowData.type === 'watch requested' && rowData.action === 1 ?
                            <Icon
                              color='#f74434'
                              name='check-circle' /> : null
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