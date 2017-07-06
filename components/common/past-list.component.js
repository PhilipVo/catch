////////////////////////////////////////////////////////////
//                PastListComponent
//  List of past events. Used in AccountComponent,
//  FeedComponent, and ProfileComponent.
// 
//                Required screenProps
//  loading: boolean for ActivityIndicator
//  past: array of past events
////////////////////////////////////////////////////////////

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

export default class PastListComponent extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = { dataSource: this.ds.cloneWithRows(this.props.screenProps.past) };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.ds.cloneWithRows(nextProps.screenProps.past),
      now: Date.now()
    });
  }

  render() {
    return (
      this.props.screenProps.loading ?
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator style={{ alignSelf: 'center' }} />
        </View> :
        this.props.screenProps.past.length > 0 ?
          <ListView
            dataSource={this.state.dataSource}
            removeClippedSubviews={false}
            renderRow={(rowData, sectionID, rowID) => (
              <TouchableHighlight
                onPress={() => this.props.screenProps.setEvent('past', rowData)}
                underlayColor='transparent'>
                <Image
                  source={{ uri: `${http.s3}/events/${rowData.id}/cover` }}
                  style={styles.image}>
                  <Text style={styles.timer}>
                    {moment(rowData.date).fromNow().toString()}
                  </Text>
                  <View style={styles.view}>
                    <Text style={styles.text}>{rowData.title}</Text>
                    <Icon color='white' name='play-circle-outline' size={33} />
                  </View>
                </Image>
              </TouchableHighlight>
            )}
            style={{ flex: 1 }}
          /> :
          <View style={{ marginTop: 20 }}>
            <Text style={styles.grayText}>No past events found</Text>
          </View>
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