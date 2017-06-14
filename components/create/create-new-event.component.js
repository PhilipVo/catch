const moment = require('moment');
import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  Platform,
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
import SegmentedControlTab from 'react-native-segmented-control-tab';

export default class CreateNewEventComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      audience: 0,
      cover: null,
      coverError: false,
      date: new Date(new Date().setDate(new Date().getDate() + 1)).getTime(),
      description: '',
      isVisible: false,
      title: '',
      titleError: false,
    };
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      this.segment = <SegmentedControlTab
        onTabPress={index => this.state.audience = index}
        selectedIndex={this.state.audience}
        style={{ marginBottom: 20 }}
        tintColor='#f74434'
        values={['Public', 'Private']}
      />;
    } else if (Platform.OS === 'ios') {
      this.segment = <SegmentedControlIOS
        onChange={event => this.state.audience = event.nativeEvent.selectedSegmentIndex}
        selectedIndex={this.state.audience}
        style={{ marginBottom: 20 }}
        tintColor='#f74434'
        values={['Public', 'Private']} />;
    }
  }

  goBack = () => {
    this.props.navigation.state.params.play();
    this.props.navigation.goBack();
  }

  invite = () => {
    this.setState({
      coverError: false,
      titleError: false
    });

    if (!this.state.cover)
      return this.setState({ coverError: true });

    if (this.state.title.length === 0)
      return this.setState({ titleError: true });

    this.props.navigation.navigate('CreateInviteComponent', {
      event: {
        audience: this.state.audience,
        cover: this.state.cover,
        date: this.state.date,
        description: this.state.description,
        story: this.props.navigation.state.params ?
          this.props.navigation.state.params.story : null,
        title: this.state.title
      }
    });
  }

  openPicker = () => {
    ImagePicker.openPicker({
      cropping: true,
      height: 120,
      width: Dimensions.get('window').width,
    })
      .then(image => this.setState({ cover: image.path }))
      .catch(() => { });
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
                  onPress={this.goBack}
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
                    <Text style={this.state.coverError ?
                      styles.coverError : { color: 'white' }}>
                      Add a cover photo
                      </Text>
                    <Icon
                      color={this.state.coverError ? 'red' : 'white'}
                      name='add-circle-outline' />
                  </View>
                </Image>
              </TouchableHighlight>

              {/* Form */}
              <View style={{ padding: 20 }}>
                {/* Title */}
                <Text style={this.state.titleError ?
                  styles.titleError : { fontSize: 16 }}>
                  Event
                  </Text>
                <TextInput
                  autoCapitalize='words'
                  autoCorrect={true}
                  maxLength={32}
                  onChangeText={title => this.setState({ title: title })}
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
                      value={moment(this.state.date).format('MMMM D YYYY, h:mm a')} />
                  </View>
                </TouchableHighlight>

                <DateTimePicker
                  isVisible={this.state.isVisible}
                  maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                  minimumDate={new Date(new Date().setDate(new Date().getDate() + 1))}
                  mode='datetime'
                  onCancel={() => this.setState({ isVisible: false })}
                  onConfirm={date => this.setState({
                    date: new Date(date).getTime(),
                    isVisible: false
                  })} />

                {/* Who */}
                <Text style={{ fontSize: 16 }}>Who will view this?</Text>
                {this.segment}


                {/* Description */}
                <Text style={{ fontSize: 16 }}>Description</Text>
                <TextInput
                  autoCapitalize='sentences'
                  autoCorrect={true}
                  maxLength={120}
                  multiline={true}
                  onChangeText={description => {
                    this.setState({ description: description });
                    console.log(this.state)
                  }}
                  style={styles.description} />
                <Text style={{ color: 'gray', textAlign: 'right' }}>{120 - this.state.description.length} characters remaining</Text>
              </View>

            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text
                onPress={this.invite}
                style={{ fontSize: 20 }}
                underlayColor='transparent' >
                {'Invite Contributors  '}
              </Text>
              <Icon
                name='angle-right'
                onPress={this.invite}
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
  coverError: {
    color: 'red',
    fontWeight: 'bold'
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
  titleError: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold'
  }
});