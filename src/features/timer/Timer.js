import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, Vibration } from 'react-native';
import { ProgressBar } from 'react-native-paper';

import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from './Timing';

import { colors } from '../../utils/colors';
import { spacing } from '../../utils/sizes';

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  const [minutes, setMinutes] = useState(0.1);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const changeTime = (minutes) => {
    setMinutes(minutes);
    setProgress(1);
    setIsStarted(false);
  };

  const onEnd = () => {
    vibrate();
    setMinutes(1);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };

  return (
    <View style={style.container}>
      <View style={style.countdownContainer}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={setProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={style.headerContainer}>
        <Text style={style.title}>Focusing on:</Text>
        <Text style={style.task}>{focusSubject}</Text>
      </View>
      <ProgressBar
        color="black"
        style={{ height: 10, marginTop: spacing.sm }}
        progress={progress}
      />
      <View style={style.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={style.buttonWrapper}>
        <RoundedButton
          title={isStarted ? 'Pause' : 'Start'}
          size={80}
          onPress={() => setIsStarted((isStarted) => !isStarted)}
        />
      </View>
      <View style={style.clearSubject}>
        <RoundedButton title="-" size={50} onPress={() => clearSubject()} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdownContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    paddingTop: spacing.xxl,
  },
  title: {
    color: colors.black,
    textAlign: 'center',
  },
  task: {
    color: colors.black,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearSubject: {
    paddingBottom: spacing.md,
    paddingLeft: spacing.md,
  },
});
