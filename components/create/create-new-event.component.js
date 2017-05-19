const moment = require('moment');
import React, { Component } from 'react';
import {
  Image,
  Keyboard,
  SegmentedControlIOS,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Icon } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class CreateNewEventComponent extends Component {
  constructor(props) {
    super(props);

    this.event = {
      audience: 0,
      cover: '',
      date: Date.now(),
      description: '',
      event: '',
    };

    this.state = {
      cover: 'images/Background.png',
      isVisible: false,
    };
  }

  openPicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 120,
      cropping: true
    }).then(image => {
      console.log(image)
      this.event.cover = image.path;
      this.setState({ cover: image.path });
    }).catch(() => { });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {/*<KeyboardAwareScrollView>*/}
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
            <TouchableHighlight onPress={this.openPicker} underlayColor='transparent'>
              <Image source={{ uri: this.state.cover }} style={styles.cover}>
                <View style={styles.coverView}>
                  <Text style={{ color: 'white' }}>Add a cover photo</Text>
                  <Icon color='white' name='add-circle-outline' />
                </View>
              </Image>
            </TouchableHighlight>

            {/* Form */}
            <View style={{ padding: 20 }}>
              {/* Event */}
              <Text style={{ fontSize: 16 }}>Event</Text>
              <TextInput
                autoCapitalize='words'
                autoCorrect={true}
                onChangeText={event => this.event.event = event}
                style={styles.textInput}
              />

              {/* Open on */}
              <TouchableHighlight
                onPress={() => this.setState({ isVisible: true })}
                underlayColor='transparent'>
                <View>
                  <Text style={{ fontSize: 16 }}>Open on</Text>
                  <TextInput
                    editable={false}
                    style={styles.textInput}
                    value={moment(this.event.date).format('MMMM D YYYY, h:mm a')} />
                </View>
              </TouchableHighlight>

              {/* Open on */}
              <DateTimePicker
                isVisible={this.state.isVisible}
                maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                minimumDate={new Date()}
                mode='datetime'
                onCancel={() => this.setState({ isVisible: false })}
                onConfirm={date => {
                  this.event.date = date;
                  this.setState({ isVisible: false });
                }} />

              {/* Who */}
              <Text style={{ fontSize: 16 }}>Who will view this?</Text>
              <SegmentedControlIOS
                onChange={event => this.event.audience = event.nativeEvent.selectedSegmentIndex}
                selectedIndex={this.event.audience}
                style={{ marginBottom: 20 }}
                tintColor='#f74434'
                values={['Public', 'Private']} />


              {/* Description */}
              <Text style={{ fontSize: 16 }}>Description</Text>
              <TextInput
                autoCapitalize='sentences'
                autoCorrect={true}
                multiline={true}
                onChangeText={description => {
                  this.event.description = description
                  console.log(this.event)
                }}
                style={styles.description} />
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
        {/*</KeyboardAwareScrollView>*/}
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  cover: {
    // backgroundColor: 'gray',
    height: 120,
    justifyContent: 'flex-end',
    marginTop: 20,
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
    fontSize: 16,
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
    textAlign: 'center',
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