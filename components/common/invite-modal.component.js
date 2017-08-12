const Contacts = require('react-native-contacts');

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
import { Observable } from 'rxjs/Observable';

import http from '../../services/http.service';
import session from '../../services/session.service';
import socket from '../../services/socket.service';

export default class InviteModalComponent extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.contributors = {};
    this.numbers = {};
    this.contacts = [];
    this.term = '';

    this.state = {
      data: [],
      dataSource: this.ds.cloneWithRows([]),
      inviting: false,
      loading: true
    };
  }

  componentDidMount() {
    http.get(`/api/contacts/get-uninvited-contacts-for-event/${this.props.event.id}`)
      .then(data => {
        this.contacts = data;
        this.setState({
          data: data,
          dataSource: this.ds.cloneWithRows(data),
          loading: false
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

        socket.emit('contributor requested', {
          title: this.props.event.title,
          username: this.props.event.username
        });

        this.props.hideModal();
      }).catch(error => {
        Alert.alert('Error', typeof error === 'string' ? error : 'Oops, something went wrong.');
        this.props.hideModal();
      });
    }
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

  search = term => {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }

    this.subscription = Observable.create(observer => {
      Contacts.getContactsMatchingString(term, (error, contacts) => {
        if (error) console.log(error)
        else observer.next(contacts)
      });
    }).subscribe(contacts => {
      let _data = this.contacts.slice();

      if (contacts.length > 0) _data = _data.concat([{ isBreak: true }]);
      _data = _data.concat(JSON.parse(JSON.stringify(contacts)));

      this.setState({
        data: _data,
        dataSource: this.ds.cloneWithRows(_data),
        loading: false
      });
    });
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
                onChangeText={this.search}
                placeholder='search address book'
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
                          </Text> :
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
                                rowData.invited || (rowData.phoneNumbers &&
                                  this.numbers[[rowData.phoneNumbers[0].number]]) ?
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
                          </View>
                      )} /> : null
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