import React, { Component } from 'react';
import {
	Image,
	StatusBar,
	StyleSheet,
	Text,
	View
} from 'react-native';
import { Icon } from 'react-native-elements';
import Video from 'react-native-video';

import CreatePreviewModalComponent from './create-preview-modal.component';

import http from '../../services/http.service';
import navigation from '../../services/navigation.service';

export default class CreatePreviewComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			events: [],
			paused: false,
			showModal: false
		};
	}

	componentDidMount() {
		http.get('/api/events/get-upcoming-associated-events')
			.then(events => this.setState({ events: events }))
			.catch(() => { });
	}

	render() {
		const { params } = this.props.navigation.state;
		return (
			<View style={{ flex: 1 }}>
				<StatusBar hidden={true} />

				{
					params.isVideo ?
						<Video
							ignoreSilentSwitch='obey'
							paused={this.state.paused}
							playWhenInactive={true}
							repeat={true}
							resizeMode='cover'
							source={{ uri: params.story }}
							style={styles.background} /> :
						<Image style={styles.background} source={{ uri: params.story }} />
				}

				{
					this.state.showModal ?
						<CreatePreviewModalComponent
							events={this.state.events}
							goBack={this.props.navigation.goBack}
							hideModal={() => this.setState({ showModal: false })}
							isVideo={params.isVideo}
							key={params.key}
							navigate={this.props.navigation.navigate}
							pause={() => this.setState({ paused: true })}
							play={() => this.setState({ paused: false })}
							story={params.story}
						/> : (
							<View style={{ flex: 1, justifyContent: 'space-between' }}>
								<Icon
									color='white'
									name='clear'
									onPress={navigation.resetCreate}
									size={40}
									style={styles.clearIcon}
									underlayColor='transparent' />
								<Icon
									color='white'
									name='angle-right'
									onPress={() => this.setState({ showModal: true })}
									size={60}
									style={styles.arrowIcon}
									type='font-awesome'
									underlayColor='transparent' />
							</View>
						)
				}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	arrowIcon: {
		alignSelf: 'flex-end',
		padding: 20
	},
	background: {
		bottom: 0,
		left: 0,
		position: 'absolute',
		right: 0,
		top: 0
	},
	clearIcon: {
		alignSelf: 'flex-start',
		marginTop: 20
	}
});
