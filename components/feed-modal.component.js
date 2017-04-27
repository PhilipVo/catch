const moment = require('moment');
import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ListView,
  StatusBar,
  Switch,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modalbox';

import FeedPastComponent from './feed-past.component';
import FeedUpcomingComponent from './feed-upcoming.component';
import TabComponent from './tab.component';

import http from '../services/http.service';

import styles from '../styles/styles';

import chat from '../samples/chat';

export default class FeedmodalComponent extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      data: chat,
      dataSource: this.ds.cloneWithRows(chat),
      comment: '',
      isOpen: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      _listView.scrollToEnd();
    }, 1000);
  }

  render() {
    return (
      <Modal
        isOpen={true}
        onClosed={this.props.hideModal}
        swipeArea={Dimensions.get('window').height / 2}
        swipeToClose={true}
        style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
        <StatusBar hidden={true} />
        {/*<Icon
                color='white'
                name='close'
                onPress={() => this.setState({ isOpen: false })}
                size={40}
                style={{
                  alignSelf: 'flex-start',
                  marginTop: 10
                }} />*/}

        <KeyboardAvoidingView
          behavior={'padding'}
          style={{ flex: 1 }}
        >
          <Image source={{ uri: this.props.selected.cover }} style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
            flex: 2,
            justifyContent: 'space-between'
          }}>
            <Text style={styles.feedText}>{this.props.selected.event}</Text>
            {/*<Icon color='white' name='play-circle-outline' size={33} />*/}

            {/* Timer */}
            <View style={{ flexDirection: 'row' }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.feedTimerText}>
                  {moment(this.props.selected.date).diff(Date.now(), 'days')}
                </Text>
                <Text style={styles.feedTimerText}>Days</Text>
              </View>
              <Text style={styles.feedTimerText}>:</Text>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.feedTimerText}>
                  {moment(this.props.selected.date).diff(Date.now(), 'hours') % 24}
                </Text>
                <Text style={styles.feedTimerText}>Hrs</Text>
              </View>
              <Text style={styles.feedTimerText}>:</Text>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.feedTimerText}>
                  {moment(this.props.selected.date).diff(Date.now(), 'minutes') % 60}
                </Text>
                <Text style={styles.feedTimerText}>Mins</Text>
              </View>
            </View>
          </Image>
          <View style={{ flex: 3, padding: 20 }}>
            <View style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
              <Text style={{ color: 'white', fontSize: 12 }}>27 Following</Text>
              <View style={{ alignItems: 'center' }}>
                <Switch
                  onValueChange={(value) => this.setState({
                    selected: {
                      ...this.props.selected,
                      isFollowing: value
                    }
                  })}
                  value={this.props.selected.isFollowing} />
                <Text style={{ color: 'white', fontSize: 10 }}> Notifications</Text>
              </View>
            </View>

            <Text style={{ color: 'white', fontSize: 16, padding: 5 }}>{this.props.selected.detail}</Text>
            <Text style={{ color: 'white', fontSize: 12, marginTop: 10 }}>Comments</Text>

            <ListView
              dataSource={this.state.dataSource}
              ref={listView => _listView = listView}
              removeClippedSubviews={false}
              renderRow={(rowData, sectionID, rowID) => (
                <View style={{ flexDirection: 'row', flex: 1, padding: 2 }}>
                  <Image
                    source={{ uri: rowData.img }}
                    style={{
                      height: 50,
                      width: 50
                    }}
                  />
                  <View style={{
                    flex: 1
                  }}>
                    <Text style={{ backgroundColor: 'white', minHeight: 50, padding: 10 }}>{rowData.comment}</Text>
                  </View>
                </View>
              )}
            />

            <TextInput
              autoCapitalize='sentences'
              autoCorrect={true}
              maxLength={120}
              onChangeText={(comment) => this.setState({ comment: comment })}
              onSubmitEditing={() => {
                _listView.scrollToEnd();
                this.setState({ comment: '' })
              }}
              placeholder='comment'
              returnKeyType='send'
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: 'white',
                marginTop: 5,
                padding: 10
              }}
              value={this.state.comment} />
          </View>

        </KeyboardAvoidingView>

      </Modal>
    );
  }
}