import React, { Component } from 'react';
import {
  Image,
  Keyboard,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { h3, Icon, Text } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class CreateNewEventComponent extends Component {
  constructor(props) {
    super(props);
    this.event = {

    };
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAwareScrollView>
          <View style={{ flex: 1 }}>
            <StatusBar hidden={false} />

            {/* Header */}
            <View style={{ alignItems: 'center', flex: 1, flexDirection: 'row', marginTop: 20 }}>
              <View style={{ flex: 1 }}>
                <Icon
                  name='angle-left'
                  onPress={() => this.props.navigation.goBack()}
                  size={40}
                  style={{ marginLeft: 10 }}
                  type='font-awesome'
                  underlayColor='transparent' />
              </View>
              <View style={{ flex: 10 }}>
                <Text style={{ fontSize: 20, textAlign: 'center' }}>Create a Catch</Text>
              </View>
              <View style={{ flex: 1 }}>
              </View>
            </View>

            {/* Body */}
            <View style={{ flex: 10 }}>

              {/* Cover photo */}
              <Image style={styles.cover} >
                <View style={styles.coverView}>
                  <Text style={{ color: 'white' }}>Add a cover photo</Text>
                  <Icon color='white' name='add-circle-outline' />
                </View>
              </Image>

              {/* Form */}
              <View style={{ padding: 20 }}>
                {/* Event */}
                <Text style={{ fontSize: 16 }}>Event</Text>
                <TextInput style={styles.textInput} />

                {/* Open on */}
                <Text style={{ fontSize: 16 }}>Open on</Text>
                <View style={styles.timeView}>
                  <TextInput style={styles.timeInput1} />
                  <Text> : </Text>
                  <TextInput style={styles.timeInput1} />
                  <TextInput style={styles.timeInput2} />
                </View>
                <View style={styles.dateView}>
                  <TextInput style={styles.timeInput1} />
                  <TextInput style={styles.timeInput2} />
                  <View />
                </View>


                {/* Who */}
                <Text style={{ fontSize: 16 }}>Who will view this?</Text>
                <TextInput style={styles.textInput} />


                {/* Description */}
                <Text style={{ fontSize: 16 }}>Description</Text>
                <TextInput multiline={true} style={styles.description} />
              </View>

            </View>

            {/*Footer*/}
            <View style={styles.invite}>
              <Text
                onPress={() =>
                  this.props.navigation.navigate('CreateInviteComponent', { event: this.state })}
                style={{ fontSize: 20 }}>
                {'Invite Contributors  '}
              </Text>
              <Icon
                name='angle-right'
                onPress={() =>
                  this.props.navigation.navigate('CreateInviteComponent', { event: this.state })}
                size={40}
                type='font-awesome'
                underlayColor='transparent' />
            </View>

          </View>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  cover: {
    backgroundColor: 'gray',
    height: 120,
    justifyContent: 'flex-end',
    marginTop: 20
  },
  coverView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10
  },
  dateView: {
    flexDirection: 'row',
    marginBottom: 20
  },
  description: {
    borderColor: 'gray',
    borderWidth: 0.5,
    height: 60,
    marginBottom: 20,
    padding: 5
  },
  invite: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 20
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 0.5,
    height: 30,
    marginBottom: 20,
    padding: 5
  },
  timeInput1: {
    borderColor: 'gray',
    borderWidth: 0.5,
    height: 30,
    padding: 5,
    width: 80
  },
  timeInput2: {
    borderColor: 'gray',
    borderWidth: 0.5,
    height: 30,
    marginLeft: 12,
    padding: 5,
    width: 80
  },
  timeView: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10
  },
});