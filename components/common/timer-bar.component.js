import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const FeedTimerBarComponent = props => {
  const timerDownAnimation = new Animated.Value(1);
  const timerUpAnimation = new Animated.Value(0);

  let bars = [];
  for (let i = 0; i < props.length; i++) {
    bars.push(
      <View
        key={i}
        style={styles.bar}>
        {
          i === props.index ?
            <View style={styles.barView}>
              <Animated.View style={{
                backgroundColor: 'white',
                borderRadius: 5,
                flex: timerUpAnimation
              }} />
              <Animated.View style={{ flex: timerDownAnimation }} />
            </View> : null
        }
      </View>
    );
  }

  Animated.parallel([
    Animated.timing(timerDownAnimation, {
      duration: props.duration,
      toValue: 0
    }),
    Animated.timing(timerUpAnimation, {
      duration: props.duration,
      toValue: 1
    })
  ]).start();

  return (
    <View style={{ flexDirection: 'row' }}>{bars}</View>
  );
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

export default FeedTimerBarComponent;