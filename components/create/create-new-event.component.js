const moment = require('moment');
import React, { Component } from 'react';
import {
  Dimensions,
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
      cover: '',
      isVisible: false,
    };
  }

  openPicker = () => {
    ImagePicker.openPicker({
      cropping: true,
      height: 120,
      width: Dimensions.get('window').width,
    }).then(image => {
      this.event.cover = image.path;
      this.setState({ cover: image.path });
    }).catch(() => { });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAwareScrollView>
          <View style={{ flex: 1 }}>
            <StatusBar hidden={false} />

            {/* Header */}
            <View style={styles.header}>
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
                <Text style={styles.headerText}>Create a Catch</Text>
              </View>
              <View style={{ flex: 1 }}>
              </View>
            </View>

            {/* Body */}
            <View style={{ flex: 10 }}>

              {/* Cover photo */}
              <TouchableHighlight onPress={this.openPicker} underlayColor='transparent'>
                <Image
                  source={this.state.cover ? { uri: this.state.cover } :
                    require('../../images/Background.png')}
                  style={styles.cover}>
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
                    this.event.date = new Date(date).getTime();
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
                  onChangeText={description => this.event.description = description}
                  style={styles.description} />
              </View>

            </View>

            {/*Footer*/}
            <View style={styles.footer}>
              <Text
                onPress={() =>
                  this.props.navigation.navigate('CreateInviteComponent', { event: this.event })}
                style={{ fontSize: 20 }}>
                {'Invite Contributors  '}
              </Text>
              <Icon
                name='angle-right'
                onPress={() =>
                  this.props.navigation.navigate('CreateInviteComponent', { event: this.event })}
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
    // backgroundColor: 'gray',
    height: 120,
    justifyContent: 'flex-end',
    marginTop: 20,
    width: Dimensions.get('window').width
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
    height: 100,
    marginBottom: 20,
    padding: 5
  },
  header: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginTop: 20
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center'
  },
  footer: {
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