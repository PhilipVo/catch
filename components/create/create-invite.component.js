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
import socket from '../../services/socket.service';

export default class CreateNewEventComponent extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.contributors = {};

    this.state = {
      data: [],
      dataSource: this.ds.cloneWithRows([]),
      error: null,
      saving: false,
    }
  }

  componentDidMount() {
    http.get('/api/contacts')
      .then(contacts => {
        console.log(contacts)
        this.setState({
          data: contacts,
          dataSource: this.ds.cloneWithRows(contacts)
        });
      })
      .catch(error => {
        this.setState({
          error: typeof error === 'string' ? error : 'Oops, something went wrong.'
        });
      });
  }

  complete = () => {
    this.setState({
      error: null,
      saving: true
    });

    const event = this.props.navigation.state.params.event;
    const formData = new FormData();
    console.log(event)
    formData.append('audience', event.audience);
    formData.append('contributors', JSON.stringify(this.contributors));
    formData.append('date', event.date);
    formData.append('description', event.description);
    formData.append('title', event.title);
    formData.append('media', { name: 'cover', uri: event.cover });

    // Append story if it exists:
    if (event.story) formData.append('media', { name: 'story', uri: event.story });

    http.post('/api/events', formData)
      .then(() => {
        socket.emit('public');

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
      }).catch(error => {
        this.setState({
          error: typeof error === 'string' ? error : 'Oops, something went wrong.',
          saving: false
        })
      });
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
            <Text style={styles.headerText}>Add to {event.title}</Text>
          </View>
          <View style={{ flex: 1 }}>
          </View>
        </View>

        {/* Body */}
        <View style={styles.body}>

          { // Contact list
            this.state.data.length > 0 ?
              <ListView
                dataSource={this.state.dataSource}
                removeClippedSubviews={false}
                renderRow={(rowData, sectionID, rowID) => (
                  <View style={styles.row}>
                    <Text style={{ fontSize: 16 }}>{rowData.contact}</Text>
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
              <Text style={styles.grayText}>No contacts were found</Text>
          }

        </View>

        {/* Footer */}

        { // Error message
          this.state.error && <Text style={styles.error}>
            {this.state.error}
          </Text>
        }

        <TouchableHighlight
          onPress={this.complete}
          underlayColor='transparent'>
          <View style={styles.footer}>
            <Text style={{ fontSize: 20 }}>{this.state.saving ? 'Saving...' : 'Complete Event  '}</Text>
            {
              !this.state.saving &&
              <Icon
                name='angle-right'
                size={40}
                type='font-awesome'
                underlayColor='transparent' />
            }
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
  error: {
    color: 'red',
    textAlign: 'center'
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