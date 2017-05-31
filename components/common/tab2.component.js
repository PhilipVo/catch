import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';

module.exports = class Tab2Component extends Component {
  constructor(props) {
    super(props);
    this.state = { tab: 'FeedNavigatorComponent' };
    console.log('constructed')
  }

  componentDidUpdate() {
    console.log('updated...', this.state.tab)
  }

  render() {
    return (
      <View style={this.state.tab === 'CreateNavigatorComponent' ?
        styles.tab1 : styles.tab2}>
        <Icon
          color={this.state.tab === 'FeedNavigatorComponent' ? 'black' : 'gray'}
          name='list'
          onPress={() => {
            if (this.state.tab !== 'FeedNavigatorComponent') {
              this.props.navigate('FeedNavigatorComponent');
              this.setState({ tab: 'FeedNavigatorComponent' });
            }
          }}
          size={33}
          underlayColor='transparent' />
        <Icon
          color={this.state.tab === 'CreateNavigatorComponent' ? 'transparent' : 'gray'}
          name='add-circle-outline'
          onPress={() => {
            if (this.state.tab !== 'CreateNavigatorComponent') {
              this.props.navigate('CreateNavigatorComponent');
              this.setState({ tab: 'CreateNavigatorComponent' });
            }
          }}
          size={33}
          underlayColor='transparent' />
        <Icon
          color={this.state.tab === 'AccountNavigatorComponent' ? 'black' : 'gray'}
          name='person'
          onPress={() => {
            if (this.state.tab !== 'AccountNavigatorComponent') {
              this.props.navigate('AccountNavigatorComponent');
              this.setState({ tab: 'AccountNavigatorComponent' });
            }
          }}
          size={33}
          underlayColor='transparent' />
      </View>
    );
  }
}

const styles = {
  tab1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  tab2: {
    backgroundColor: 'floralwhite',
    borderTopColor: 'gray',
    borderTopWidth: 0.5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
};