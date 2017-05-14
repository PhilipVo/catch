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
    this.state = { avatar: 'https://www.sideshowtoy.com/photo_902657_thumb.jpg' };
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
                () => this.setState({ avatar: 'https://vignette2.wikia.nocookie.net/marvelcinematicuniverse/images/d/d2/CACW_Steve_Textless_Poster.jpg/revision/latest/scale-to-width-down/350?cb=20160527050609' })}>
              <Image
                style={{ flex: 1 }}
                source={{ uri: 'https://vignette2.wikia.nocookie.net/marvelcinematicuniverse/images/d/d2/CACW_Steve_Textless_Poster.jpg/revision/latest/scale-to-width-down/350?cb=20160527050609' }} />
            </TouchableHighlight>
            <TouchableHighlight
              style={{ flex: 1 }}
              onPress={
                () => this.setState({ avatar: 'http://cdn.bgr.com/2014/04/captain-america.jpg?quality=98&strip=all' })}>
              <Image
                style={{ flex: 1 }}
                source={{ uri: 'http://cdn.bgr.com/2014/04/captain-america.jpg?quality=98&strip=all' }} />
            </TouchableHighlight>
            <TouchableHighlight
              style={{ flex: 1 }}
              onPress={
                () => this.setState({ avatar: 'http://cdn.playbuzz.com/cdn/a95e173d-78cc-41cf-8439-352fe28c36f8/a76d3eaf-159d-467d-90ab-d37b40eb7678.jpg' })}>
              <Image
                style={{ flex: 1 }}
                source={{ uri: 'http://cdn.playbuzz.com/cdn/a95e173d-78cc-41cf-8439-352fe28c36f8/a76d3eaf-159d-467d-90ab-d37b40eb7678.jpg' }} />
            </TouchableHighlight>
          </View>

          <View style={styles.row}>
            <TouchableHighlight
              style={{ flex: 1 }}
              onPress={
                () => this.setState({ avatar: 'http://115.imagebam.com/download/IL2fKxg0D0JmWPyleGF3-g/47900/478995554/Captain%20America%201.jpg' })}>
              <Image
                style={{ flex: 1 }}
                source={{ uri: 'http://115.imagebam.com/download/IL2fKxg0D0JmWPyleGF3-g/47900/478995554/Captain%20America%201.jpg' }} />
            </TouchableHighlight>
            <TouchableHighlight
              style={{ flex: 1 }}
              onPress={
                () => this.setState({ avatar: 'http://screenrant.com/wp-content/uploads/Chris-Evans-Captain-America-Trilogy.jpg' })}>
              <Image
                style={{ flex: 1 }}
                source={{ uri: 'http://screenrant.com/wp-content/uploads/Chris-Evans-Captain-America-Trilogy.jpg' }} />
            </TouchableHighlight>
            <TouchableHighlight
              style={{ flex: 1 }}
              onPress={
                () => this.setState({ avatar: 'http://www.silverpetticoatreview.com/wp-content/uploads/2015/09/captain-america.jpg' })}>
              <Image
                style={{ flex: 1 }}
                source={{ uri: 'http://www.silverpetticoatreview.com/wp-content/uploads/2015/09/captain-america.jpg' }} />
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
    flexDirection: 'row',
    paddingTop: 20
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