import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Animated, TouchableOpacity, Text } from 'react-native';

import usePrevious from './use-previous';

import styles from './styles';

interface ProgressBarDots {
  steps: number;
  ranges: number[];
  width: number;
  height: number;
  dotDiameter: number;
}

interface AnimatedDot {
  isOnDot: boolean;
  range: number;
  dotDiameter: number;
}
const AnimatedDot = ({ isOnDot, range, dotDiameter }: AnimatedDot) => {
  const animatedValue = useRef<Animated.Value>(
    new Animated.Value(isOnDot ? 1 : 0),
  );
  const prevIsOnDot = usePrevious(isOnDot, isOnDot);

  useEffect(() => {
    if (prevIsOnDot && !isOnDot) {
      Animated.timing(animatedValue.current, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
    if (!prevIsOnDot && isOnDot) {
      Animated.sequence([
        Animated.timing(animatedValue.current, {
          toValue: 1.33,
          duration: 500,
          useNativeDriver: true,
          delay: 900,
        }),
        Animated.timing(animatedValue.current, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isOnDot]);
  return (
    <View>
      <View
        style={{
          backgroundColor: '#00FFFF',
          width: dotDiameter,
          height: dotDiameter,
          borderRadius: dotDiameter,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Animated.View
          style={{
            backgroundColor: 'white',
            width: dotDiameter,
            height: dotDiameter,
            borderRadius: dotDiameter,
            transform: [{ scale: animatedValue.current }],
          }}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          left: -14,
          width: 40,
          bottom: -25,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: 'white',
            width: 40,
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {range}
        </Text>
      </View>
    </View>
  );
};
const ProgressBarDots = ({
  ranges,
  steps,
  dotDiameter,
  height,
  width,
}: ProgressBarDots) => {
  const [currentStep, setCurrentStep] = useState(0);
  const animatedValue = useRef<Animated.Value>(new Animated.Value(0));

  const interpolatedDistance = animatedValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width],
  });
  const stepAnimatedSize = 1 / steps;
  const numberOfDots = steps + 1;
  const dotsDistance = width / steps - dotDiameter;
  const dotsList = [...Array(numberOfDots).keys()];
  const handlePrevStep = useCallback(() => {
    setCurrentStep(prevStep => prevStep - 1);
  }, []);

  const handleNextStep = useCallback(() => {
    setCurrentStep(prevStep => prevStep + 1);
  }, []);

  useEffect(() => {
    Animated.timing(animatedValue.current, {
      toValue: currentStep * stepAnimatedSize,
      useNativeDriver: true,
      duration: 1000,
    }).start();
  }, [currentStep]);

  const filledBarTranslationX = Animated.subtract(interpolatedDistance, width);
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <View
        style={{
          width,
          height,
          backgroundColor: '#00FFFF',
        }}
      >
        <View
          style={{
            position: 'absolute',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height,
            width,
            zIndex: 1,
          }}
        >
          {dotsList.map(index => (
            <View key={index}>
              <AnimatedDot
                isOnDot={index <= currentStep}
                range={ranges[index]}
                dotDiameter={dotDiameter}
              />
            </View>
          ))}
        </View>
        <View
          style={{
            width,
            height,
            overflow: 'hidden',
          }}
        >
          <Animated.View
            style={{
              width,
              height,
              backgroundColor: 'white',
              transform: [{ translateX: filledBarTranslationX }],
            }}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: 400,
          marginTop: 40,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          onPress={handlePrevStep}
          style={{ backgroundColor: 'green', marginRight: 30 }}
        >
          <Text>PrevStep</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNextStep}
          style={{ backgroundColor: 'green' }}
        >
          <Text>NextStep</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProgressBarDots;
