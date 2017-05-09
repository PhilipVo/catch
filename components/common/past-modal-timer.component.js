import React, { Component } from 'react';
import {
  Animated,
  StyleSheet,
  View
} from 'react-native';

export default class PastModalTimerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerDownAnimation: new Animated.Value(1),
      timerUpAnimation: new Animated.Value(0)
    };
  }

  componentDidMount() {
    Animated.parallel([
      Animated.timing(this.state.timerDownAnimation, {
        duration: this.props.duration,
        toValue: 0
      }),
      Animated.timing(this.state.timerUpAnimation, {
        duration: this.props.duration,
        toValue: 1
      })
    ]).start();
  }

  componentWillReceiveProps() {
    this.setState({
      timerDownAnimation: new Animated.Value(1),
      timerUpAnimation: new Animated.Value(0)
    });
  }

  componentDidUpdate() {
    Animated.parallel([
      Animated.timing(this.state.timerDownAnimation, {
        duration: this.props.duration,
        toValue: 0
      }),
      Animated.timing(this.state.timerUpAnimation, {
        duration: this.props.duration,
        toValue: 1
      })
    ]).start();
  }

  render() {
    let bars = [];
    for (let i = 0; i < this.props.length; i++) {
      bars.push(
        <View
          key={i}
          style={styles.bar}>
          {
            i === this.props.index ?
              <View style={styles.barView}>
                <Animated.View style={{
                  backgroundColor: 'white',
                  borderRadius: 5,
                  flex: this.state.timerUpAnimation
                }} />
                <Animated.View style={{ flex: this.state.timerDownAnimation }} />
              </View> : null
          }
        </View>
      );
    }

    return (
      <View style={{ flexDirection: 'row' }}>{bars}</View>
    );
  }
}

const styles = StyleSheet.create({
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
  }
});