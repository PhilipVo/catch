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
          <View style={{ marginBottom: 40 }}>
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
                <Text style={{ fontSize: 16 }}>{rowData.event}</Text>
                {
                  rowData.isCreator ?
                    <View style={{ flexDirection: 'row' }}>
                      <Icon color='purple' name='star' size={15} />
                      <Text style={{ fontSize: 12 }}>You created this event</Text>
                    </View> :
                    <Text style={{ fontSize: 12 }}>You're following this event</Text>
                }
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
            <View style={{ paddingHorizontal: 30 }}>
              <View
                onPress={() => {

                }}
                style={{
                  alignSelf: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  backgroundColor: 'red',
                  width: 300,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5
                }}>
                <Text style={{ color: 'white' }}>Invite others to contribute </Text>
                <Icon color='white' name='add' size={10} />
              </View>
              <Text style={{ marginTop: 10, textAlign: 'justify' }}>{rowData.detail}</Text>

            </View>
          </View>)
        }
      />
    );
  }
}