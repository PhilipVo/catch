import React, { Component } from 'react';
import {
	ActivityIndicator,
	Alert,
	FlatList,
	Image,
	Text,
	StyleSheet,
	TouchableHighlight,
	View
} from 'react-native';
import { Icon } from 'react-native-elements';

import http from '../../services/http.service';
import session from '../../services/session.service';

export default class AccountNotificationListComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			accepting: false,
			data: this.props.screenProps.notifications
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ data: nextProps.screenProps.notifications });
	}

	acceptContributor = (item, index) => {
		if (!this.state.accepting) {
			this.setState({ accepting: true });

			http.put(`/api/contributors/accept-contributor`, JSON.stringify(item))
				.then(() => {
					const data = this.state.data.slice();
					data[index].action = 1;
					this.setState({
						accepting: false,
						data: data
					});
				}).catch(error => {
					Alert.alert('Error', typeof error === 'string' ? error : 'Oops, something went wrong.');
				});
		}
	}

	acceptWatcher = (item, index) => {
		if (!this.state.accepting) {
			this.setState({ accepting: true });

			http.put(`/api/contributors/accept-watcher`, JSON.stringify(item))
				.then(() => {
					const data = this.state.data.slice();
					data[index].action = 1;
					this.setState({
						accepting: false,
						data: data
					});
				}).catch(error => {
					Alert.alert('Error', typeof error === 'string' ? error : 'Oops, something went wrong.');
				});
		}
	}

	viewUser = username => {
		this.props.screenProps.navigate('ProfileComponent', {
			tabComponent: this.props.screenProps.tabComponent,
			username: username
		});
	}

	render() {
		return (
			this.props.screenProps.loading ?
				<View style={{ marginTop: 20 }}>
					<ActivityIndicator style={{ alignSelf: 'center' }} />
				</View> :
				this.props.screenProps.notifications.length > 0 ?
					<FlatList
						data={this.state.data}
						extraData={this.state}
						keyExtractor={item => item.id}
						renderItem={({ item, index }) => (
							<View style={{ alignItems: 'center', flexDirection: 'row', paddingVertical: 5 }}>

								{/* Profile picture */}
								<TouchableHighlight
									onPress={() => this.viewUser(item.notifier)}
									style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}
									underlayColor='transparent'>
									<Image
										style={{ borderRadius: 15, height: 30, width: 30 }}
										source={{ uri: `${http.s3}/users/${item.notifier}` }} />
								</TouchableHighlight>

								{/* Middle text */}
								<View style={{ flex: 4, justifyContent: 'center' }}>
									<Text style={{ fontSize: 13 }}>
										{
											item.type === 'commented' ?
												`${item.notifier} commented on ${item.title}` :
												item.type === 'contacted' ?
													`${item.notifier} added you as a contact` :
													item.type === 'contributed' ?
														`${item.notifier} added to ${item.title}` :
														item.type === 'contributor accepted' ?
															`You can now add to ${item.title}` :
															item.type === 'contributor requested' ?
																`Can ${item.notifier} add to ${item.title}?` :
																item.type === 'watch accepted' ?
																	`You can now view ${item.title}` :
																	item.type === 'watch requested' ?
																		`Can ${item.notifier} watch ${item.title}?` : null
										}
									</Text>
								</View>

								{/* Actions */}
								<View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
									{
										item.type === 'contributor requested' && item.action === 0 ?
											<Icon
												name='add-circle-outline'
												onPress={() => this.acceptContributor(item, index)} /> :
											item.type === 'contributor requested' && item.action === 1 ?
												<Icon
													color='#f74434'
													name='check-circle' /> :
												item.type === 'watch requested' && item.action === 0 ?
													<Icon
														name='add-circle-outline'
														onPress={() => this.acceptWatcher(item, index)} /> :
													item.type === 'watch requested' && item.action === 1 ?
														<Icon
															color='#f74434'
															name='check-circle' /> : null
									}
								</View>

							</View>
						)}
						style={{ flex: 1 }} /> :
					<View style={{ marginTop: 20 }}>
						<Text style={styles.grayText}>No notifications</Text>
					</View>
		);
	}
}

const styles = StyleSheet.create({
	follow: {
		alignSelf: 'center',
		borderWidth: 0.5,
		borderRadius: 5,
		borderColor: 'gray',
		marginTop: 5,
		padding: 5
	},
	grayText: {
		color: 'gray',
		textAlign: 'center'
	}, image: {
		height: 120,
		justifyContent: 'space-between'
	},
	text: {
		color: 'white',
		fontSize: 20,
		fontWeight: 'bold',
		paddingLeft: 5,
		textShadowColor: 'black',
		textShadowOffset: { width: 0.5, height: 0.5 }
	},
	timer: {
		alignSelf: 'flex-end',
		color: 'white',
		fontWeight: 'bold',
		paddingRight: 5,
		textShadowColor: 'black',
		textShadowOffset: { width: 0.5, height: 0.5 }
	},
	view: {
		alignItems: 'flex-end',
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
});