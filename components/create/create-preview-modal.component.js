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
import { CheckBox, Icon } from 'react-native-elements';
import Modal from 'react-native-modalbox';

import http from '../../services/http.service';

import upcoming from '../../samples/upcoming';

export default class CreatePreviewModalComponent extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      data: upcoming,
      dataSource: this.ds.cloneWithRows(upcoming),
      selected: []
    };
  }

  select = (rowData, rowID) => {
    let _data = this.state.data.slice();
    let _selected = this.state.selected.slice();

    _data[rowID].isSelected = !_data[rowID].isSelected;

    if (_data[rowID].isSelected)
      _selected.push(rowData);
    else for (let i = 0; i < this.state.selected.length; i++) {
      if (Object.is(_data[rowID], _selected[i])) {
        _selected.splice(i, 1)
        break;
      }
    }

    this.setState({
      data: _data,
      dataSource: this.ds.cloneWithRows(_data),
      selected: _selected
    });
  }

  render() {
    return (
      <Modal
        isOpen={true}
        style={{ backgroundColor: 'rgba(0,0,0,0.7)', padding: 20 }}
        swipeToClose={false}>
        <Icon
          color='white'
          name='clear'
          onPress={() => this.props.hideModal()}
          size={20}
          style={styles.clearIcon}
          underlayColor='transparent' />
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', padding: 3 }}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Create New Event</Text>
          <Icon
            color='white'
            name='arrow-right'
            type='simple-line-icon' />
        </View>
        <Text style={{ color: 'white', fontSize: 10, padding: 10, marginLeft: 20 }}>
          or add to existing event:
          </Text>
        <ListView
          dataSource={this.state.dataSource}
          removeClippedSubviews={false}
          renderRow={(rowData, sectionID, rowID) => (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
              <Text style={{ color: 'white', fontSize: 16 }}>{rowData.event}</Text>

              <CheckBox
                checked={rowData.isSelected}
                onPress={() => this.select(rowData, rowID)}
                right
                style={{ backgroundColor: 'transparent' }}
              />

            </View>
          )}
          style={{ padding: 5 }} />
        {
          this.state.selected.length > 0 ?
            <TouchableHighlight onPress={() => { }}>
              <View style={{ backgroundColor: 'rgba(0,255,0,0.3)', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 5 }}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Add to event{this.state.selected.length > 1 ? 's' : ''}</Text>
                <Icon
                  color='white'
                  name='arrow-right'
                  type='simple-line-icon' />
              </View>
            </TouchableHighlight> : null
        }
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
});