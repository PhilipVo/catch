const Contacts = require('react-native-contacts');
import React, { Component } from 'react';
import {
	ActivityIndicator,
	Alert,
	FlatList,
	Keyboard,
	Text,
	TextInput,
	TouchableHighlight,
	TouchableWithoutFeedback,
	View
} from 'react-native';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modalbox';
import SendSMS from 'react-native-sms';
import { Observable } from 'rxjs/Observable';

import http from '../../services/http.service';
import session from '../../services/session.service';

export default class InviteModalComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [],
			loading: true
		};
	}

	componentDidMount() {
		http.get(`/api/contacts/get-uninvited-contacts-for-event/${this.props.event.id}`)
			.then(data => {
				this.setState({
					data: data,
					loading: false
				});
			}).catch(() => { });
	}

	invite = (item, index) => {
		const data = this.state.data.slice();
		if (item.contact) {
			http.post(`/api/contributors`, JSON.stringify({
				contributor: item.contact,
				event: this.props.event
			})).then(() => {
				data[index].status = 'Invited!';
				this.setState({ data: data });
			}).catch(error => {
				data[index].status = 'Invite failed...';
				this.setState({ data: data });
			});
		} else {
			try {
				SendSMS.send({
					body: `${session.username} invited you as a contributor for ${this.props.event.title}! itms-apps://itunes.apple.com/app/id1246628137`,
					recipients: [item.phoneNumbers[0].number],
					successTypes: ['sent', 'queued']
				}, (completed, cancelled, error) => {
					if (completed) {
						data[index].status = 'Invited!';
						this.setState({ data: data });
					} else {
						data[index].status = 'Invite failed...';
						this.setState({ data: data });
					}
				});
			} catch (error) { }
		}
	}

	search = term => {
		if (this.subscription) {
			this.subscription.unsubscribe();
			this.subscription = undefined;
		}

		this.subscription = Observable.create(observer => {
			if (term.length === 0)
				http.get(`/api/contacts/get-uninvited-contacts-for-event/${this.props.event.id}`)
					.then(data => observer.next(data))
					.catch(() => { });
			else Contacts.getContactsMatchingString(term, (error, contacts) => {
				if (error) { }
				else observer.next(contacts);
			});
		}).subscribe(contacts => {
			const data = JSON.parse(JSON.stringify(contacts));
			this.setState({
				data: data,
				loading: false
			});
		});
	}

	render() {
		return (
			<Modal
				isOpen={true}
				onClosed={this.props.hideModal}
				style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
				swipeToClose={false}>
				<View style={{ flex: 1, marginTop: 20 }}>
					<View style={{ flex: 10 }}>

						<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
							<View style={{ flex: 1 }}>
								<Icon
									color='white'
									name='clear'
									onPress={this.props.hideModal}
									size={20}
									style={{ alignSelf: 'flex-start' }}
									underlayColor='transparent' />
							</View>
							<View style={{ flex: 2 }}>
								<Text style={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
									Invite contributors to
              </Text>
								<Text style={{
									color: 'white',
									fontSize: 16,
									fontWeight: 'bold',
									textAlign: 'center'
								}}>
									{this.props.event.title}
								</Text>
							</View>
							<View style={{ flex: 1 }} />
						</View>

						<TextInput
							autoCapitalize='none'
							autoCorrect={false}
							onChangeText={this.search}
							placeholder='search address book'
							placeholderTextColor='gray'
							style={{
								borderColor: 'white',
								borderWidth: 0.5,
								color: 'white',
								fontSize: 14,
								height: 30,
								marginHorizontal: 50,
								marginTop: 20,
								padding: 5,
								textAlign: 'center'
							}} />

						{
							this.state.loading ?
								<ActivityIndicator /> :
								this.state.data.length > 0 ?
									<FlatList
										data={this.state.data}
										extraData={this.state}
										keyExtractor={(item, index) => `${index}`}
										renderItem={({ item, index }) => (
											<View style={{
												alignItems: 'center',
												flexDirection: 'row',
												justifyContent: 'space-between',
												padding: 5
											}}>

												{
													item.contact ?
														<Text style={{ color: 'white', fontSize: 16 }}>
															{item.contact}
														</Text> :
														<Text style={{ color: 'white', fontSize: 16 }}>
															{item.givenName} {item.familyName}
														</Text>
												}

												<TouchableHighlight
													onPress={() => this.invite(item, index)}
													underlayColor='transparent'>
													{
														item.status ?
															<Text
																style={{
																	alignItems: 'center',
																	color: '#f74434',
																	padding: 5
																}}>
																{item.status}
															</Text> :
															<Text
																onPress={() => this.invite(item, index)}
																style={{
																	alignItems: 'center',
																	borderColor: 'white',
																	borderRadius: 5,
																	borderWidth: 0.5,
																	color: 'white',
																	padding: 5
																}}>
																Invite
                              </Text>
													}
												</TouchableHighlight>
											</View>
										)}
										style={{ padding: 20 }} /> :
									<Text style={{ color: 'gray', textAlign: 'center' }}>
										No contacts found
                  </Text>
						}
					</View>
				</View>

			</Modal>
		);
	}
}