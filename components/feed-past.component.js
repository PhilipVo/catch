import React, { Component } from 'react';
import {
  Image,
  ListView,
  Text,
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';

import http from '../services/http.service';

import past from '../samples/past';

export default class FeedPastComponent extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      data: past,
      dataSource: ds.cloneWithRows(past),
    };
  }

  componentDidMount() {
    console.log('mounted feed');
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        removeClippedSubviews={false}
        renderRow={(rowData, sectionID, rowID) => (
          <TouchableHighlight
            onPress={() => this.props.setSelected(rowData)}
            underlayColor='transparent'>
            <Image source={{ uri: rowData.cover }} style={styles.image}>
              <Text style={styles.text}>{rowData.event}</Text>
              <Icon color='white' name='play-circle-outline' size={33} />
            </Image>
          </TouchableHighlight>)
        }
        style={this.props.style}
      />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    height: 120,
    justifyContent: 'space-between'
  },
  text: { // Used in multiple files
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 5,
    textShadowColor: 'black',
    textShadowOffset: { width: 0.5, height: 0.5 }
  }
});