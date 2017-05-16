import React, { Component } from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
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
        <StatusBar hidden={true} />

        {
          this.state.showModal ?
            <CreatePreviewModalComponent
              dispatch={this.props.navigation.dispatch}
              hideModal={() => this.setState({ showModal: false })}
              navigate={this.props.navigation.navigate}
            /> : (
              <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <Icon
                  color='white'
                  name='clear'
                  onPress={() => this.props.navigation.goBack()}
                  size={40}
                  style={styles.clearIcon}
                  underlayColor='transparent' />
                <Icon
                  color='white'
                  name='angle-right'
                  onPress={() => this.setState({ showModal: true })}
                  size={60}
                  style={styles.arrowIcon}
                  type='font-awesome'
                  underlayColor='transparent' />
              </View>
            )
        }

      </Image >
    );
  }
}

const styles = StyleSheet.create({
  arrowIcon: {
    alignSelf: 'flex-end',
    padding: 20
  },
  clearIcon: {
    alignSelf: 'flex-start',
    marginTop: 20
  }
});
