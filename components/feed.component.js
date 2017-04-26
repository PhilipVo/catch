const moment = require('moment');
import React, { Component } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ListView,
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

export default class FeedComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      isOpen: false,
      selected: null,
      tab: 'upcoming'
    };
  }

  componentDidMount() {
    console.log('mounted feed');
  }

  render() {
    return (
      <View style={{ flex: 1, position: 'relative' }}>
        <View style={styles.avoidTop}>
          <View style={{ flex: 11 }}>
            <Text style={styles.header}>Catch</Text>

            {/* Tab bar */}
            <View style={styles.feedTab}>
              <TouchableHighlight
                onPress={() => this.setState({ tab: 'upcoming' })}
                style={this.state.tab === 'upcoming' ?
                  styles.activeTab : { flex: 1 }}
                underlayColor='transparent'>
                <Text style={this.state.tab === 'upcoming' ?
                  styles.activeTabText : { textAlign: 'center' }}>Upcoming</Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => this.setState({ tab: 'past' })}
                style={this.state.tab === 'past' ? styles.activeTab : { flex: 1 }}
                underlayColor='transparent'>
                <Text style={this.state.tab === 'past' ?
                  styles.activeTabText : { textAlign: 'center' }}>Past</Text>
              </TouchableHighlight>
            </View>

            <FeedUpcomingComponent
              setSelected={selected => this.setState({
                isOpen: true,
                selected: selected
              })}
              style={this.state.tab === 'upcoming' ? null : { display: 'none' }} />
            <FeedPastComponent
              style={this.state.tab === 'past' ? null : { display: 'none' }} />

          </View>
          <TabComponent navigator={this.props.navigator} tab='feed' />
        </View>
        {
          this.state.isOpen ?
            <Modal
              animationDuration={0}
              isOpen={this.state.isOpen}
              swipeToClose={false}
              style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
              <Icon
                color='white'
                name='close'
                onPress={() => this.setState({ isOpen: false })}
                size={40}
                style={{
                  alignSelf: 'flex-start',
                  marginTop: 10

                }} />
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                  behavior={'padding'}
                  style={{ flex: 1 }}
                >
                  <Image source={{ uri: this.state.selected.cover }} style={{
                    alignItems: 'flex-end',
                    flexDirection: 'row',
                    height: 200,
                    justifyContent: 'space-between'
                  }}>
                    <Text style={styles.feedText}>{this.state.selected.event}</Text>
                    {/*<Icon color='white' name='play-circle-outline' size={33} />*/}

                    {/* Timer */}
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ alignItems: 'center' }}>
                        <Text style={styles.feedTimerText}>
                          {moment(this.state.selected.date).diff(Date.now(), 'days')}
                        </Text>
                        <Text style={styles.feedTimerText}>Days</Text>
                      </View>
                      <Text style={styles.feedTimerText}>:</Text>
                      <View style={{ alignItems: 'center' }}>
                        <Text style={styles.feedTimerText}>
                          {moment(this.state.selected.date).diff(Date.now(), 'hours') % 24}
                        </Text>
                        <Text style={styles.feedTimerText}>Hrs</Text>
                      </View>
                      <Text style={styles.feedTimerText}>:</Text>
                      <View style={{ alignItems: 'center' }}>
                        <Text style={styles.feedTimerText}>
                          {moment(this.state.selected.date).diff(Date.now(), 'minutes') % 60}
                        </Text>
                        <Text style={styles.feedTimerText}>Mins</Text>
                      </View>
                    </View>
                  </Image>
                  <View style={{ flex: 1, padding: 20 }}>
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
                              ...this.state.selected,
                              isFollowing: value
                            }
                          })}
                          value={this.state.selected.isFollowing} />
                        <Text style={{ color: 'white', fontSize: 10 }}> Notifications</Text>
                      </View>
                    </View>

                    <Text style={{ color: 'white', fontSize: 16, padding: 5 }}>{this.state.selected.detail}</Text>
                    <Text style={{ color: 'white', fontSize: 12, marginTop: 10 }}>Comments</Text>
                    <View>
                      <View style={{ flexDirection: 'row', height: 50, padding: 2 }}>
                        <Image
                          source={{ uri: 'http://static.comicvine.com/uploads/scale_small/10/101435/2118157-jj.jpg' }}
                          style={{
                            width: 50
                          }}
                        />
                        <View style={{
                          backgroundColor: 'rgba(255,255,255,1)', justifyContent: 'center'
                        }}>
                          <Text style={{ backgroundColor: 'transparent', padding: 10 }}>You're hot!</Text>
                        </View>
                      </View>

                      <View style={{ flexDirection: 'row', height: 50, padding: 2 }}>
                        <Image
                          source={{ uri: 'http://static.comicvine.com/uploads/scale_small/10/101435/2118157-jj.jpg' }}
                          style={{
                            width: 50
                          }}
                        />
                        <View style={{
                          backgroundColor: 'rgba(255,255,255,1)', justifyContent: 'center'
                        }}>
                          <Text style={{ backgroundColor: 'transparent', padding: 10 }}>You're hot!</Text>
                        </View>
                      </View>

                      <View style={{ flexDirection: 'row', height: 50, padding: 2 }}>
                        <Image
                          source={{ uri: 'http://static.comicvine.com/uploads/scale_small/10/101435/2118157-jj.jpg' }}
                          style={{
                            width: 50
                          }}
                        />
                        <View style={{
                          backgroundColor: 'rgba(255,255,255,1)', justifyContent: 'center'
                        }}>
                          <Text style={{ backgroundColor: 'transparent', padding: 10 }}>You're hot!</Text>
                        </View>
                      </View>

                    </View>

                    <TextInput
                      autoCapitalize='sentences'
                      autoCorrect={true}
                      maxLength={120}
                      onChangeText={(comment) => this.setState({ comment: comment })}
                      onSubmitEditing={() => this.setState({ comment: '' })}
                      placeholder='comment'
                      returnKeyType='send'
                      style={{
                        height: 40,
                        borderColor: 'black',
                        borderWidth: 1,
                        backgroundColor: 'rgba(255,255,255,1)',
                        padding: 10
                      }}
                      value={this.state.comment} />

                  </View>
                </KeyboardAvoidingView>
              </TouchableWithoutFeedback>
            </Modal> : null
        }
      </View>
    );
  }
}