import React, { Component } from 'react';
import {
	Alert,
	Keyboard,
	Image,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableHighlight,
	TouchableWithoutFeedback,
	View
} from 'react-native';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modalbox';

import http from '../../services/http.service';
import navigation from '../../services/navigation.service';
import session from '../../services/session.service';

export default class AccountSettingsComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			logoutModal: false,
			passwordModal: false,
			saving: false,
			settings: {
				email: '',
				tag: ''
			},
			uri: `${http.s3}/users/${session.username}`
		};

		this.passwords = {
			confirm: '',
			current: '',
			password: ''
		}
	}

	refreshImage = () => {
		this.setState({ uri: null });
		this.setState({ uri: `${http.s3}/users/${session.username}` });
		this.props.navigation.state.params.refreshImage();
	}

	updatePassword = () => {
		Keyboard.dismiss();
		if (this.passwords.password !== this.passwords.confirm) {
			Alert.alert('Error', 'Passwords do not match.');
			return;
		}

		if (!this.state.saving) {
			this.setState({ saving: true });

			http.put('/api/users/update-password', JSON.stringify(this.passwords))
				.then(() => {
					this.passwords = {
						confirm: '',
						current: '',
						password: ''
					};

					this.setState({
						passwordModal: false,
						saving: false
					});
				}).catch(error => {
					this.setState({ saving: false });
					Alert.alert('Error', typeof error === 'string' ? error : 'Oops, something went wrong.');
				});
		}
	}

	updateSettings = () => {
		Keyboard.dismiss();

		if (!this.state.saving) {
			this.setState({ saving: true });

			http.put('/api/users/update-settings', JSON.stringify(this.state.settings))
				.then(() => {
					this.setState({ saving: false });
				}).catch(error => {
					this.setState({ saving: false });
					Alert.alert('Error', typeof error === 'string' ? error : 'Oops, something went wrong.');
				});
		}
	}

	componentDidMount() {
		http.get('/api/users/get-my-settings')
			.then(data => {
				this.setState({
					settings: {
						email: data.email,
						tag: data.tag
					}
				});
			}).catch(error => {
				Alert.alert('Error', typeof error === 'string' ? error : 'Oops, something went wrong.');
			});
	}

	render() {
		return (
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={{ flex: 1 }}>

					{/* Header */}
					<View style={styles.header}>
						<View style={{ flex: 1 }}>
							<Icon
								name='angle-left'
								onPress={navigation.resetAccount}
								size={40}
								type='font-awesome'
								undelayColor='transparent' />
						</View>
						<View style={{ flex: 10 }}>
							<Text style={styles.text}>Settings</Text>
						</View>
						<View style={{ flex: 1 }} />
					</View>

					{/* Body */}
					<View style={styles.body}>

						{/* Picture */
							this.state.uri &&
							<TouchableHighlight
								onPress={() => this.props.navigation.navigate('AccountPictureComponent',
									{ refreshImage: this.refreshImage })}
								style={styles.pictureContainer}
								underlayColor='transparent'>
								<Image source={{
									cache: 'reload',
									uri: this.state.uri
								}} style={styles.picture} />
							</TouchableHighlight>
						}

						<Text style={{ textAlign: 'center' }}>{session.username}</Text>

						{/* Email */
							!session.isFacebookUser &&
							<View style={{ marginTop: 20 }}>
								<Text style={{ fontWeight: 'bold' }}>Email</Text>
								<View style={styles.inputView}>
									<TextInput
										autoCapitalize='none'
										autoCorrect={false}
										keyboardType='email-address'
										onChangeText={email => this.setState({
											settings: {
												...this.state.settings,
												email: email
											}
										})}
										style={styles.inputText}
										value={this.state.settings.email} />
								</View>
							</View>
						}

						{/* Tag */}
						<View style={{ marginTop: 20 }}>
							<Text style={{ fontWeight: 'bold' }}>Tagline</Text>
							<View style={styles.inputView}>
								<TextInput
									autoCapitalize='sentences'
									autoCorrect={true}
									onChangeText={tag => this.setState({
										settings: {
											...this.state.settings,
											tag: tag
										}
									})}
									style={styles.inputText}
									value={this.state.settings.tag} />
							</View>
						</View>

						{/* Save button */}
						<Text
							onPress={this.updateSettings}
							style={this.state.saving ? styles.saving : styles.save}>
							{this.state.saving && !this.state.passwordModal ? 'Saving...' : 'Save'}
						</Text>

						{/* Picture */}
						<Text
							onPress={() => this.props.navigation.navigate('AccountPictureComponent',
								{ refreshImage: this.refreshImage })}
							undelayColor='transparent'
							style={styles.text0}>
							Change Profile Picture
            </Text>

						{/* Password */
							!session.isFacebookUser &&
							<Text
								onPress={() => this.setState({ passwordModal: true })}
								style={styles.text1}
								underlayColor='transparent'>
								Change Password</Text>
						}

						{/* Logout */}
						<Text
							onPress={() => this.setState({ logoutModal: true })}
							style={styles.text1}
							underlayColor='transparent'>
							Logout</Text>

					</View>

					{/* Change password modal */}
					<Modal
						animationType={"slide"}
						isOpen={this.state.passwordModal}
						onClosed={() => {
							this.passwords = {
								confirm: '',
								current: '',
								password: ''
							};
							this.setState({
								passwordError: null,
								passwordModal: false
							});
						}}
						style={styles.passwordModal}>

						<Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Change Password</Text>

						<View style={{ marginTop: 20 }}>
							<View style={styles.inputView}>
								<TextInput
									autoCapitalize='none'
									autoCorrect={false}
									onChangeText={current => this.passwords.current = current}
									placeholder='current password'
									placeholderTextColor='gray'
									style={styles.inputText}
									secureTextEntry={true} />
							</View>
						</View>

						<View style={{ marginTop: 20 }}>
							<View style={styles.inputView}>
								<TextInput
									autoCapitalize='none'
									autoCorrect={false}
									onChangeText={password => this.passwords.password = password}
									placeholder='new password'
									placeholderTextColor='gray'
									style={styles.inputText}
									secureTextEntry={true} />
							</View>
						</View>

						<View style={{ marginTop: 20 }}>
							<View style={styles.inputView}>
								<TextInput
									autoCapitalize='none'
									autoCorrect={false}
									onChangeText={confirm => this.passwords.confirm = confirm}
									placeholder='confirm new password'
									placeholderTextColor='gray'
									style={styles.inputText}
									secureTextEntry={true} />
							</View>
						</View>

						<View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
							<Text
								onPress={this.updatePassword}
								style={this.state.saving ? styles.saving : styles.save}
								underlayColor='transparent'>
								{this.state.saving ? 'Saving...' : 'Save'}
							</Text>
							<Text
								onPress={() => this.setState({ passwordModal: false })}
								style={styles.save}
								underlayColor='transparent'>
								Cancel
            </Text>
						</View>

					</Modal>

					{/* Logout modal */}
					<Modal
						animationType={"slide"}
						isOpen={this.state.logoutModal}
						style={{ borderRadius: 10, height: 150, padding: 20, width: 300 }}>

						<Text style={{ textAlign: 'center' }}>Are you sure you want to logout?</Text>

						<View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
							<Text
								onPress={session.logout}
								style={styles.save}
								underlayColor='transparent'>
								Logout
            </Text>
							<Text
								onPress={() => this.setState({ logoutModal: false })}
								style={styles.save}
								underlayColor='transparent'>
								Cancel
            </Text>
						</View>

					</Modal>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
	avatarImage: {
		borderRadius: 30,
		height: 60,
		width: 60
	},
	body: {
		flex: 10,
		paddingHorizontal: 20
	},
	header: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
		marginTop: 20
	},
	inputText: {
		fontSize: 16,
		height: 30,
		textAlign: 'center'
	},
	inputView: {
		borderBottomColor: 'gray',
		borderBottomWidth: 0.5
	},
	passwordModal: {
		borderRadius: 10,
		height: 300,
		padding: 20,
		width: 300
	},
	picture: {
		borderRadius: 30,
		flex: 1
	},
	pictureContainer: {
		alignSelf: 'center',
		height: 60,
		width: 60
	},
	save: {
		alignSelf: 'center',
		borderColor: 'black',
		borderWidth: 0.5,
		borderRadius: 5,
		fontWeight: 'bold',
		marginTop: 20,
		padding: 7
	},
	saving: {
		alignSelf: 'center',
		fontWeight: 'bold',
		marginTop: 20,
		padding: 7
	},
	text: {
		fontSize: 16,
		textAlign: 'center'
	},
	text0: {
		fontWeight: 'bold',
		marginTop: 30
	},
	text1: {
		fontWeight: 'bold',
		marginTop: 10
	},
});

if (Platform.OS === 'android') {
	styles.inputText = {
		fontSize: 16,
		textAlign: 'center'
	};
	styles.inputView = undefined;
}