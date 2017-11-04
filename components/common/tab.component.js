import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';

import navigation from '../../services/navigation.service';

const TabComponent = props => {
	return (
		<View style={props.tab === 'Camera' ? styles.tab1 : styles.tab2}>
			<Icon
				color={props.tab === 'Feed' ? 'black' : 'gray'}
				name='calendar'
				onPress={() => {
					if (props.tab === 'Feed') navigation.resetFeed();
					else navigation.navigate('Feed');
				}}
				size={30}
				type='simple-line-icon'
				underlayColor='transparent' />
			<Icon
				color={props.tab === 'Camera' ? 'transparent' : 'gray'}
				name='plus'
				onPress={() => { navigation.navigate('Camera') }}
				size={30}
				type='simple-line-icon'
				underlayColor='transparent' />
			<Icon
				color={props.tab === 'Account' ? 'black' : 'gray'}
				name='user'
				onPress={() => {
					if (props.tab === 'Account') navigation.resetAccount();
					else navigation.navigate('Account')
				}}
				size={30}
				type='simple-line-icon'
				underlayColor='transparent' />
		</View>
	);
}

const styles = StyleSheet.create({
	tab1: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	tab2: {
		backgroundColor: '#F9F9F9',
		borderTopColor: 'black',
		borderTopWidth: 1,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around'
	}
});

module.exports = TabComponent;