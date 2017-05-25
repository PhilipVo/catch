const moment = require('moment');
import React, { Component } from 'react';
import {
  ActivityIndicator,
  Image,
  ListView,
  Text,
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';

import http from '../../services/http.service';

import past from '../../samples/past';

export default class PastListComponent extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      data: [],
      dataSource: ds.cloneWithRows(past),
      loading: false
    };
  }

  componentDidMount() {
    console.log('mounted past')
  }
  componentWillUnmount() {
    console.log('unmounted past')
  }

  render() {
    return (
      <ActivityIndicator style={{ alignSelf: 'center' }} />
    );
  }
}

const styles = StyleSheet.create({
  grayText: {
    color: 'gray',
    textAlign: 'center'
  },
  image: {
    height: 120,
    justifyContent: 'space-between'
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 5,
    textShadowColor: 'black',
    textShadowOffset: { width: 0.5, height: 0.5 }
  },
  timer: {
    alignSelf: 'flex-end',
    color: 'white',
    fontWeight: 'bold',
    paddingRight: 5,
    textShadowColor: 'black',
    textShadowOffset: { width: 0.5, height: 0.5 }
  },
  view: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});