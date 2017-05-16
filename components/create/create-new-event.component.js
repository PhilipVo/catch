import React, { Component } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { h3, Icon, Text } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import TabComponent from '../common/tab.component';

export default class CreateNewEventComponent extends Component {

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAwareScrollView>
          <View style={{ marginTop: 20 }}>
            <StatusBar hidden={false} />
            <Icon
              name='angle-left'
              onPress={() => this.props.navigation.goBack()}
              size={40}
              style={{ marginLeft: 10 }}
              type='font-awesome'
              underlayColor='transparent' />
            <Text h3 style={{ textAlign: 'center' }}>Create a Catch</Text>
            <Image style={{ backgroundColor: 'gray', height: 120, justifyContent: 'flex-end', marginTop: 20 }} >
              <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end', marginRight: 10 }}>
                <Text style={{ color: 'white' }}>Add a cover photo</Text>
                <Icon color='white' name='add-circle-outline' />
              </View>
            </Image>

            {/* Form */}
            <View style={{ padding: 20 }}>
              {/* Event */}
              <Text style={{ fontSize: 16 }}>Event</Text>
              <TextInput style={{ height: 30, borderWidth: 0.5, borderColor: 'gray', marginBottom: 20, padding: 5 }} />

              {/* Open on */}
              <Text style={{ fontSize: 16 }}>Open on</Text>
              <View style={{ alignItems: 'center', flexDirection: 'row', marginBottom: 10 }}>
                <TextInput style={{ height: 30, borderWidth: 0.5, borderColor: 'gray', padding: 5, width: 80 }} />
                <Text> : </Text>
                <TextInput style={{ height: 30, borderWidth: 0.5, borderColor: 'gray', padding: 5, width: 80 }} />
                <TextInput style={{ height: 30, borderWidth: 0.5, borderColor: 'gray', marginLeft: 12, padding: 5, width: 80 }} />
              </View>
              <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                <TextInput style={{ height: 30, borderWidth: 0.5, borderColor: 'gray', padding: 5, width: 80 }} />
                <TextInput style={{ height: 30, borderWidth: 0.5, borderColor: 'gray', marginLeft: 12, padding: 5, width: 80 }} />
                <View />
              </View>


              {/* Who */}
              <Text style={{ fontSize: 16 }}>Who will view this?</Text>
              <TextInput style={{ height: 30, borderWidth: 0.5, borderColor: 'gray', marginBottom: 20, padding: 5 }} />


              {/* Description */}
              <Text style={{ fontSize: 16 }}>Description</Text>
              <TextInput multiline={true} style={{ height: 60, borderWidth: 0.5, borderColor: 'gray', marginBottom: 20, padding: 5 }} />

              {/* Invite */}
              <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Text style={{ fontSize: 20 }}>Invite Contributors  </Text>
                <Icon
                  name='angle-right'
                  onPress={() => { }}
                  size={40}
                  type='font-awesome'
                  underlayColor='transparent' />
              </View>

            </View>
          </View>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({

});