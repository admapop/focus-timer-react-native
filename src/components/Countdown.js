import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';

import { fontSizes, spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

const minutesToMillis = (min) => min * 60 * 1000;

const formatTime = (millis) => {
  const minutes = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;
  return {
    minutes: minutes < 10 ? `0${minutes}` : minutes,
    seconds: seconds < 10 ? `0${seconds}` : seconds,
  };
};

export const Countdown = ({ minutes = 0.1, isPaused, onProgress, onEnd }) => {
  useKeepAwake();

  const [millis, setMillis] = useState(minutesToMillis(minutes));

  const interval = useRef(null);

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }

    onProgress(millis / minutesToMillis(minutes));

    if (millis === 0) {
      clearInterval(interval.current);
      onEnd();
      return;
    }

    interval.current = setInterval(() => {
      setMillis((millis) => millis - 1000);
    }, 1000);

    return () => clearInterval(interval.current);
  }, [millis, isPaused, minutes, onProgress]);

  return (
    <View>
      <Text style={style.text}>
        {formatTime(millis).minutes}:{formatTime(millis).seconds}
      </Text>
    </View>
  );
};

const style = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    padding: spacing.lg,
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
  },
});
