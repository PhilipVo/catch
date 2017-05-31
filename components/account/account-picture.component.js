import React, { Component } from 'react';
import {
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
    this.state = { path: null };
  }

  openPicker = () => {
    ImagePicker.openPicker({
      cropperCircleOverlay: true,
      cropping: true,
      height: 200,
      width: 200,
    })
      .then(image => this.setState({ path: image.path }))
      .catch(() => { });
  }

  save = () => {
    const formData = new FormData();
    formData.append('media', { name: 'profile', uri: this.state.path });

    http.put('/api/users/update-picture', formData)
      .then(() => {
        this.props.navigation.dispatch(NavigationActions.reset({
          actions: [
            NavigationActions.navigate({
              routeName: 'AccountComponent'
            })
          ],
          index: 0
        }));
      }).catch(error => { console.log(error) });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>

        {/* Header */}
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Icon
              name='keyboard-arrow-left'
              onPress={() => this.props.navigation.goBack()}
              size={40}
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

          {this.state.path && <Text onPress={this.save} style={styles.save}>Save</Text>}

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
    flex: 1,
    flexDirection: 'row',
    paddingTop: 20
  },
  headerText: {
    flex: 1,
    fontSize: 16,
    marginTop: 10,
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
    marginTop: 20, padding: 10
  }
});