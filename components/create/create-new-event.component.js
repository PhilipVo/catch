const contacts = require('react-native-contacts');
const moment = require('moment');

import React, { Component } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Keyboard,
  ListView,
  Platform,
  SegmentedControlIOS,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Icon } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modalbox';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import SendSMS from 'react-native-sms';
// import { ProcessingManager } from 'react-native-video-processing';
import { NavigationActions } from 'react-navigation';

import http from '../../services/http.service';
import s3 from '../../services/s3.service';
import session from '../../services/session.service';
import socket from '../../services/socket.service';

export default class CreateNewEventComponent extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.contributors = {};
    this.numbers = {};

    this.state = {
      audience: 0,
      cover: null,
      coverError: false,
      data: [],
      dataSource: this.ds.cloneWithRows([]),
      date: Date.now(),
      description: '',
      error: null,
      filter: '',
      isOpen: false,
      isVisible: false,
      saving: false,
      title: '',
      titleError: false,
    };
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      this.segment = <SegmentedControlTab
        onTabPress={index => this.state.audience = index}
        selectedIndex={this.state.audience}
        style={{ marginBottom: 20 }}
        tintColor='#f74434'
        values={['Public', 'Private']}
      />;
    } else if (Platform.OS === 'ios') {
      this.segment = <SegmentedControlIOS
        onChange={event => this.state.audience = event.nativeEvent.selectedSegmentIndex}
        selectedIndex={this.state.audience}
        style={{ marginBottom: 20 }}
        tintColor='#f74434'
        values={['Public', 'Private']} />;
    }
  }

  componentDidMount() {
    http.get('/api/contacts')
      .then(data => {
        let allContacts = [];
        if (data.length > 0) allContacts = allContacts.concat(data);
        return contacts.getAllWithoutPhotos((error, contacts) => {
          if (error) throw error;
          if (contacts.length > 0) allContacts = allContacts.concat([{ isBreak: true }])
            .concat(JSON.parse(JSON.stringify(contacts)));

          this.setState({
            data: allContacts,
            dataSource: this.ds.cloneWithRows(allContacts)
          });
        });
      }).catch(() => { });
  }

  complete = () => {
    this.setState({
      coverError: false,
      error: null,
      saving: true,
      titleError: false
    });

    if (!this.state.cover)
      return this.setState({
        coverError: true,
        saving: false
      });

    if (this.state.title.length === 0)
      return this.setState({
        saving: false,
        titleError: true
      });

    const event = {
      audience: this.state.audience,
      contributors: this.contributors,
      date: this.state.date,
      description: this.state.description,
      isVideo: this.props.navigation.state.params ?
        this.props.navigation.state.params.isVideo : null,
      story: this.props.navigation.state.params ?
        this.props.navigation.state.params.story : null,
      title: this.state.title
    };

    console.log('date is:', event.date)
    console.log('date formatted:', new Date(event.date).toISOString())

    http.post('/api/events', JSON.stringify(event))
      .then(data => {
        // Upload cover:
        const file = {
          name: 'cover',
          type: 'image/jpeg',
          uri: this.state.cover
        };

        s3.put(file, `events/${data.eventId}/`).catch(error => { throw error });

        // Upload story:
        if (data.storyId) {
          const file = {
            name: data.storyId,
            type: event.isVideo ? 'video/mp4' : 'image/jpeg',
            uri: event.story
          };

          s3.put(file, `events/${data.eventId}/`).catch(error => { throw error });
        }

        // Send out SMS invites:
        const recipients = Object.keys(this.numbers);
        if (recipients.length > 0) return SendSMS.send({
          body: `${session.username} invited you as a contributor for Catch! itms-apps://itunes.apple.com/app/id1246628137`,
          recipients: recipients,
          successTypes: ['sent', 'queued']
        }, (completed, cancelled, error) => { });

        socket.emit('event');

        // Navigate to completion screen:
        this.props.navigation.dispatch(NavigationActions.reset({
          actions: [
            NavigationActions.navigate({
              params: {
                cover: this.state.cover,
                event: event
              },
              routeName: 'CreateCompleteComponent'
            })
          ],
          index: 0
        }));
      }).catch(error => {
        Alert.alert('Error', typeof error === 'string' ? error : 'Oops, something went wrong.');
      });
  }

  filter = filter => {
    this.setState({
      filter: filter,
      dataSource: this.ds.cloneWithRows(this.state.data)
    })
  }

  goBack = () => {
    try { this.props.navigation.state.params.play() }
    catch (error) { }
    this.props.navigation.goBack();
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

  openPicker = () => {
    ImagePicker.openPicker({
      cropping: true,
      height: 120,
      width: Dimensions.get('window').width,
    })
      .then(image => this.setState({ cover: image.path }))
      .catch(() => { });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <KeyboardAwareScrollView>
            <View style={{ flex: 1 }}>
              <StatusBar hidden={false} />

              {/* Header */}
              <View style={styles.header}>

                <View style={{ flex: 1 }}>
                  <Icon
                    name='angle-left'
                    onPress={this.goBack}
                    size={40}
                    style={{ marginLeft: 10 }}
                    type='font-awesome'
                    underlayColor='transparent' />
                </View>
                <View style={{ flex: 10 }}>
                  <Text style={styles.headerText}>Create a Catch</Text>
                </View>
                <View style={{ flex: 1 }}>
                </View>
              </View>

              {/* Body */}
              <View style={{ flex: 10 }}>

                {/* Cover photo */}
                <TouchableHighlight onPress={this.openPicker} underlayColor='transparent'>
                  <Image
                    source={this.state.cover ? { uri: this.state.cover } :
                      require('../../images/Background.png')}
                    style={styles.cover}>
                    <View style={styles.coverView}>
                      <Text style={this.state.coverError ?
                        styles.coverError : { color: 'white' }}>
                        Add a cover photo
                      </Text>
                      <Icon
                        color={this.state.coverError ? 'red' : 'white'}
                        name='add-circle-outline' />
                    </View>
                  </Image>
                </TouchableHighlight>

                {/* Form */}
                <View style={{ padding: 20 }}>
                  {/* Title */}
                  <Text style={this.state.titleError ?
                    styles.titleError : { fontSize: 16 }}>
                    Event
                  </Text>
                  <TextInput
                    autoCapitalize='words'
                    autoCorrect={true}
                    maxLength={32}
                    onChangeText={title => this.setState({ title: title })}
                    style={styles.textInput}
                  />

                  {/* Open on */}
                  <TouchableHighlight
                    onPress={() => this.setState({ isVisible: true })}
                    underlayColor='transparent'>
                    <View>
                      <Text style={{ fontSize: 16 }}>Open on</Text>
                      <TextInput
                        editable={false}
                        style={styles.textInput}
                        value={moment(this.state.date).format('MMMM D YYYY, h:mm a')} />
                    </View>
                  </TouchableHighlight>

                  <DateTimePicker
                    isVisible={this.state.isVisible}
                    maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                    minimumDate={new Date()}
                    mode='datetime'
                    onCancel={() => this.setState({ isVisible: false })}
                    onConfirm={date => this.setState({
                      date: new Date(date).getTime(),
                      isVisible: false
                    })} />

                  {/* Who */}
                  <Text style={{ fontSize: 16 }}>Who will view this?</Text>
                  {this.segment}

                  {/* Description */}
                  <Text style={{ fontSize: 16 }}>Description</Text>
                  <TextInput
                    autoCapitalize='sentences'
                    autoCorrect={true}
                    maxLength={120}
                    multiline={true}
                    onChangeText={description => { this.setState({ description: description }) }}
                    style={styles.description} />
                  <Text style={{
                    color: 'gray',
                    marginBottom: 20,
                    textAlign: 'right'
                  }}>
                    {120 - this.state.description.length} characters remaining
                </Text>

                  <Text
                    onPress={() => this.setState({ isOpen: true })}
                    style={{
                      borderColor: 'gray',
                      borderWidth: 0.5,
                      fontSize: 16,
                      padding: 5,
                      textAlign: 'center'
                    }}
                    underlayColor='transparent'>
                    Invite Contributors
                </Text>

                </View>

              </View>

              {/* Footer */}
              <View style={styles.footer}>
                {this.state.saving && <ActivityIndicator />}
                <Text
                  onPress={this.complete}
                  style={{ fontSize: 20 }}
                  underlayColor='transparent' >
                  {this.state.saving ? '  Saving' : 'Complete Event  '}
                </Text>
                {
                  !this.state.saving &&
                  <Icon
                    name='angle-right'
                    onPress={this.complete}
                    size={40}
                    type='font-awesome'
                    underlayColor='transparent' />
                }
              </View>

            </View>
          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>

        <Modal
          isOpen={this.state.isOpen}
          style={{ borderRadius: 10, height: 500, padding: 20, width: 300 }}
          swipeToClose={false}>

          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1 }}>
              <View style={{ flex: 10 }}>
                <Text style={{ fontSize: 16, textAlign: 'center' }}>Invite contributors</Text>

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
                  style={styles.filter} />

                {
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
                          rowData.contact && rowData.contact.toLowerCase().includes(this.state.filter) ||
                            rowData.givenName && rowData.givenName.toLowerCase().includes(this.state.filter) ||
                            rowData.familyName && rowData.familyName.toLowerCase().includes(this.state.filter) ?
                            <View style={{
                              alignItems: 'center',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              padding: 5,
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
                justifyContent: 'center'
              }}>
                <Text
                  onPress={() => this.setState({ isOpen: false })}
                  style={{ borderColor: 'black', borderRadius: 5, borderWidth: 0.5, padding: 7 }}>
                  Done
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  cover: {
    // backgroundColor: 'gray',
    height: 120,
    justifyContent: 'flex-end',
    marginTop: 20,
    width: Dimensions.get('window').width
  },
  coverError: {
    color: 'red',
    fontWeight: 'bold'
  },
  coverView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10
  },
  dateView: {
    flexDirection: 'row',
    marginBottom: 20
  },
  description: {
    borderColor: 'gray',
    borderWidth: 0.5,
    fontSize: 16,
    height: 60,
    padding: 5
  },
  filter: {
    borderColor: 'gray',
    borderWidth: 0.5,
    fontSize: 14,
    height: 25,
    padding: 5,
    textAlign: 'center'
  },
  header: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginTop: 20
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center'
  },
  footer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 20,
    marginTop: 20
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 0.5,
    height: 30,
    marginBottom: 20,
    textAlign: 'center',
    padding: 5
  },
  timeInput1: {
    borderColor: 'gray',
    borderWidth: 0.5,
    height: 30,
    padding: 5,
    width: 80
  },
  timeInput2: {
    borderColor: 'gray',
    borderWidth: 0.5,
    height: 30,
    marginLeft: 12,
    padding: 5,
    width: 80
  },
  timeView: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10
  },
  titleError: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold'
  }
});