import React, { Component } from 'react';
import { Image, TouchableHighlight, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';

import styles from '../styles/styles'

export default class ProfileSettingsComponent extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>

        {/* Header */}
        <View style={styles.profileHeader}>
          <View style={{ flex: 1 }}>
            <Icon
              name='keyboard-arrow-left'
              onPress={() => this.props.setView('default')}
              size={40} />
          </View>
          <View style={{ flex: 10 }}>
            <Text style={styles.profileText}>Settings</Text>
          </View>
          <View style={{ flex: 1 }} />
        </View>

      </View>
    );
  }
}