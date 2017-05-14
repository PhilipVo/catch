import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';

import CreatePreviewModalComponent from './create-preview-modal.component';

import http from '../../services/http.service';

export default class CreatePreviewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <Image style={{ flex: 1 }} source={{ uri: params.path }}>
        <Icon
          color='white'
          name='clear'
          onPress={() => this.props.navigation.goBack()}
          size={40}
          style={styles.clearIcon}
          underlayColor='transparent' />

        {
          this.state.showModal ?
            <CreatePreviewModalComponent
              hideModal={() => this.setState({ showModal: false })}
              navigate={this.props.navigation.navigate}
            /> :
            <Icon
              color='white'
              containerStyle={styles.arrowIcon}
              name='angle-right'
              onPress={() => this.setState({ showModal: true })}
              size={60}
              type='font-awesome'
              underlayColor='transparent' />
        }
      </Image >
    );
  }
}

const styles = StyleSheet.create({
  arrowIcon: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20
  },
  clearIcon: {
    alignSelf: 'flex-start',
    paddingTop: 20
  }
});
