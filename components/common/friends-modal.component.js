import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  ListView,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Modal from 'react-native-modalbox';

import http from '../../services/http.service';

export default class InvitedModalComponent extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      data: [],
      dataSource: this.ds.cloneWithRows([]),
      loading: true,
    };
  }

  componentDidMount() {
    http.get(`/api/contacts/get-contacts-for-user/${this.props.username}`)
      .then(data => {
        this.setState({
          data: data,
          dataSource: this.ds.cloneWithRows(data),
          loading: false,
        });
      }).catch(error => {
        this.props.hideModal();
        Alert.alert('Error', typeof error === 'string' ? error : 'Oops, something went wrong.');
      });
  }

  render() {
    return (
      <Modal
        isOpen={true}
        onClosed={this.props.hideModal}
        style={{ borderRadius: 10, height: 500, padding: 20, width: 300 }}
        swipeToClose={false}>

        <View style={{ alignItems: 'center', flex: 10 }}>
          <Text style={{ fontSize: 16, textAlign: 'center' }}>Friends</Text>

          <View style={{
            alignSelf: 'center',
            height: 0.5,
            backgroundColor: 'black',
            marginVertical: 10,
            width: 250
          }} />

          {
            this.state.loading ?
              <ActivityIndicator /> :
              this.state.data.length > 0 ?
                <ListView
                  dataSource={this.state.dataSource}
                  removeClippedSubviews={false}
                  renderRow={(rowData, sectionID, rowID) => (
                    <Text
                      onPress={() => this.props.viewUser(rowData.contact)}
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        padding: 5,
                        textAlign: 'center'
                      }}>
                      {rowData.contact}
                    </Text>
                  )} /> :
                <Text style={{ color: 'gray', textAlign: 'center' }}>
                  No contacts found
                </Text>
          }

        </View>

        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
          <Text
            onPress={this.props.hideModal}
            style={{ borderColor: 'black', borderRadius: 5, borderWidth: 0.5, padding: 7 }}>
            Close
        </Text>
        </View>

      </Modal>
    );
  }
}