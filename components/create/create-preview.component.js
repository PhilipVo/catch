import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import http from '../../services/http.service';

export default class CreatePreviewComponent extends Component {
  componentDidMount() {
    console.log('mounted preview')
  }

  confirm() {

  }

  render() {
    return (
      <Text>{this.props.path}</Text>
      /*<Image style={styles.image0} source={{ uri: this.props.path }}>
        <View style={styles.view}>
          <TouchableHighlight underlayColor='transparent' onPress={() => { }}>
            <Image style={styles.image1} />
          </TouchableHighlight>
          <TouchableHighlight underlayColor='transparent' onPress={() => this.confirm}>
            <Image style={styles.image1} />
          </TouchableHighlight>
        </View>
      </Image>*/
    );
  }
}

const styles = StyleSheet.create({
  image0: { flex: 1 },
  image1: {
    height: 50,
    resizeMode: 'contain',
    width: 50
  },
  view: {
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  }
});
