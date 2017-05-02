import React from 'react';
import { Animated, View } from 'react-native';

const FeedTimerBarComponent = props => {
  console.log('ftimer')
  const story = props.story;
  const timerDownAnimation = new Animated.Value(1);
  const timerUpAnimation = new Animated.Value(0);

  let bars = [];

  Animated.parallel([
    Animated.timing(timerDownAnimation, {
      toValue: 0,
      duration: props.duration
    }),
    Animated.timing(timerUpAnimation, {
      toValue: 1,
      duration: props.duration
    })
  ]).start();

  for (let i = 0; i < props.length; i++) {
    bars.push(
      <View
        key={i}
        style={{
          flex: 1,
          borderRadius: 5,
          height: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          marginHorizontal: 1,
        }}>
        {
          i === props.index ?
            <View style={{
              flex: 1,
              borderRadius: 5,
              flexDirection: 'row'
            }}>
              <Animated.View style={{
                backgroundColor: 'white',
                borderRadius: 5,
                flex: timerUpAnimation
              }} />
              <Animated.View style={{
                flex: timerDownAnimation
              }} />
            </View> : null
        }
      </View>
    );
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      {bars}
    </View>
  );
}

export default FeedTimerBarComponent;