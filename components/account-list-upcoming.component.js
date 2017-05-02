const moment = require('moment');
import React, { Component } from 'react';
import {
  Image,
  ListView,
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native';
import { Button, Icon, Text } from 'react-native-elements';
import TimerMixin from 'react-timer-mixin';

import upcoming from '../samples/upcoming-contributions';

export default class AccountListUpcomingComponent extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      data: upcoming,
      dataSource: this.ds.cloneWithRows(upcoming)
    }
  }

  componentDidMount() {
    TimerMixin.setInterval(() => {
      this.setState({
        data: upcoming,
        dataSource: this.ds.cloneWithRows(upcoming)
      });
    }, 60000);
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        removeClippedSubviews={false}
        renderRow={(rowData, sectionID, rowID) => (
          <View style={{ marginBottom: 20 }}>
            <Image
              source={{ uri: rowData.cover }}
              style={styles.image}>
              {
                rowData.isCreator ?
                  <Icon color='white' name='play-circle-outline' size={33} /> : null
              }
            </Image>

            {/* Header */}
            <View style={styles.header}>
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

              {/* Timer */}
              <View style={{ flexDirection: 'row' }}>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ color: 'red' }}>
                    {moment(rowData.date).diff(Date.now(), 'days')}
                  </Text>
                  <Text style={{ color: 'red' }}>Days</Text>
                </View>
                <Text style={{ color: 'red' }}>:</Text>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ color: 'red' }}>
                    {moment(rowData.date).diff(Date.now(), 'hours') % 24}
                  </Text>
                  <Text style={{ color: 'red' }}>Hrs</Text>
                </View>
                <Text style={{ color: 'red' }}>:</Text>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ color: 'red' }}>
                    {moment(rowData.date).diff(Date.now(), 'minutes') % 60}
                  </Text>
                  <Text style={{ color: 'red' }}>Mins</Text>
                </View>
              </View>
            </View>

            {/*<TouchableHighlight>
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

            </View>*/}
            <Text style={styles.detailText}>{rowData.detail}</Text>
            <View style={styles.iconView}>
              <Icon name='chat-bubble-outline' size={25} />
              <Icon name='people-outline' size={25} />
              <Icon name='group-add' size={25} />
            </View>
          </View>)
        }
        style={this.props.style}
      />
    );
  }
}

const styles = StyleSheet.create({
  detailText: {
    paddingHorizontal: 30,
    marginTop: 10,
    textAlign: 'justify'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  iconView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10
  },
  image: {
    alignItems: 'flex-end',
    height: 120,
    justifyContent: 'flex-end'
  },
});