import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native';
import { Icon, Text } from 'react-native-elements';

export default class AccountPictureComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { avatar: 'https://geo-media.beatport.com/image/8802230.jpg' };
  }

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
            <Text style={styles.headerText}>Change Profile Picture</Text>
          </View>
          <View style={{ flex: 1 }} />
        </View>

        {/* Main image */}
        <View style={styles.image}>
          <Image style={{ flex: 1 }} source={{ uri: this.state.avatar }}>
          </Image>
        </View>

        {/* Camera roll */}
        <View style={{ flex: 4 }}>
          <View style={styles.row}>
            <TouchableHighlight
              style={{ flex: 1 }}
              onPress={
                () => this.setState({ avatar: 'http://images2.gazzettaobjects.it/methode_image/2014/12/25/Calcio/Foto%20Gallery/vieri05_mediagallery-fullscreen.jpg' })}>
              <Image
                style={{ flex: 1 }}
                source={{ uri: 'http://images2.gazzettaobjects.it/methode_image/2014/12/25/Calcio/Foto%20Gallery/vieri05_mediagallery-fullscreen.jpg' }} />
            </TouchableHighlight>
            <TouchableHighlight
              style={{ flex: 1 }}
              onPress={
                () => this.setState({ avatar: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSxSFc5pV18zBgkCealSoPVQi3oNy71G7zqyJiemS5atP9fCqJI' })}>
              <Image
                style={{ flex: 1 }}
                source={{ uri: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSxSFc5pV18zBgkCealSoPVQi3oNy71G7zqyJiemS5atP9fCqJI' }} />
            </TouchableHighlight>
            <TouchableHighlight
              style={{ flex: 1 }}
              onPress={
                () => this.setState({ avatar: 'https://pbs.twimg.com/media/BwXoU63CIAAfPCj.jpg' })}>
              <Image
                style={{ flex: 1 }}
                source={{ uri: 'https://pbs.twimg.com/media/BwXoU63CIAAfPCj.jpg' }} />
            </TouchableHighlight>
          </View>

          <View style={styles.row}>
            <TouchableHighlight
              style={{ flex: 1 }}
              onPress={
                () => this.setState({ avatar: 'https://s-media-cache-ak0.pinimg.com/originals/52/82/d2/5282d2575aeb219ad169c2cf3759724e.png' })}>
              <Image
                style={{ flex: 1 }}
                source={{ uri: 'https://s-media-cache-ak0.pinimg.com/originals/52/82/d2/5282d2575aeb219ad169c2cf3759724e.png' }} />
            </TouchableHighlight>
            <TouchableHighlight
              style={{ flex: 1 }}
              onPress={
                () => this.setState({ avatar: 'http://lzimages.lazygirls.info/madison_ivy_twitter_recent_images_by_madison420ivy_L2XgGqA3.sized' })}>
              <Image
                style={{ flex: 1 }}
                source={{ uri: 'http://lzimages.lazygirls.info/madison_ivy_twitter_recent_images_by_madison420ivy_L2XgGqA3.sized' }} />
            </TouchableHighlight>
            <TouchableHighlight
              style={{ flex: 1 }}
              onPress={
                () => this.setState({ avatar: 'https://i2.wp.com/www.rnningfool.com/wp-content/uploads/2016/11/Madison-Ivy-smiling-photo1-1.jpg?resize=640%2C272' })}>
              <Image
                style={{ flex: 1 }}
                source={{ uri: 'https://i2.wp.com/www.rnningfool.com/wp-content/uploads/2016/11/Madison-Ivy-smiling-photo1-1.jpg?resize=640%2C272' }} />
            </TouchableHighlight>
          </View>
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
  headerText: {
    fontSize: 16,
    textAlign: 'center'
  },
  image: {
    borderTopColor: 'gray',
    borderTopWidth: 1,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    flex: 7
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  }
});