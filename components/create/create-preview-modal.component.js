const moment = require('moment');
import React, { Component } from 'react';
import {
  ListView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modalbox';

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

  render() {
    return (
      <Modal
        isOpen={true}
        style={{ backgroundColor: 'rgba(0,0,0,0.7)', padding: 20 }}
        swipeToClose={false}>
        <StatusBar hidden={true} />
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', padding: 3 }}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Create New Event</Text>
          <Icon
            color='white'
            name='arrow-right'
            onPress={() => { }}
            type='simple-line-icon' />
        </View>
        <Text style={{ color: 'white', fontSize: 10, padding: 10, marginLeft: 20 }}>or add to existing event:</Text>
        <ListView
          dataSource={this.state.dataSource}
          removeClippedSubviews={false}
          renderRow={(rowData, sectionID, rowID) => (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
              <Text style={{ color: 'white', fontSize: 16 }}>{rowData.event}</Text>
              <Icon
                color='white'
                name='plus'
                onPress={() => { }}
                type='simple-line-icon' />
            </View>
          )} />
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
});