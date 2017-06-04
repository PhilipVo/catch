import React, { Component } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import { NavigationActions } from 'react-navigation';

import http from '../../services/http.service';
import session from '../../services/session.service';

export default class AccountPictureComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: null,
      saving: false
    };
  }

  openPicker = () => {
    ImagePicker.openPicker({
      cropperCircleOverlay: true,
      cropping: true,
      height: 200,
      width: 200,
    }).then(image => this.setState({ path: image.path }))
      .catch(() => { });
  }

  save = () => {
    if (!this.state.saving) {
      this.setState({ saving: true });

      const formData = new FormData();
      formData.append('media', { name: 'profile', uri: this.state.path });

      http.put('/api/users/update-picture', formData)
        .then(() => {
          this.props.navigation.state.params.refreshImage();
          this.props.navigation.goBack();
        }).catch(error => {
          this.setState({ saving: false });
          Alert.alert('Error', typeof error === 'string' ? error : 'Oops, something went wrong.');
        });
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>

        {/* Header */}
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Icon
              name='angle-left'
              onPress={() => this.props.navigation.goBack()}
              size={40}
              type='font-awesome'
              underlayColor='transparent' />
          </View>
          <View style={{ flex: 10 }}>
            <Text style={styles.headerText}>Change Profile Picture</Text>
          </View>
          <View style={{ flex: 1 }} />
        </View>

        {/* Main image */}
        <View style={styles.imageView}>
          <TouchableHighlight
            onPress={this.openPicker}
            underlayColor='transparent'>
            <Image
              style={{ height: 200, width: 200, borderRadius: 100 }}
              source={{ uri: this.state.path ? this.state.path : `${http.s3}/users/${session.username}` }}>
            </Image>
          </TouchableHighlight>
          <Text onPress={this.openPicker} style={styles.blueText} underlayColor='transparent'>
            Choose from camera roll
          </Text>

          {
            this.state.path &&
            <Text onPress={this.save} style={this.state.saving ? styles.saving : styles.save}>
              {this.state.saving ? 'Saving...' : 'Save'}
            </Text>
          }

        </View>

      </View >
    );
  }
}

const styles = StyleSheet.create({
  blueText: {
    color: 'blue',
    marginTop: 20
  },
  header: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginTop: 20
  },
  headerText: {
    fontSize: 16,
    textAlign: 'center'
  },
  imageView: {
    alignItems: 'center',
    flex: 10,
    paddingTop: 50
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  save: {
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 5,
    fontWeight: 'bold',
    marginTop: 20,
    padding: 7
  },
  saving: {
    fontWeight: 'bold',
    marginTop: 20,
    padding: 7
  }
});