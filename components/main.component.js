import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Icon, Tab, Tabs } from 'react-native-elements'

import CreateComponent from './create.component';
import FeedComponent from './feed.component';
import ProfileComponent from './profile.component';

export default class MainComponent extends Component {
  constructor(props) {
    super(props)
    this.state = { selectedTab: 'create' };
    this.tabBarStyle = { backgroundColor: 'rgba(0, 0, 0, 0)' };
    this.sceneStyle = { backgroundColor: 'rgba(0, 0, 0, 0)' };
  }

  changeTab(selectedTab) {
    // if (selectedTab === 'create')
    //   this.tabBarStyle = { backgroundColor: 'red' }

    this.setState({ selectedTab });
  }

  componentDidMount() {
    console.log('mounted tabs');
  }

  render() {
    const { selectedTab } = this.state

    return (
      <Tabs style={{ backgroundColor: 'transparent' }}>
        <Tab
          titleStyle={{ fontWeight: 'bold', fontSize: 10 }}
          selectedTitleStyle={{ marginTop: -1, marginBottom: 6 }}
          selected={selectedTab === 'feed'}
          title={selectedTab === 'feed' ? 'FEED' : null}
          renderIcon={() =>
            <Icon
              containerStyle={{ justifyContent: 'center', alignItems: 'center', marginTop: 12 }}
              color={'#5e6977'}
              name='list'
              size={33} />}
          renderSelectedIcon={() => <Icon color={'#6296f9'} name='list' size={30} />}
          onPress={() => this.changeTab('feed')}>
          <FeedComponent />
        </Tab>

        <Tab
          titleStyle={{ fontWeight: 'bold', fontSize: 10 }}
          selectedTitleStyle={{ marginTop: -1, marginBottom: 6 }}
          selected={selectedTab === 'create'}
          title={selectedTab === 'create' ? 'CREATE' : null}
          renderIcon={() =>
            <Icon
              containerStyle={{ justifyContent: 'center', alignItems: 'center', marginTop: 12 }}
              color={'#5e6977'}
              name='add-circle-outline'
              size={33} />}
          renderSelectedIcon={() => null}
          onPress={() => this.changeTab('create')}>
          <CreateComponent />
        </Tab>

        <Tab
          titleStyle={{ fontWeight: 'bold', fontSize: 10 }}
          selectedTitleStyle={{ marginTop: -1, marginBottom: 6 }}
          selected={selectedTab === 'profile'}
          title={selectedTab === 'profile' ? 'PROFILE' : null}
          renderIcon={() =>
            <Icon containerStyle={{ justifyContent: 'center', alignItems: 'center', marginTop: 12 }}
              color={'#5e6977'}
              name='person'
              size={33} />}
          renderSelectedIcon={() => <Icon color={'#6296f9'} name='person' size={30} />}
          onPress={() => this.changeTab('profile')}>
          <ProfileComponent />
        </Tab>
      </Tabs>
    );
  }
}