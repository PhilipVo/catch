import React, { Component } from 'react';
import {
  Alert,
  ListView,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { Divider, Icon } from 'react-native-elements';
import Modal from 'react-native-modalbox';
// import { ProcessingManager } from 'react-native-video-processing';
import { NavigationActions } from 'react-navigation';

import http from '../../services/http.service';
import s3 from '../../services/s3.service';
import session from '../../services/session.service';

export default class CreatePreviewModalComponent extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.events),
      saving: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ dataSource: this.ds.cloneWithRows(nextProps.events) });
  }

  complete = event => {
    if (!this.state.saving) {
      this.setState({ saving: true });

      event.isVideo = this.props.isVideo;
      http.post('/api/stories/', JSON.stringify(event))
        .then(storyId => {
          // Upload story:
          const file = {
            name: storyId,
            type: this.props.isVideo ? 'video/mp4' : 'image/jpeg',
            uri: this.props.story
          };

          s3.put(file, `events/${event.id}/`).catch(error => { throw error });

          if (event.username !== session.username)
            socket.emit('contributed', {
              contributor: session.username,
              creator: event.username,
              title: event.title
            });

          this.props.dispatch(NavigationActions.reset({
            actions: [
              NavigationActions.navigate({
                routeName: 'CreateCompleteComponent',
                params: { event: event }
              })
            ],
            index: 0
          }));
        }).catch((error) => {
          console.log(error)
          Alert.alert('Error', typeof error === 'string' ? error : 'Oops, something went wrong.');
        });
    }
  }

  next = () => {
    this.props.pause();
    this.props.navigate('CreateNewEventComponent', {
      duration: this.props.duration,
      isVideo: this.props.isVideo,
      play: this.props.play,
      story: this.props.story
    });
  }

  render() {
    return (
      <Modal
        isOpen={true}
        style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
        swipeToClose={false}>
        <View style={styles.topView}>
          <Icon
            color='white'
            name='clear'
            onPress={() => this.props.hideModal()}
            size={20}
            style={{ alignSelf: 'flex-start' }}
            underlayColor='transparent' />
          <TouchableHighlight
            onPress={this.next}
            underlayColor='transparent'>
            <View style={styles.newEventView}>
              <Text style={styles.newEventText}>Create New Event</Text>
              <Icon
                color='white'
                name='arrow-right'
                type='simple-line-icon'
                underlayColor='transparent' />
            </View>
          </TouchableHighlight>
          <Text style={styles.existingEventText}>
            or add to existing event:
          </Text>
        </View>
        <View style={styles.bottomView}>

          {
            this.state.saving &&
            <Text style={styles.noEvents}>Saving...</Text>
          }

          {
            this.props.events.length > 0 ?
              <ListView
                dataSource={this.state.dataSource}
                removeClippedSubviews={false}
                renderRow={(rowData, sectionID, rowID) => (
                  rowData.isBreak && rowID != 0 && rowID != this.props.events.length - 1 ?
                    <Divider style={styles.divider} /> :
                    rowData.isBreak ? null :
                      <View style={styles.eventView}>
                        <TouchableHighlight
                          onPress={() => this.complete(rowData)}
                          underlayColor='transparent'>
                          <Text style={styles.eventText}>{rowData.title}</Text>
                        </TouchableHighlight>
                        <Icon
                          color='white'
                          name='add-circle-outline'
                          onPress={() => this.complete(rowData)}
                          underlayColor='transparent' />
                      </View>
                )} /> :
              <Text style={styles.noEvents}>No existing events found</Text>
          }

        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  bottomView: {
    flex: 11,
    padding: 20
  },
  divider: {
    backgroundColor: 'white',
    height: 0.5,
    marginVertical: 10
  },
  eventText: {
    color: 'white',
    fontSize: 16
  },
  eventView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5
  },
  existingEventText: {
    color: 'white',
    fontSize: 10,
    marginLeft: 20,
    padding: 10
  },
  newEventView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 3
  },
  newEventText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  noEvents: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
  topView: {
    flex: 1,
    padding: 20
  }
});