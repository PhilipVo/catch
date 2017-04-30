const moment = require('moment');
import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ListView,
  Switch,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modalbox';
import TimerMixin from 'react-timer-mixin';

import FeedPastComponent from './feed-past.component';
import FeedUpcomingComponent from './feed-upcoming.component';
import TabComponent from './tab.component';

import http from '../services/http.service';

import styles from '../styles/styles';

import chat from '../samples/chat';

export default class FeedUpcomingModalComponent extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      data: chat,
      dataSource: this.ds.cloneWithRows(chat),
      comment: ''
    };
  }

  componentDidMount() {
    TimerMixin.setTimeout(() => {
      _listView.scrollToEnd();
    }, 1000);
  }

  render() {
    return (
      <Modal
        isOpen={true}
        onClosed={this.props.hideModal}
        style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
        swipeArea={Dimensions.get('window').height / 2}
        swipeToClose={true}>
        <KeyboardAvoidingView
          behavior={'padding'}
          style={{ flex: 1 }}>
          <Image source={{ uri: this.props.selected.cover }} style={styles.modalImage}>
            <Text style={styles.feedText}>{this.props.selected.event}</Text>

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

          <View style={styles.modalView0}>
            <View style={styles.modalView1}>
              <Text style={styles.modalText1}>27 Following</Text>
              <View style={{ alignItems: 'center' }}>
                <Switch
                  onValueChange={(value) => this.setState({
                    selected: {
                      ...this.props.selected,
                      isFollowing: value
                    }
                  })}
                  value={this.props.selected.isFollowing} />
                <Text style={styles.modalText2}> Notifications</Text>
              </View>
            </View>

            <Text style={styles.modalText3}>{this.props.selected.detail}</Text>
            <Text style={styles.modalText4}>Comments</Text>

            {/* Comments */}
            <ListView
              dataSource={this.state.dataSource}
              ref={listView => _listView = listView}
              removeClippedSubviews={false}
              renderRow={(rowData, sectionID, rowID) => (
                <View style={styles.commentView}>
                  <Image source={{ uri: rowData.img }} style={styles.commentImage} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.comment}>{rowData.comment}</Text>
                  </View>
                </View>
              )} />

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
              style={styles.modalTextInput}
              value={this.state.comment} />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
}