import React, { Component } from 'react';
import { Image, ListView, TouchableHighlight, View } from 'react-native';
import { Button, Icon, Text } from 'react-native-elements';

import styles from '../styles/styles';

import upcoming from './sample-upcoming-contributions';

export default class UpcomingComponent extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      data: upcoming,
      dataSource: ds.cloneWithRows(upcoming)
    }
  }

  componentDidMount() {
    console.log('mounted upcoming');
  }

  render() {
    return (
      <ListView
        style={this.props.style}
        dataSource={this.state.dataSource}
        removeClippedSubviews={false}
        renderRow={(rowData, sectionID, rowID) => (
          <View style={{ marginBottom: 10 }}>
            <Image
              source={{ uri: rowData.cover }}
              style={{
                alignItems: 'flex-end',
                height: 120,
                justifyContent: 'flex-end'
              }}>
              <Icon color='white' name='play-circle-outline' size={33} />
            </Image>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
              <View>
                <Text>{rowData.event}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Icon color='purple' name='star' size={15} />
                  <Text style={{ fontSize: 12 }}>You created this event</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ color: 'red' }}>01</Text>
                  <Text style={{ color: 'red' }}>Days</Text>
                </View>
                <Text style={{ color: 'red' }}>:</Text>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ color: 'red' }}>22</Text>
                  <Text style={{ color: 'red' }}>Hrs</Text>
                </View>
                <Text style={{ color: 'red' }}>:</Text>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ color: 'red' }}>56</Text>
                  <Text style={{ color: 'red' }}>Mins</Text>
                </View>
              </View>
            </View>
            <TouchableHighlight>
              <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                <Text>Contributors</Text>
                <Icon name='arrow-drop-down' />
              </View>
            </TouchableHighlight>
            <Button
              backgroundColor='red'
              borderRadius={5}
              icon={{ name: 'add' }}
              iconRight
              raised
              title='Invite Others to Contribute' />
          </View>)
        }
      />
    );
  }
}