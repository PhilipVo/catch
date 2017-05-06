import React, { Component } from 'react';
import { Image, StyleSheet, TouchableHighlight, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';

export default class AccountSettingsComponent extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>

        {/* Header */}
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Icon
              name='keyboard-arrow-left'
              onPress={this.props.accountNavigator.pop}
              size={40} />
          </View>
          <View style={{ flex: 10 }}>
            <Text style={styles.text}>Settings</Text>
          </View>
          <View style={{ flex: 1 }} />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  text: {
    fontSize: 16,
    textAlign: 'center'
  }
});