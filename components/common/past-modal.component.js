const moment = require('moment');
import React, { Component } from 'react';
import {
	ActivityIndicator,
	Alert,
	Dimensions,
	FlatList,
	Image,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	Text,
	TextInput,
	TouchableHighlight,
	StatusBar,
	StyleSheet,
	View
} from 'react-native';
import { Icon } from 'react-native-elements';
import { ShareDialog } from 'react-native-fbsdk';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modalbox';
import Video from 'react-native-video';
import TimerMixin from 'react-timer-mixin';

import ReportModalComponent from './report-modal.component';

import http from '../../services/http.service';
import session from '../../services/session.service';

export default class PastModalComponent extends Component {
	constructor(props) {
		super(props);

		this.timer;

		this.state = {
			comment: '',
			comments: [],
			done: false,
			index: 0,
			item: null,
			loading: true,
			pause: false,
			shared: false,
			showComments: false,
			showReportModal: false,
			stories: []
		};
	}

	componentDidMount() {
		http.get(`/api/events/get-contributions-for-event/${this.props.event.id}`)
			.then(data => {
				if (data.stories.length > 0) {
					data.stories.forEach(story => {
						Image.prefetch(`${http.s3}/events/${this.props.event.id}/${story.id}`);
					});

					this.setState({
						comments: data.comments,
						item: data.stories[0],
						loading: false,
						stories: data.stories
					});
				} else {
					this.setState({
						comments: data.comments,
						loading: false
					});
				}
			}).catch(error => {
				this.props.hideModal();
				Alert.alert('Error', typeof error === 'string' ? error : 'Oops, something went wrong.');
			});
	}

	componentDidUpdate() {
		setTimeout(() => {
			if (this._flatList) this._flatList.scrollToEnd();
		}, 1000);
	}

	componentWillUnmount() {
		clearTimeout(this.timer);
	}

	comment = () => {
		if (this.state.comment.length > 0) {
			const newComment = {
				comment: this.state.comment,
				username: session.username,
				createdAt: Date.now()
			};

			const _comments = this.state.comments.slice();
			_comments.push(newComment);

			this.setState({
				comment: '',
				comments: _comments,
			});

			http.post('/api/comments', JSON.stringify({
				comment: newComment.comment,
				eventId: this.props.event.id,
				title: this.props.event.title,
				username: this.props.event.username
			})).catch(() => { });
		}
	}

	nextItem = () => {
		console.log('calling next item1')
		const nextItem = this.state.stories[this.state.index + 1];
		if (nextItem) {
			this.setState({
				index: this.state.index + 1,
				item: nextItem
			});
		} else if (session.isFacebookUser) {
			this.setState({ done: true });
		} else this.props.hideModal();
	}

	onLoad = () => {
		console.log('onload called')
		clearTimeout(this.timer);
		this.timer = setTimeout(() => {
			console.log('calling timeout')
			this.nextItem();
		}, 4000);
	}

	previousItem = () => {
		console.log('previous')
		clearTimeout(this.timer);		
		const previousItem = this.state.stories[this.state.index - 1];
		if (previousItem)
			this.setState({
				index: this.state.index - 1,
				item: previousItem
			});	
		else if (this.state.item.type === 1) this.player.seek(0);
		else this.onLoad();
	}

	share = () => {
		const shareLinkContent = {
			contentType: 'link',
			contentUrl: 'https://itunes.apple.com/app/id1246628137',
			contentDescription: `${session.username} recently opened a Catch!`,
		};

		ShareDialog.canShow(shareLinkContent)
			.then(canShow => {
				if (canShow) return ShareDialog.show(shareLinkContent);
			}).then(result => {
				if (result.isCancelled) Alert.alert('Share operation was cancelled.');
				else this.setState({ shared: true });
			}, error => Alert.alert('Share failed with error: ' + error.message));
	}


	toggleComments = () => {
		if (this.state.showComments) {
			this.setState({
				showComments: false,
				pause: false
			});

			if (this.state.item.type !== 1) this.timer = setTimeout(this.nextItem, 4000);
		} else {
			this.setState({
				showComments: true,
				pause: true
			});
			
			if (this.state.item.type !== 1) clearTimeout(this.timer);
		}
	}

	toggleShowReportModal = () => {
		if (this.state.showReportModal) {
			this.setState({
				showReportModal: false,
				pause: false
			});
		} else {
			this.setState({
				showReportModal: true,
				pause: true
			});
		}
	}

	render() {
		return (
			<Modal
				isOpen={true}
				onClosed={this.props.hideModal}
				swipeToClose={true}>
				<StatusBar hidden={true} />

				{
					this.state.loading ?
						<View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
							<ActivityIndicator />
						</View> : !this.state.item ?
							<View style={styles.empty}>
								<View style={{ flex: 1 }}></View>
								<View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
									<Text style={{ color: 'white' }}>No posts were added to this event</Text>
								</View>
								<View style={{ alignItems: 'flex-end', flex: 1, justifyContent: 'flex-end' }}>
									{
										this.props.event.username !== session.username &&
										<Text
											onPress={this.toggleShowReportModal}
											style={{ backgroundColor: 'transparent', color: 'red', fontSize: 12, padding: 20 }}>
											Report
										</Text>
									}
								</View>
								{	// Report
									this.state.showReportModal &&
									<ReportModalComponent
										event={this.props.event}
										hideModal={this.toggleShowReportModal} />
								}
							</View> :
							<View style={{ backgroundColor: '#f74434', flex: 1 }}>
								{
									this.state.item.type === 1 ?
										<Video
											ignoreSilentSwitch='obey'
											onEnd={this.nextItem}
											paused={this.state.pause}
											playInBackground={false}
											playWhenInactive={true}
											ref={ref => this.player = ref}
											repeat={false}
											resizeMode='cover'
											source={{ uri: `${http.s3}/events/${this.props.event.id}/${this.state.item.id}` }}
											style={styles.background} /> :
										<Image
											onLoad={this.onLoad}
											source={{ uri: `${http.s3}/events/${this.props.event.id}/${this.state.item.id}` }}
											style={styles.background} />
								}

								<View style={styles.top}>
									<View style={{
										alignItems: 'center',
										flexDirection: 'row',
										justifyContent: 'space-between'
									}}>
										<Text
											onPress={() => {
												this.props.navigate('ProfileComponent', {
													username: this.state.item.username
												})
											}}
											style={styles.poster}>
											{this.state.item.username !== this.props.event.username && this.state.item.username}
										</Text>
										<Text
											onPress={() => {
												this.props.navigate('ProfileComponent', {
													username: this.props.event.username
												})
											}}
											style={styles.title}>
											{this.props.event.title}
										</Text>
									</View>
									<Text
										onPress={() => {
											this.props.navigate('ProfileComponent', {
												username: this.props.event.username
											})
										}}
										style={{
											backgroundColor: 'transparent',
											color: 'white',
											fontSize: 12,
											fontWeight: 'bold',
											textAlign: 'right',
										}}>
										created by {this.props.event.username}
									</Text>
								</View>

								<TouchableHighlight
									onPress={this.previousItem}
									style={{
										bottom: 100,
										left: 0,
										position: 'absolute',
										right: Dimensions.get('window').width / 2,
										top: 100,
									}}
									underlayColor='transparent'>
									<View />
								</TouchableHighlight>

								<TouchableHighlight
									onPress={this.nextItem}
									style={{
										bottom: 100,
										left: Dimensions.get('window').width / 2,
										position: 'absolute',
										right: 0,
										top: 100
									}}
									underlayColor='transparent'>
									<View />
								</TouchableHighlight>

								{
									this.state.showComments &&
									<View style={{
										bottom: 0,
										left: 0,
										padding: 20,
										paddingTop: 100,
										position: 'absolute',
										right: 0,
										top: 0
									}}>
										<KeyboardAvoidingView
											behavior='padding'
											style={{ flex: 1, justifyContent: 'flex-end' }}>
											<Text
												onPress={this.toggleComments}
												style={{
													alignSelf: 'flex-end',
													backgroundColor: 'transparent',
													color: 'white',
													fontWeight: 'bold'
												}}>
												Close comments
											</Text>

											<View style={{ flex: 5 }}>
												<FlatList
													data={this.state.comments}
													extraData={this.state}
													keyExtractor={(item, index) => `${index}`}
													ref={flatList => this._flatList = flatList}
													renderItem={({ item }) => (
														<View style={styles.commentView}>
															<TouchableHighlight
																onPress={() => {
																	this.props.navigate('ProfileComponent', {
																		username: item.username
																	})
																}}>
																<Image
																	source={{ uri: `${http.s3}/users/${item.username}` }}
																	style={styles.commentImage} />
															</TouchableHighlight>
															<TouchableHighlight style={{ flex: 1 }}>
																<View style={{ backgroundColor: 'rgba(255,255,255,0.6)', flex: 1, minHeight: 50 }}>
																	<Text style={styles.commentor}>
																		{item.username} - {moment(item.createdAt).fromNow()}
																	</Text>
																	<Text style={styles.comment}>{item.comment}</Text>
																</View>
															</TouchableHighlight>
														</View>
													)} />
											</View>
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

										</KeyboardAvoidingView>
									</View>
								}

								{ // Comments
									!this.state.showComments &&
									<View style={{ flexDirection: 'row' }}>
										<View style={{ flex: 1 }} />

										<View style={styles.bottom}>
											<Icon
												color='white'
												name='arrow-up'
												onPress={this.toggleComments}
												size={30}
												type='simple-line-icon' />
											<Text
												onPress={this.toggleComments}
												style={[styles.username, { textAlign: 'center' }]}>
												comments
											</Text>
										</View>

										<View style={{ alignItems: 'flex-end', flex: 1, justifyContent: 'flex-end' }}>
											{
												this.props.event.username !== session.username &&
												<Text
													onPress={this.toggleShowReportModal}
													style={{ backgroundColor: 'transparent', color: 'red', fontSize: 12, padding: 20 }}>
													Report
												</Text>
											}
										</View>
									</View>
								}

								{	// Report
									this.state.showReportModal &&
									<ReportModalComponent
										event={this.props.event}
										hideModal={this.toggleShowReportModal} />
								}

								{ // Share to Facebook:
									this.state.done &&
									<View style={{
										alignItems: 'center',
										backgroundColor: 'rgba(0,0,0,0.3)',
										bottom: 0,
										justifyContent: 'center',
										left: 0,
										position: 'absolute',
										right: 0,
										top: 0
									}}>
										<Text style={{
											color: 'white',
											fontSize: 16,
											paddingHorizontal: 50,
											textAlign: 'center'
										}}>
											{this.state.shared ? 'Successfully shared!' :
												`Know anyone else that would enjoy ${this.props.event.title}?`}
										</Text>
										{
											!this.state.shared &&
											<TouchableHighlight
												disabled={this.state.disabled}
												onPress={this.share}
												style={styles.share}
												underlayColor='#3b5998'>
												<View style={{ flexDirection: 'row', alignItems: 'center' }}>
													<Text style={styles.buttonText}>Share to Facebook  </Text>
													<Icon
														color='white'
														name='ios-redo'
														type='ionicon'
													/>
												</View>
											</TouchableHighlight>
										}
									</View>
								}

							</View>
				}

			</Modal>
		);
	}
}

const styles = StyleSheet.create({
	background: {
		bottom: 0,
		left: 0,
		position: 'absolute',
		right: 0,
		top: 0
	},
	bar: {
		flex: 1,
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
		borderRadius: 5,
		height: 2,
		marginHorizontal: 1
	},
	barView: {
		borderRadius: 5,
		flex: 1,
		flexDirection: 'row'
	},
	bottom: {
		alignSelf: 'center',
		flex: 1,
		justifyContent: 'flex-end',
		marginBottom: 10
	},
	buttonText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 16
	},
	comment: {
		padding: 5,
	},
	commentImage: {
		height: 50,
		width: 50
	},
	commentor: {
		fontSize: 10,
		paddingHorizontal: 5,
		paddingTop: 5
	},
	commentView: {
		flexDirection: 'row',
		padding: 2
	},
	empty: {
		bottom: 0,
		backgroundColor: 'rgb(30,30,30)',
		flex: 1,
		left: 0,
		position: 'absolute',
		right: 0,
		top: 0
	},
	image: {
		flex: 1,
		height: null,
		paddingHorizontal: 10,
		width: null
	},
	poster: {
		backgroundColor: 'transparent',
		color: 'white',
		fontSize: 16,
		textAlign: 'left',
	},
	share: {
		alignItems: 'center',
		backgroundColor: '#3b5998',
		borderRadius: 5,
		height: 40,
		justifyContent: 'center',
		marginTop: 50,
		width: 300
	},
	textInputView: {
		backgroundColor: 'white',
		borderColor: 'gray',
		borderRadius: 5,
		borderWidth: 1,
		height: 40,
		justifyContent: 'center',
		padding: 10
	},
	top: {
		flex: 1,
		padding: 5,
		marginTop: 20
	},
	title: {
		backgroundColor: 'transparent',
		color: 'white',
		fontSize: 20,
		textAlign: 'right',
	},
	username: {
		backgroundColor: 'transparent',
		color: 'white',
		fontSize: 16,
		textAlign: 'right',
	}
});