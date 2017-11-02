import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Modal from 'react-native-modalbox';
import { MessageBarManager } from 'react-native-message-bar';

import http from '../../services/http.service';
import reset from '../../services/reset.service';

export default class ReportModalComponent extends Component {
	report = () => {
		http.post('/api/users/report', JSON.stringify({ event: this.props.event }))
			.then(() => {
				MessageBarManager.showAlert({
					alertType: 'custom',
					message: 'Report successfully sent and awaiting review.',
					stylesheetExtra: { backgroundColor: '#f74434' },
					viewTopInset: 20
				});
				reset.resetAccount();
				reset.resetFeed();
			}).catch(() => {
				MessageBarManager.showAlert({
					alertType: 'custom',
					message: 'Failed to send report.',
					messageStyle: { color: 'black' },
					stylesheetExtra: { backgroundColor: 'yellow' },
					viewTopInset: 20
				});
			});
	}

	render() {
		return (
			<Modal
				isOpen={true}
				onClosed={this.props.hideModal}
				style={{ borderRadius: 10, height: 300, padding: 20, width: 300 }}
				swipeToClose={false}>

				<View style={{ alignItems: 'center' }}>
					<Text style={{ fontSize: 16, textAlign: 'center' }}>Report Inappropriate Content</Text>
					<Text style={{ marginTop: 20 }}>
						Would you like to flag this post for inappropriate content (i.e. nudity, pornography,
						offensive language)? You will no longer be able to view this event in your feed.
						Inappropriate content will be removed and users continuing to violate
						the terms of agreement will be banned.
					</Text>
					<Text
						onPress={this.report}
						style={{ borderColor: 'black', borderRadius: 5, borderWidth: 0.5, marginTop: 20, padding: 7 }}>
						Send report
        	</Text>
					<Text onPress={this.props.hideModal} style={{ marginTop: 20 }}>Cancel</Text>
				</View>

			</Modal>
		);
	}
}