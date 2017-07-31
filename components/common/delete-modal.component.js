import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Modal from 'react-native-modalbox';

import http from '../../services/http.service';

export default class DeleteModalComponent extends Component {
  deleteEvent = () => {
    http.delete(`/api/events/${this.props.event.id}`)
      .then(() => {
        this.props.onDelete();
        this.props.hideModal();
      }).catch(error => { })
  }

  render() {
    return (
      <Modal
        isOpen={true}
        onClosed={this.props.hideModal}
        style={{ borderRadius: 10, height: 200, padding: 20, width: 300 }}
        swipeToClose={false}>

        <Text style={{ fontSize: 16, marginBottom: 20, textAlign: 'center' }}>
          Are you sure you would like to cancel {this.props.event.title}?
        </Text>

        <TouchableHighlight
          style={{
            alignItems: 'center',
            backgroundColor: '#f74434',
            borderRadius: 5,
            height: 40,
            justifyContent: 'center',
            marginBottom: 10
          }}
          onPress={this.props.hideModal}
          underlayColor='#f74434'>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            No
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={{
            alignItems: 'center',
            backgroundColor: 'transparent',
            borderRadius: 5,
            borderWidth: 0.5,
            height: 40,
            justifyContent: 'center'
          }}
          onPress={this.deleteEvent}
          underlayColor='transparent'>
          <Text style={{ color: '#f74434', fontWeight: 'bold' }}>
            Yes :(
          </Text>
        </TouchableHighlight>

      </Modal>
    );
  }
}