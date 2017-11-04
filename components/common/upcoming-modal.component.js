const moment = require('moment');
import React, { Component } from 'react';
import {
	ActivityIndicator,
	Dimensions,
	FlatList,
	Image,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	TouchableHighlight,
	View
} from 'react-native';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modalbox';

import ReportModalComponent from './report-modal.component';

import http from '../../services/http.service';
import session from '../../services/session.service';

export default class UpcomingModalComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comment: '',
			comments: [],
			followers: 0,
			isContributor: null,
			isNotificationsOn: null,
			isWatcher: null,
			loading: true,
			showReportModal: false,
			toggling: false
		};
	}

	componentDidMount() {
		this.getDetails();
	}

	componentDidUpdate() {
		setTimeout(() => {
			if (this._flatList) this._flatList.scrollToEnd();
		}, 1000);
	}

	comment = () => {
		if (this.state.comment.length > 0) {
			http.post('/api/comments', JSON.stringify({
				comment: this.state.comment,
				username: this.props.event.username,
				eventId: this.props.event.id,
				title: this.props.event.title
			})).then(() => {
				this.setState({ comment: '' });
				this.getDetails();
			}).catch(() => { });
		}
	}

	getDetails = () => {
		http.get(`/api/events/get-details-for-event/${this.props.event.id}`)
			.then(data => {
				this.setState({
					comments: data.comments,
					followers: data.followers,
					loading: false,
					isContributor: data.contributor ? data.contributor.isContributor : null,
					isNotificationsOn: data.contributor ? data.contributor.isNotificationsOn : null,
					isWatcher: data.contributor ? data.contributor.isWatcher : null
				});
			}).catch(() => { });
	}

	toggleNotifications = () => {
		if (!this.state.toggling) {
			this.setState({ toggling: true });

			let request;
			if (this.state.isNotificationsOn === null) {
				request = http.post('/api/contributors/turn-on-notifications', JSON.stringify({
					id: this.props.event.id
				}));
			} else {
				request = http.put(`/api/contributors/toggle-notifications`, JSON.stringify({
					id: this.props.event.id,
					isNotificationsOn: this.state.isNotificationsOn === 0 ? 1 : 0
				}));
			}

			request.then(() => this.setState({
				isNotificationsOn: this.state.isNotificationsOn === 1 ? 0 : 1,
				toggling: false
			})).catch(error => this.setState({ toggling: false }));
		}
	}

	render() {
		return (
			<Modal
				isOpen={true}
				onClosed={this.props.hideModal}
				style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
				swipeArea={Dimensions.get('window').height / 2}
				swipeToClose={true}>
				<StatusBar hidden={true} />
				<KeyboardAvoidingView
					behavior={'padding'}
					style={{ flex: 1 }}>

					<Image source={{ uri: `${http.s3}/events/${this.props.event.id}/cover` }} style={styles.mainImage}>
						<Text style={styles.eventText}>{this.props.event.title}</Text>

						{/* Timer */}
						<View style={{ flexDirection: 'row' }}>
							<View style={{ alignItems: 'center' }}>
								<Text style={styles.timerText}>
									{moment(this.props.event.date).diff(Date.now(), 'days')}
								</Text>
								<Text style={styles.timerText}>Days</Text>
							</View>
							<Text style={styles.timerText}>:</Text>
							<View style={{ alignItems: 'center' }}>
								<Text style={styles.timerText}>
									{moment(this.props.event.date).diff(Date.now(), 'hours') % 24}
								</Text>
								<Text style={styles.timerText}>Hrs</Text>
							</View>
							<Text style={styles.timerText}>:</Text>
							<View style={{ alignItems: 'center' }}>
								<Text style={styles.timerText}>
									{moment(this.props.event.date).diff(Date.now(), 'minutes') % 60}
								</Text>
								<Text style={styles.timerText}>Mins</Text>
							</View>
						</View>
					</Image>

					<View style={styles.modalView0}>
						<View style={styles.modalView1}>
							<View>
								<Text
									onPress={() => {
										this.props.navigate('ProfileComponent', {
											username: this.props.event.username
										});
									}}
									style={styles.username}>
									{this.props.event.username}
								</Text>
								<Text style={styles.modalText1}>{this.state.followers} Following</Text>
							</View>
							<View style={{ alignItems: 'center' }}>
								{
									this.props.event.audience === 1 &&
									<Text style={{
										color: 'white',
										fontSize: 12,
										fontWeight: 'bold',
										marginBottom: 5
									}}>
										Private event
                </Text>
								}

								{
									!this.state.loading &&
									<TouchableHighlight
										onPress={this.toggleNotifications}
										underlayColor='transparent'>
										<View style={{
											alignItems: 'center',
											backgroundColor: !this.state.isNotificationsOn ? 'green' : 'white',
											borderRadius: 5,
											padding: 5
										}}>
											<Text style={{
												color: !this.state.isNotificationsOn ? 'white' : 'black',
												fontSize: 12,
												fontWeight: 'bold'
											}}>
												{
													this.state.isNotificationsOn === null ? 'Follow' :
														this.state.isNotificationsOn === 0 ? 'Turn On Notifications' :
															'Turn Off Notifications'
												}
											</Text>
										</View>
									</TouchableHighlight>
								}
							</View>
						</View>

						<View style={{ flex: 1 }}>
							<Text style={styles.modalText3}>{this.props.event.description}</Text>
							<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
								<Text style={styles.modalText4}>Comments</Text>
								{
									this.props.event.username != session.username &&
									<Text
										onPress={() => this.setState({ showReportModal: true })}
										style={styles.report}>
										Report
									</Text>
								}
							</View>

							{ // Comments:
								this.state.loading ?
									<ActivityIndicator style={{ alignSelf: 'center' }} /> :
									<FlatList
										data={this.state.comments}
										extraData={this.state}
										keyExtractor={(item, index) => `${index}`}
										ref={flatList => this._flatList = flatList}
										renderItem={({ item }) => (
											<View style={styles.commentView}>
												<TouchableHighlight onPress={() => {
													this.props.navigate('ProfileComponent', {
														username: item.username
													});
												}}>
													<Image
														source={{ uri: `${http.s3}/users/${item.username}` }}
														style={styles.commentImage} />
												</TouchableHighlight>
												<View style={{ backgroundColor: 'white', flex: 1, minHeight: 50 }}>
													<Text style={styles.commentor}>
														{item.username} - {moment(item.createdAt).fromNow()}
													</Text>
													<Text style={styles.comment}>{item.comment}</Text>
												</View>
											</View>
										)} />
							}
						</View>

						<View style={{
							alignItems: 'center',
							flexDirection: 'row',
							justifyContent: 'space-between'
						}}>
							<View style={styles.textInputView}>
								<TextInput
									autoCapitalize='sentences'
									autoCorrect={true}
									maxLength={120}
									onChangeText={(comment) => this.setState({ comment: comment })}
									onSubmitEditing={this.comment}
									placeholder='comment'
									returnKeyType='send'
									style={{ height: 40 }}
									value={this.state.comment} />
							</View>
							<View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
								<Icon
									color='white'
									name='clear'
									onPress={Keyboard.dismiss}
									size={30}
									underlayColor='transparent' />
							</View>
						</View>
					</View>

					{ // Modals
						this.state.showReportModal &&
						<ReportModalComponent
							event={this.props.event}
							hideModal={() => this.setState({ showReportModal: false })} />
					}
				</KeyboardAvoidingView>
			</Modal>
		);
	}
}

const styles = StyleSheet.create({
	comment: {
		padding: 5,
	},
	commentImage: {
		height: 50,
		width: 50
	},
	commentor: {
		fontSize: 10,
		paddingLeft: 5,
		paddingTop: 5
	},
	commentView: {
		flex: 1,
		flexDirection: 'row',
		padding: 2
	},
	eventText: {
		color: 'white',
		fontSize: 20,
		fontWeight: 'bold',
		paddingLeft: 5,
		textShadowColor: 'black',
		textShadowOffset: { width: 0.5, height: 0.5 }
	},
	mainImage: {
		alignItems: 'flex-end',
		flexDirection: 'row',
		height: 240,
		justifyContent: 'space-between'
	},
	modalText1: {
		color: 'white',
		fontSize: 12
	},
	modalText2: {
		color: 'white',
		fontSize: 10
	},
	modalText3: {
		color: 'white',
		fontSize: 16,
		padding: 5
	},
	modalText4: {
		color: 'white',
		fontSize: 12,
		marginTop: 10
	},
	modalView0: {
		flex: 3,
		padding: 20
	},
	modalView1: {
		alignItems: 'flex-start',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	noComments: {
		color: 'gray',
		padding: 10,
		fontSize: 12,
		textAlign: 'center',
	},
	report: {
		color: 'red',
		fontSize: 12,
		marginTop: 10
	},
	textInputView: {
		backgroundColor: 'white',
		borderColor: 'gray',
		borderRadius: 5,
		borderWidth: 1,
		flex: 6,
		height: 40,
		justifyContent: 'center',
		marginTop: 5,
		padding: 10
	},
	timerText: {
		color: 'white',
		fontSize: 10,
		fontWeight: 'bold',
		textShadowColor: 'black',
		textShadowOffset: { width: 0.5, height: 0.5 }
	},
	username: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 18
	}
});