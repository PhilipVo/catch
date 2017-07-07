const contacts = require('react-native-contacts');

import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  ListView,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modalbox';
import SendSMS from 'react-native-sms';

import http from '../../services/http.service';
import session from '../../services/session.service';
import socket from '../../services/socket.service';

export default class InviteModalComponent extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.contributors = {};
    this.numbers = {};

    this.state = {
      data: [],
      dataSource: this.ds.cloneWithRows([]),
      filter: '',
      inviting: false,
      loading: true
    };
  }

  componentDidMount() {
    http.get(`/api/contacts/get-uninvited-contacts-for-event/${this.props.event.id}`)
      .then(data => {
        let allContacts = [];
        if (data.length > 0) allContacts = allContacts.concat(data);
        return contacts.getAllWithoutPhotos((error, contacts) => {
          if (error) throw error;
          if (contacts.length > 0) allContacts = allContacts.concat([{ isBreak: true }])
            .concat(JSON.parse(JSON.stringify(contacts)));

          this.setState({
            data: allContacts,
            dataSource: this.ds.cloneWithRows(allContacts),
            loading: false
          });
        });
      }).catch(() => { });
  }

  complete = () => {
    if (Object.keys(this.contributors).length + Object.keys(this.numbers).length == 0)
      return Alert.alert('No contributors were added.');

    if (!this.state.inviting) {
      this.setState({ inviting: true });

      http.post(`/api/contributors`, JSON.stringify({
        contributors: Object.keys(this.contributors),
        event: this.props.event
      })).then(() => {
        const recipients = Object.keys(this.numbers);
        if (recipients.length > 0) return SendSMS.send({
          body: `${session.username} invited you as a contributor for ${this.props.event.title}! itms-apps://itunes.apple.com/app/id1246628137`,
          recipients: recipients,
          successTypes: ['sent', 'queued']
        }, (completed, cancelled, error) => { });
      }).then(() => {
        socket.emit('invited', {
          contributors: this.props.contributors,
          event: this.props.event,
          username: session.username
        });
        this.props.hideModal();
      }).catch(error => {
        console.log(error)
        Alert.alert('Error', typeof error === 'string' ? error : 'Oops, something went wrong.');
        this.props.hideModal();
      });
    }
  }

  filter = filter => {
    this.setState({
      filter: filter,
      dataSource: this.ds.cloneWithRows(this.state.data)
    })
  }

  invite = (rowData, rowID) => {
    // Add contributor if not already invited:
    if (!rowData.invited) {
      const _data = this.state.data.slice();
      _data[rowID].invited = true;
      if (rowData.contact) this.contributors[rowData.contact] = true;
      else {
        try { this.numbers[rowData.phoneNumbers[0].number] = true }
        catch (error) { }
      }

      this.setState({
        data: _data,
        dataSource: this.ds.cloneWithRows(_data)
      });
    }
    // Else remove contributor: 
    else {
      const _data = this.state.data.slice();
      _data[rowID].invited = false;
      if (rowData.contact) delete this.contributors[rowData.contact];
      else {
        try { delete this.numbers[rowData.phoneNumbers[0].number] }
        catch (error) { }
      }

      this.setState({
        data: _data,
        dataSource: this.ds.cloneWithRows(_data)
      });
    }
  }

  render() {
    return (
      <Modal
        isOpen={true}
        onClosed={this.props.hideModal}
        style={{ borderRadius: 10, height: 500, padding: 20, width: 300 }}
        swipeToClose={false}>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
                {this.props.event.title}
              </Text>
              <Text style={{ fontSize: 12, textAlign: 'center' }}>Invite contributors</Text>

              <View style={{
                alignSelf: 'center',
                height: 0.5,
                backgroundColor: 'black',
                marginVertical: 10,
                width: 250
              }} />

              <TextInput
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={this.filter}
                placeholder='filter'
                placeholderTextColor='gray'
                style={{
                  borderColor: 'gray',
                  borderWidth: 0.5,
                  fontSize: 14,
                  height: 25,
                  padding: 5,
                  textAlign: 'center'
                }} />

              {
                this.state.loading ?
                  <ActivityIndicator /> :
                  this.state.data.length > 0 ?
                    <ListView
                      dataSource={this.state.dataSource}
                      removeClippedSubviews={false}
                      renderRow={(rowData, sectionID, rowID) => (
                        rowData.isBreak ?
                          <Text style={{
                            fontSize: 16,
                            padding: 10,
                            textAlign: 'center'
                          }}>
                            From address book:
                          </Text> : rowData.contact !== this.props.event.username && (
                            rowData.contact && rowData.contact.toLowerCase().includes(this.state.filter) ||
                            rowData.givenName && rowData.givenName.toLowerCase().includes(this.state.filter) ||
                            rowData.familyName && rowData.familyName.toLowerCase().includes(this.state.filter)
                          ) ?
                            <View style={{
                              alignItems: 'center',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              padding: 5
                            }}>

                              {
                                rowData.contact ?
                                  <Text style={{ fontSize: 16 }}>{rowData.contact}</Text> :
                                  <Text style={{ fontSize: 16 }}>{rowData.givenName} {rowData.familyName}</Text>
                              }

                              <TouchableHighlight
                                onPress={() => this.invite(rowData, rowID)}
                                underlayColor='transparent'>
                                {
                                  rowData.invited ?
                                    <View style={{
                                      alignItems: 'center',
                                      backgroundColor: '#f74434',
                                      borderWidth: 0.5,
                                      borderRadius: 5,
                                      flexDirection: 'row',
                                      paddingHorizontal: 10
                                    }}>
                                      <Text>Invited</Text>
                                      <Icon name='add' />
                                    </View> :
                                    <View style={{
                                      alignItems: 'center',
                                      borderWidth: 0.5,
                                      borderRadius: 5,
                                      flexDirection: 'row',
                                      paddingHorizontal: 10
                                    }}>
                                      <Text>Invite</Text>
                                      <Icon name='add' />
                                    </View>
                                }
                              </TouchableHighlight>
                            </View> : null
                      )} /> :
                    <Text style={{ color: 'gray', textAlign: 'center' }}>
                      Event has no contributors
                    </Text>
              }
            </View>

            <View style={{
              alignItems: 'center',
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around'
            }}>
              <Text
                onPress={this.props.hideModal}
                style={{ borderColor: 'black', borderRadius: 5, borderWidth: 0.5, padding: 7 }}>
                Cancel
              </Text>
              {
                this.state.inviting ?
                  <Text style={{ padding: 7 }}>Inviting...</Text> :
                  <Text
                    onPress={this.complete}
                    style={{ borderColor: 'black', borderRadius: 5, borderWidth: 0.5, padding: 7 }}>
                    Invite
                  </Text>
              }
            </View>
          </View>
        </TouchableWithoutFeedback>

      </Modal>
    );
  }
}