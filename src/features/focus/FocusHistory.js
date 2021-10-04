import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Platform,
} from 'react-native';

import { RoundedButton } from '../../components/RoundedButton';

import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';

const HistoryItem = ({ item, index }) => (
  <Text key={index} style={style.historyItem(item.status)}>{item.subject}</Text>
);

export const FocusHistory = ({ focusHistory, onClear }) => {
  return (
    <>
      <SafeAreaView style={style.container}>
        {!!focusHistory.length && (
          <>
            <Text style={style.title}>Things we've focused on</Text>
            <FlatList
              style={style.list}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={style.clearContainer}>
              <RoundedButton size={75} title="Clear" onPress={onClear} />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  list: {
    width: '100%',
    height: '100%',
  },
  historyItem: (status) => ({
    color: status > 1 ? colors.red : colors.green,
    fontSize: fontSizes.md,
  }),
  title: {
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
  },
  clearContainer: {
    alignItems: 'center',
    padding: spacing.md,
  },
});
