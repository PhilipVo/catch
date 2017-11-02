import React, { Component } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationActions, TabNavigator } from 'react-navigation';

import BlockModalComponent from '../common/block-modal.component';
import DeleteModalComponent from '../common/delete-modal.component';
import FriendsModalComponent from '../common/friends-modal.component';
import InviteModalComponent from '../common/invite-modal.component';
import InvitedModalComponent from '../common/invited-modal.component';
import PastListComponent from '../common/past-list.component';
import PastModalComponent from './past-modal.component';
import ProfileDetailsComponent from './profile-details.component';
import UpcomingListComponent from '../common/upcoming-list.component';
import UpcomingModalComponent from '../common/upcoming-modal.component';

import http from '../../services/http.service';

export default class ProfileComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			event: null,
			loading: true,
			modal: null,
			past: [],
			tab: 'PastListComponent',
			upcoming: [],
			user: {}
		};
	}

	componentDidMount() {
		this.getInfo();
	}

	getInfo = () => {
		return http.get(`/api/users/get-info-for-user/${this.props.navigation.state.params.username}`)
			.then(data => {
				this.setState({
					loading: false,
					past: data.past,
					upcoming: data.upcoming,
					user: data.user,
				});
			}).catch(() => { });
	}

	hideModal = () => this.setState({
		event: null,
		modal: null
	})

	navigate = tab => {
		this.navigator.dispatch(NavigationActions.navigate({ routeName: tab }));
		this.setState({ tab: tab });
	}

	setEvent = (modal, event) => {
		this.setState({
			modal: modal,
			event: event
		});
	}

	viewUser = username => {
		this.props.navigation.navigate('ProfileComponent', {
			tabComponent: this.props.navigation.state.params.tabComponent,
			username: username
		});
	}

	render() {
		const { params } = this.props.navigation.state;
		return (
			!this.state.loading && <View style={{ flex: 1 }}>
				<StatusBar hidden={false} />
				<View style={styles.view}>
					<View style={{ flex: 11 }}>

						<ProfileDetailsComponent
							events={this.state.past.length + this.state.upcoming.length}
							goBack={this.props.navigation.goBack}
							navigate={this.props.navigation.navigate}
							setEvent={this.setEvent}
							tabComponent={params.tabComponent}
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
						</View>

						{/* List navigator */}
						<View style={{ flex: 10 }}>
							<Navigator
								ref={navigator => this.navigator = navigator}
								screenProps={{
									past: this.state.past,
									onRefresh: this.getInfo,
									setEvent: this.setEvent,
									upcoming: this.state.upcoming
								}} />
						</View>

					</View>
					{params.tabComponent}
				</View>

				{ // Modals
					this.state.modal === 'block' ?
						<BlockModalComponent
							hideModal={this.hideModal}
							onBlock={() => {
								this.hideModal();
								this.props.navigation.goBack();
								this.props.refresh();
							}}
							username={this.state.event} /> :
						this.state.modal === 'delete' ?
							<DeleteModalComponent
								event={this.state.event}
								hideModal={this.hideModal}
								onDelete={this.getInfo} /> :
							this.state.modal === 'friends' ?
								<FriendsModalComponent
									hideModal={this.hideModal}
									username={this.state.event}
									viewUser={this.viewUser} /> :
								this.state.modal === 'past' ?
									<PastModalComponent
										event={this.state.event}
										hideModal={this.hideModal}
										navigate={this.props.navigation.navigate}
										tabComponent={params.tabComponent} /> :
									this.state.modal === 'upcoming' ?
										<UpcomingModalComponent
											event={this.state.event}
											hideModal={this.hideModal}
											navigate={this.props.navigation.navigate}
											tabComponent={params.tabComponent} /> :
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