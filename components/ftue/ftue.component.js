import React, { Component } from 'react';
import {
	AsyncStorage,
	Image,
	StatusBar,
	TouchableWithoutFeedback
} from 'react-native';

import navigation from '../../services/navigation.service';
import session from '../../services/session.service';

module.exports = class FTUEComponent extends Component {
	constructor(props) {
		super(props);
		this.state = { i: 1 };
	}

	next = () => {
		if (this.state.i < 5) this.setState({ i: this.state.i + 1 });
		else {
			AsyncStorage.setItem('isFirstTime', "false")
				.then(session.logout)
				.catch(navigation.logout);
		};
	}

	render() {
		return (
			<TouchableWithoutFeedback onPress={this.next}>
				<Image
					source={images[`${this.state.i}`]}
					style={{ flex: 1, resizeMode: 'stretch', width: null }} >
					<StatusBar barStyle='light-content' hidden={false} />
				</Image>
			</TouchableWithoutFeedback>
		);
	}
}

const images = {
	'1': require(`../../images/ftue-1.png`),
	'2': require(`../../images/ftue-2.png`),
	'3': require(`../../images/ftue-3.png`),
	'4': require(`../../images/ftue-4.png`),
	'5': require(`../../images/ftue-5.png`),
};