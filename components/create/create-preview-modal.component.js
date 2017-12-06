import React, { Component } from 'react';
import {
	Alert,
	FlatList,
	Platform,
	StyleSheet,
	Text,
	TouchableHighlight,
	View
} from 'react-native';
import { Divider, Icon } from 'react-native-elements';
import { MessageBarManager } from 'react-native-message-bar';
import Modal from 'react-native-modalbox';
import RNFS from 'react-native-fs';

import http from '../../services/http.service';
import navigation from '../../services/navigation.service';
import s3 from '../../services/s3.service';
import vrate from '../../services/vrate.service';

export default class CreatePreviewModalComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			saving: false
		};
	}

	componentDidMount() {
		http.get('/api/events/get-upcoming-associated-events')
			.then(data => this.setState({ data: data }))
			.catch(() => { });
	}

	complete = event => {
		if (!this.state.saving) {
			this.setState({ saving: true });

			event.isVideo = this.props.isVideo;

			navigation.resetCreate();

			new Promise((resolve, reject) => {
				MessageBarManager.showAlert({
					alertType: 'custom',
					message: `Now uploading your ${this.props.isVideo ? 'video' : 'picture'}...`,
					stylesheetExtra: { backgroundColor: '#f74434' },
					viewTopInset: 20
				});

				if (!this.props.isVideo)
					return RNFS.readFile(this.props.story, 'base64')
						.then(data => vrate(data))
						.then(resolve)
						.catch(error => { throw error });
				return resolve();
			}).then(() => http.post('/api/stories/', JSON.stringify(event)))
				.then(storyId => {
					// Upload story:
					const file = {
						name: storyId,
						type: this.props.isVideo ? 'video/mp4' : 'image/jpeg',
						uri: this.props.story
					};

					s3.put(file, `events/${event.id}/`)
						.then(() => {
							MessageBarManager.showAlert({
								alertType: 'custom',
								message: `${this.props.isVideo ? 'Video' : 'Picture'} successfully uploaded!`,
								stylesheetExtra: { backgroundColor: '#f74434' },
								viewTopInset: 20
							});
						}).catch(() => {
							http.delete(`/api/stories/${storyId}`)
								.catch((error) => { throw error });

							MessageBarManager.showAlert({
								alertType: 'custom',
								message: `${this.props.isVideo ? 'Video' : 'Picture'} failed to upload.`,
								messageStyle: { color: 'black' },
								stylesheetExtra: { backgroundColor: 'yellow' },
								viewTopInset: 20
							});
						});

				}).catch((error) => {
					Alert.alert('Error', typeof error === 'string' ? error : 'Oops, something went wrong.');
				});
		}
	}

	next = () => {
		this.props.pause();
		this.props.navigate('CreateComponent', {
			duration: this.props.duration,
			isVideo: this.props.isVideo,
			key: this.props.key,
			play: this.props.play,
			story: this.props.story
		});
	}

	render() {
		return (
			<Modal
				isOpen={true}
				style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
				swipeToClose={false}>
				<View style={styles.topView}>
					<Icon
						color='white'
						name='clear'
						onPress={() => this.props.hideModal()}
						size={20}
						style={{ alignSelf: 'flex-start' }}
						underlayColor='transparent' />
					<TouchableHighlight
						onPress={this.next}
						underlayColor='transparent'>
						<View style={styles.newEventView}>
							<Text style={styles.newEventText}>Create New Event</Text>
							<Icon
								color='white'
								name='arrow-right'
								type='simple-line-icon'
								underlayColor='transparent' />
						</View>
					</TouchableHighlight>
					<Text style={styles.existingEventText}>
						or add to existing event:
          </Text>
				</View>
				<View style={styles.bottomView}>

					{
						this.state.saving &&
						<Text style={styles.noEvents}>Saving...</Text>
					}

					{
						this.state.data.length > 0 ?
							<FlatList
								data={this.state.data}
								keyExtractor={item => item.id}
								renderItem={({ item }) => (
									<View style={styles.eventView}>
										<TouchableHighlight
											onPress={() => this.complete(item)}
											underlayColor='transparent'>
											<Text style={styles.eventText}>{item.title}</Text>
										</TouchableHighlight>
										<Icon
											color='white'
											name='add-circle-outline'
											onPress={() => this.complete(item)}
											underlayColor='transparent' />
									</View>
								)} /> :
							<Text style={styles.noEvents}>No existing events found</Text>
					}

				</View>
			</Modal>
		);
	}
}

const styles = StyleSheet.create({
	bottomView: {
		flex: 11,
		padding: 20
	},
	divider: {
		backgroundColor: 'white',
		height: 0.5,
		marginVertical: 10
	},
	eventText: {
		color: 'white',
		fontSize: 16
	},
	eventView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 5
	},
	existingEventText: {
		color: 'white',
		fontSize: 10,
		marginLeft: 20,
		padding: 10
	},
	newEventView: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 3
	},
	newEventText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold'
	},
	noEvents: {
		color: 'white',
		fontSize: 16,
		textAlign: 'center'
	},
	topView: {
		flex: 1,
		padding: 20
	}
});