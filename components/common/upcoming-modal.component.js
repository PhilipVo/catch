const moment = require('moment');
import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ListView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modalbox';
import TimerMixin from 'react-timer-mixin';

import TabComponent from '../common/tab.component';

import http from '../../services/http.service';

import chat from '../../samples/chat';

export default class UpcomingModalComponent extends Component {
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
        <StatusBar hidden={true} />
        <KeyboardAvoidingView
          behavior={'padding'}
          style={{ flex: 1 }}>
          <Image source={{ uri: this.props.selected.cover }} style={styles.mainImage}>
            <Text style={styles.eventText}>{this.props.selected.event}</Text>

            {/* Timer */}
            <View style={{ flexDirection: 'row' }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.timerText}>
                  {moment(this.props.selected.date).diff(Date.now(), 'days')}
                </Text>
                <Text style={styles.timerText}>Days</Text>
              </View>
              <Text style={styles.timerText}>:</Text>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.timerText}>
                  {moment(this.props.selected.date).diff(Date.now(), 'hours') % 24}
                </Text>
                <Text style={styles.timerText}>Hrs</Text>
              </View>
              <Text style={styles.timerText}>:</Text>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.timerText}>
                  {moment(this.props.selected.date).diff(Date.now(), 'minutes') % 60}
                </Text>
                <Text style={styles.timerText}>Mins</Text>
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
                  <TouchableHighlight
                    onPress={() => this.props.navigate('ProfileComponent', {
                      tabBar: this.props.tabBar,
                      username: rowData.username
                    })}>
                    <Image source={{ uri: rowData.img }} style={styles.commentImage} />
                  </TouchableHighlight>
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

const styles = StyleSheet.create({
  comment: {
    backgroundColor: 'white',
    flex: 1,
    minHeight: 50,
    padding: 10
  },
  commentImage: {
    height: 50,
    width: 50
  },
  commentView: {
    flex: 1,
    flexDirection: 'row',
    padding: 2
  },
  eventText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 5,
    textShadowColor: 'black',
    textShadowOffset: { width: 0.5, height: 0.5 }
  },
  mainImage: {
    alignItems: 'flex-end',
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modalText1: {
    color: 'white',
    fontSize: 12
  },
  modalText2: {
    color: 'white',
    fontSize: 10
  },
  modalText3: {
    color: 'white',
    fontSize: 16,
    padding: 5
  },
  modalText4: {
    color: 'white',
    fontSize: 12,
    marginTop: 10
  },
  modalTextInput: {
    backgroundColor: 'white',
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 1,
    height: 40,
    marginTop: 5,
    padding: 10
  },
  modalView0: {
    flex: 3,
    padding: 20
  },
  modalView1: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  timerText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: { width: 0.5, height: 0.5 }
  }
});