import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

import http from '../../services/http.service';

export default class CreateNewEventComponent extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.contributors = {};

    this.state = {
      data: [],
      dataSource: this.ds.cloneWithRows([]),
    }
  }

  componentDidMount() {
    http.get('/api/friends')
      .then(friends => {
        this.setState({
          data: friends,
          dataSource: this.ds.cloneWithRows(friends)
        });
      })
      .catch(error => { });
  }

  complete = () => {
    const event = {
      ...this.props.navigation.state.params.event,
      contributors: this.contributors
    };

    http.post('/api/events', JSON.stringify(event))
      .then(() => {
        this.props.navigation.dispatch(NavigationActions.reset({
          actions: [
            NavigationActions.navigate({
              params: {
                event: event,
                isNew: true
              },
              routeName: 'CreateCompleteComponent'
            })
          ],
          index: 0
        }));
      })
      .catch(error => { });
  }

  invite = (rowData, rowID) => {
    // Add contributor if not already invited:
    if (!rowData.invited) {
      const _data = this.state.data.slice();
      _data[rowID].invited = true;
      this.contributors[rowID] = true;

      this.setState({
        data: _data,
        dataSource: this.ds.cloneWithRows(_data)
      });
    }
    // Else remove contributor: 
    else {
      const _data = this.state.data.slice();
      _data[rowID].invited = false;
      delete this.contributors[rowID];

      this.setState({
        data: _data,
        dataSource: this.ds.cloneWithRows(_data)
      });
    }
  }

  render() {
    const { event } = this.props.navigation.state.params;

    return (
      <View style={{ flex: 1 }}>

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
            <Text style={styles.headerText}>Add to {event.event}</Text>
          </View>
          <View style={{ flex: 1 }}>
          </View>
        </View>

        {/* Body */}
        <View style={styles.body}>
          {
            this.state.data.length > 0 ?
              <ListView
                dataSource={this.state.dataSource}
                removeClippedSubviews={false}
                renderRow={(rowData, sectionID, rowID) => (
                  <View style={styles.row}>
                    <Text style={{ fontSize: 16 }}>{rowData.username}</Text>
                    <TouchableHighlight
                      onPress={() => this.invite(rowData, rowID)}
                      underlayColor='transparent'>

                      {
                        rowData.invited ?
                          <View style={styles.invited}>
                            <Text>Invited</Text>
                            <Icon name='add' />
                          </View> :
                          <View style={styles.invite}>
                            <Text>Invite</Text>
                            <Icon name='add' />
                          </View>
                      }

                    </TouchableHighlight>
                  </View>
                )} /> :
              <Text style={styles.grayText}>No friends were found</Text>
          }
        </View>

        {/* Footer */}
        <TouchableHighlight
          onPress={this.complete}
          underlayColor='transparent'>
          <View style={styles.footer}>
            <Text style={{ fontSize: 20 }}>Complete Event  </Text>
            <Icon
              name='angle-right'
              size={40}
              type='font-awesome'
              underlayColor='transparent' />
          </View>
        </TouchableHighlight>

      </View >
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 10,
    padding: 20
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10
  },
  grayText: {
    color: 'gray',
    textAlign: 'center'
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
  invite: {
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  invited: {
    alignItems: 'center',
    backgroundColor: '#f74434',
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5
  },
});