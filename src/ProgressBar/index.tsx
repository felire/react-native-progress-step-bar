import React, { useEffect, useRef, useMemo } from 'react';
import { View, Animated, Text, StyleProp, ViewStyle } from 'react-native';

import usePrevious from './use-previous';

import styles from './styles';

interface ProgressBarDotsProps {
  steps: number;
  ranges?: string[];
  width: number;
  height: number;
  dotDiameter?: number;
  currentStep: number;
  backgroundBarStyle?: StyleProp<ViewStyle>;
  fillerBarStyle?: StyleProp<ViewStyle>;
  backgroundDotStyle?: StyleProp<ViewStyle>;
  filledDotStyle?: StyleProp<ViewStyle>;
  stepToStepAnimationDuration?: number;
  withDots?: boolean;
  rangeTextContainerWidth?: number;
  rangeText?: StyleProp<ViewStyle>;
  filledBarContainerStyle?: StyleProp<ViewStyle>;
}

interface AnimatedDotProps {
  isOnDot: boolean;
  range?: string;
  dotDiameter: number;
  backgroundDotStyle: StyleProp<ViewStyle>;
  filledDotStyle: StyleProp<ViewStyle>;
  stepToStepAnimationDuration: number;
  withDots: boolean;
  rangeTextContainerWidth: number;
  rangeText?: StyleProp<ViewStyle>;
}
const AnimatedDot = ({
  isOnDot,
  range,
  dotDiameter,
  backgroundDotStyle,
  filledDotStyle,
  stepToStepAnimationDuration,
  withDots,
  rangeTextContainerWidth,
  rangeText,
}: AnimatedDotProps) => {
  const animatedValue = useRef<Animated.Value>(
    new Animated.Value(isOnDot ? 1 : 0)
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
          delay: (stepToStepAnimationDuration * 9) / 10,
        }),
        Animated.timing(animatedValue.current, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isOnDot, prevIsOnDot, stepToStepAnimationDuration]);
  return (
    <View>
      {withDots && (
        <View
          style={[
            {
              width: dotDiameter,
              height: dotDiameter,
              borderRadius: dotDiameter,
            },
            backgroundDotStyle,
          ]}
        >
          <Animated.View
            style={[
              {
                width: dotDiameter,
                height: dotDiameter,
                borderRadius: dotDiameter,
                transform: [{ scale: animatedValue.current }],
              },
              filledDotStyle,
            ]}
          />
        </View>
      )}
      {range && (
        <View
          style={[
            {
              left:
                -(rangeTextContainerWidth / 2) +
                (withDots ? dotDiameter / 2 : 0),
              width: rangeTextContainerWidth,
            },
            styles.rangeContainer,
          ]}
        >
          <Text style={[styles.textRange, rangeText]}>{range}</Text>
        </View>
      )}
    </View>
  );
};
const ProgressBarDots = ({
  ranges,
  steps,
  dotDiameter = 12,
  height,
  width,
  currentStep,
  backgroundBarStyle = styles.defaultBackgroundBar,
  fillerBarStyle = styles.defaultFilledBar,
  filledBarContainerStyle,
  backgroundDotStyle = styles.defaultBackgroundDot,
  filledDotStyle = styles.defaultFilledDot,
  rangeText,
  rangeTextContainerWidth = 40,
  stepToStepAnimationDuration = 1000,
  withDots = true,
}: ProgressBarDotsProps) => {
  const animatedValue = useRef<Animated.Value>(new Animated.Value(0));

  const interpolatedDistance = animatedValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width],
  });
  const stepAnimatedSize = useMemo(() => 1 / steps, [steps]);
  const numberOfDots = steps + 1;
  const dotsList = [...Array(numberOfDots).keys()];

  useEffect(() => {
    Animated.timing(animatedValue.current, {
      toValue: currentStep * stepAnimatedSize,
      useNativeDriver: true,
      duration: stepToStepAnimationDuration,
    }).start();
  }, [currentStep, stepAnimatedSize, stepToStepAnimationDuration]);

  const filledBarTranslationX = Animated.subtract(interpolatedDistance, width);
  return (
    <View
      style={[
        {
          width,
          height,
        },
        backgroundBarStyle,
      ]}
    >
      {(withDots || ranges) && (
        <View
          style={[
            {
              height,
              width,
            },
            styles.dotsContainer,
          ]}
        >
          {dotsList.map((index) => (
            <View key={index}>
              <AnimatedDot
                isOnDot={index <= currentStep}
                range={ranges ? ranges[index] : undefined}
                dotDiameter={dotDiameter}
                backgroundDotStyle={backgroundDotStyle}
                filledDotStyle={filledDotStyle}
                withDots={withDots}
                stepToStepAnimationDuration={stepToStepAnimationDuration}
                rangeText={rangeText}
                rangeTextContainerWidth={rangeTextContainerWidth}
              />
            </View>
          ))}
        </View>
      )}
      <View
        style={[
          {
            width,
            height,
          },
          filledBarContainerStyle,
          styles.filledBarContainer,
        ]}
      >
        <Animated.View
          style={[
            {
              width,
              height,
              transform: [{ translateX: filledBarTranslationX }],
            },
            fillerBarStyle,
          ]}
        />
      </View>
    </View>
  );
};

export default ProgressBarDots;
