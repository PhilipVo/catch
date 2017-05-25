import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { CheckBox, Icon } from 'react-native-elements';
import Modal from 'react-native-modalbox';
import { NavigationActions } from 'react-navigation';

import http from '../../services/http.service';

import upcoming from '../../samples/upcoming';

export default class CreatePreviewModalComponent extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      data: upcoming,
      dataSource: this.ds.cloneWithRows(upcoming)
    };
  }

  complete = (event) => {
    this.props.dispatch(NavigationActions.reset({
      actions: [
        NavigationActions.navigate({
          routeName: 'CreateCompleteComponent',
          params: { event: event }
        })
      ],
      index: 0
    }))
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
            onPress={() => this.props.navigate('CreateNewEventComponent', { story: this.props.story })}
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
          <ListView
            dataSource={this.state.dataSource}
            removeClippedSubviews={false}
            renderRow={(rowData, sectionID, rowID) => (
              <View style={styles.eventView}>
                <TouchableHighlight
                  onPress={() => this.complete(rowData)}
                  underlayColor='transparent'>
                  <Text style={styles.eventText}>{rowData.event}</Text>
                </TouchableHighlight>
                <Icon
                  color='white'
                  name='add-circle-outline'
                  onPress={() => this.complete(rowData)}
                  underlayColor='transparent' />
              </View>
            )} />
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
  topView: {
    flex: 1,
    padding: 20
  }
});