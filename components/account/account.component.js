import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationActions, TabNavigator } from 'react-navigation';

import AccountDetailsComponent from './account-details.component';
import AccountNotificationListComponent from './account-notification-list.component';
import DeleteModalComponent from '../common/delete-modal.component';
import FriendsModalComponent from '../common/friends-modal.component';
import InviteModalComponent from '../common/invite-modal.component';
import InvitedModalComponent from '../common/invited-modal.component';
import PastListComponent from '../common/past-list.component';
import PastModalComponent from '../common/past-modal.component';
import TabComponent from '../common/tab.component';
import UpcomingListComponent from '../common/upcoming-list.component';
import UpcomingModalComponent from '../common/upcoming-modal.component';

import http from '../../services/http.service';


export default class AccountComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			event: null,
			loading: true,
			modal: null,
			notifications: [],
			past: [],
			tab: 'PastListComponent',
			upcoming: [],
			user: {},
		};
	}

	componentDidMount() {
		this.getMyInfo();
	}

	getMyInfo = () => {
		return http.get('/api/users/get-my-info')
			.then(data => {
				this.setState(() => {
					return {
						loading: false,
						notifications: data.notifications,
						past: data.past,
						upcoming: data.upcoming,
						user: data.user
					}
				});
			}).catch(error => { });
	}

	hideModal = () => {
		this.setState({
			event: null,
			modal: null
		});
	}

	navigate = tab => {
		this.navigator.dispatch(NavigationActions.navigate({ routeName: tab }));
		this.setState({ tab: tab });
	}

	setEvent = (modal, event) => {
		this.setState({
			event: event,
			modal: modal
		});
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<View style={styles.view}>
					<View style={{ flex: 11 }}>

						<AccountDetailsComponent
							events={this.state.past.length + this.state.upcoming.length}
							getMyInfo={this.getMyInfo}
							navigate={this.props.navigation.navigate}
							setEvent={this.setEvent}
							user={this.state.user} />

						{/* Top tab bar */}
						<View style={styles.tabBar}>
							<Icon
								color={this.state.tab === 'PastListComponent' ? 'black' : 'gray'}
								name='camrecorder'
								onPress={() => this.navigate('PastListComponent')}
								size={30}
								type='simple-line-icon'
								underlayColor='transparent' />
							<Icon
								color={this.state.tab === 'UpcomingListComponent' ? 'black' : 'gray'}
								name='present'
								onPress={() => this.navigate('UpcomingListComponent')}
								size={30}
								type='simple-line-icon'
								underlayColor='transparent' />
							<Icon
								color={this.state.tab === 'AccountNotificationListComponent' ? 'black' : 'gray'}
								name='envelope'
								onPress={() => this.navigate('AccountNotificationListComponent')}
								size={30}
								type='simple-line-icon'
								underlayColor='transparent' />
						</View>

						{/* List navigator */}
						<View style={{ flex: 10 }}>
							<Navigator
								ref={navigator => this.navigator = navigator}
								screenProps={{
									loading: this.state.loading,
									navigate: this.props.navigation.navigate,
									notifications: this.state.notifications,
									onRefresh: this.getMyInfo,
									past: this.state.past,
									setEvent: this.setEvent,
									upcoming: this.state.upcoming
								}} />
						</View>

					</View>

					<TabComponent tab='Account' />
				</View>

				{ // Modals
					this.state.modal === 'delete' ?
						<DeleteModalComponent
							event={this.state.event}
							hideModal={this.hideModal}
							onDelete={this.getMyInfo} /> :
						this.state.modal === 'upcoming' ?
							<UpcomingModalComponent
								event={this.state.event}
								hideModal={this.hideModal}
								navigate={this.props.navigation.navigate} /> :
							this.state.modal === 'past' ?
								<PastModalComponent
									event={this.state.event}
									hideModal={this.hideModal}
									navigate={this.props.navigation.navigate} /> :
								this.state.modal === 'invite' ?
									<InviteModalComponent
										event={this.state.event}
										hideModal={this.hideModal} /> :
									this.state.modal === 'invited' ?
										<InvitedModalComponent
											event={this.state.event}
											hideModal={this.hideModal} /> :
										null
				}

			</View>
		);
	}
}

const Navigator = TabNavigator(
	{
		AccountNotificationListComponent: { screen: AccountNotificationListComponent },
		PastListComponent: { screen: PastListComponent },
		UpcomingListComponent: { screen: UpcomingListComponent }
	},
	{
		headerMode: 'none',
		initialRouteName: 'PastListComponent',
		navigationOptions: { tabBarVisible: false }
	}
);

const styles = StyleSheet.create({
	tabBar: {
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		borderTopColor: 'black',
		borderTopWidth: 1,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	view: {
		flex: 1,
		paddingTop: 20
	}
});