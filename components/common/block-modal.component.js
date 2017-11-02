import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Modal from 'react-native-modalbox';

import http from '../../services/http.service';
import reset from '../../services/reset.service';

export default class BlockModalComponent extends Component {
	block = () => {
		http.get(`/api/blocks/block-user/${this.props.username}`)
			.then(() => {
				reset.resetAccount();
				reset.resetFeed();
			}).catch(() => { });
	}

	render() {
		return (
			<Modal
				isOpen={true}
				onClosed={this.props.hideModal}
				style={{ borderRadius: 10, height: 250, padding: 20, width: 300 }}
				swipeToClose={false}>

				<View style={{ alignItems: 'center' }}>
					<Text style={{ fontSize: 16, textAlign: 'center' }}>Block User</Text>
					<Text style={{ marginTop: 20 }}>
						{
							`Are you sure you want to block ${this.props.username}? You will no longer ` +
							`see any content posted by ${this.props.username}.`
						}
					</Text>
					<Text
						onPress={this.block}
						style={{ borderColor: 'black', borderRadius: 5, borderWidth: 0.5, marginTop: 20, padding: 7 }}>
						Block user
					</Text>
					<Text onPress={this.props.hideModal} style={{ marginTop: 20 }}>Cancel</Text>
				</View>

			</Modal>
		);
	}
}