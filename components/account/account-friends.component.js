import React, { Component } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Observable } from 'rxjs/Observable';

import http from '../../services/http.service';

export default class AccountFriendsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: true,
    };
  }

  componentDidMount() {
    http.get(`/api/contacts`)
      .then(data => {
        this.setState({
          data: data,
          loading: false,
        });
      }).catch(error => { });
  }

  search = term => {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }

    this.subscription = Observable.create(observer => {
      if (term.length > 0) http.get(`/api/users/get-users-for-term/${term}`)
        .then(data => {
          observer.next(data);
        }).catch(error => { });
      else http.get(`/api/contacts`)
        .then(data => {
          observer.next(data);
        }).catch(error => { });
    }).subscribe(data => {
      this.setState({ data: data });
    });
  }

  toggleContact = (item, index) => {
    if (item.contact) http.delete(`/api/contacts/${item.contact}`)
      .then(() => {
        const _data = this.state.data.slice();
        _data[index].username = item.contact;
        delete _data[index].contact;
        this.setState(() => ({ data: _data }));
      }).catch(error => { });
    else http.post('/api/contacts', JSON.stringify({ contact: item.username }))
      .then(() => {
        const _data = this.state.data.slice();
        _data[index].contact = item.username;
        delete _data[index].username;
        this.setState(() => ({ data: _data }));
      }).catch(error => { });
  }

  viewUser = username => {
    this.props.navigation.navigate('ProfileComponent', {
      tabComponent: this.props.screenProps.tabComponent,
      username: username
    });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>

          {/* Header */}
          <View style={{
            alignItems: 'center',
            flex: 1,
            flexDirection: 'row',
            marginTop: 20
          }}>
            <View style={{ flex: 1 }}>
              <Icon
                name='angle-left'
                onPress={() => this.props.screenProps.reset()}
                size={40}
                type='font-awesome'
                underlayColor='transparent' />
            </View>
            <View style={{ flex: 10 }}>
              <Text style={{ fontSize: 16, textAlign: 'center' }}>Friends</Text>
            </View>
            <View style={{ flex: 1 }} />
          </View>

          {/* Body */}
          <View style={{ flex: 10, paddingBottom: 20, paddingHorizontal: 20 }}>
            <TextInput
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.search}
              placeholder='search users'
              placeholderTextColor='gray'
              style={{
                borderColor: 'gray',
                borderWidth: 0.5,
                fontSize: 14,
                height: 30,
                marginBottom: 10,
                textAlign: 'center'
              }} />

            {
              this.state.loading ?
                <ActivityIndicator /> :
                this.state.data.length > 0 ?
                  <FlatList
                    data={this.state.data}
                    extraData={this.state}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={({ item, index }) => (
                      <View style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        paddingBottom: 5
                      }}>

                        {/* Profile picture */}
                        <TouchableHighlight
                          onPress={() => this.viewUser(item.contact ? item.contact : item.username)}
                          style={{ flex: 1 }}
                          underlayColor='transparent'>
                          <Image
                            style={{ borderRadius: 20, height: 40, width: 40 }}
                            source={{ uri: `${http.s3}/users/${item.contact ? item.contact : item.username}` }} />
                        </TouchableHighlight>

                        {/* Middle text */}
                        <View style={{ flex: 4 }}>
                          <Text
                            onPress={() => this.viewUser(item.contact ? item.contact : item.username)}
                            style={{ fontSize: 14, marginLeft: 10 }}
                            underlayColor='transparent'>
                            {item.contact ? item.contact : item.username}
                          </Text>
                        </View>

                        {/* Actions */}
                        <View style={{ flex: 2 }}>
                          <TouchableHighlight
                            onPress={() => this.toggleContact(item, index)}
                            style={{
                              alignSelf: 'center',
                              backgroundColor: item.contact ? '#f74434' : 'transparent',
                              borderWidth: 1,
                              borderRadius: 3,
                              borderColor: item.contact ? '#f74434' : 'gray',
                              padding: 5
                            }}
                            underlayColor={item.contact ? '#f74434' : 'transparent'}>
                            <View style={{
                              alignItems: 'center',
                              flexDirection: 'row'
                            }}>
                              <Text style={{
                                color: item.contact ? 'white' : 'black',
                                fontWeight: 'bold'
                              }}>
                                {item.contact ? 'Following' : 'Follow'}
                              </Text>
                            </View>
                          </TouchableHighlight>
                        </View>

                      </View>
                    )}
                  /> :
                  <Text style={{ color: 'gray', textAlign: 'center' }}>
                    No contacts found
                  </Text>
            }
          </View>

        </View>
      </TouchableWithoutFeedback>
    );
  }
}