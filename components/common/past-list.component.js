const moment = require('moment');
import React, { Component } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';

import http from '../../services/http.service';

export default class PastListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.screenProps.past,
      refreshing: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.screenProps.past,
      now: Date.now()
    });
  }

  onRefresh = () => {
    if (!this.state.refreshing) {
      this.setState({ refreshing: true });
      this.props.screenProps.onRefresh()
        .then(() => {
          this.setState({
            now: Date.now(),
            refreshing: false
          });
        }).catch(() => this.setState({ refreshing: false }));
    }
  }

  render() {
    return (
      this.props.screenProps.loading ?
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator style={{ alignSelf: 'center' }} />
        </View> :
        this.props.screenProps.past.length > 0 ?
          <FlatList
            data={this.state.data}
            extraData={this.state}
            keyExtractor={(item, index) => index}
            refreshControl={
              <RefreshControl
                enabled={!this.state.refreshing}
                onRefresh={this.onRefresh}
                refreshing={this.state.refreshing}
                size={RefreshControl.SIZE.SMALL} />
            }
            removeClippedSubviews={false}
            renderItem={({ item }) => (
              <TouchableHighlight
                onPress={() => this.props.screenProps.setEvent('past', item)}
                underlayColor='transparent'>
                <Image
                  source={{ uri: `${http.s3}/events/${item.id}/cover` }}
                  style={styles.image}>
                  <Text style={styles.timer}>
                    {moment(item.date).fromNow().toString()}
                  </Text>
                  <View style={styles.view}>
                    <Text style={styles.text}>{item.title}</Text>
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