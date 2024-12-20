import { Tabs } from 'expo-router';
import React from 'react';
import {StyleSheet, Platform, View} from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import CounterScreen from "./counter";
import Loadingscreen from './loading';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={styles.container}>
      <Loadingscreen/>
      <View style={[styles.container, StyleSheet.absoluteFill]}>
        <Tabs
          screenOptions={({ route }: any) => ({
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarBackground: TabBarBackground,
            tabBarStyle: Platform.select({
              ios: {
                position: "absolute",
                display: route.name === 'homepage' ? 'none' : 'flex',
              },
              default: {},
            }),
          })}>
          <Tabs.Screen
            name="counter"
            options={{
              href: null
            }}
          />
        </Tabs>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    height: "100%",
    width: "100%",
  }
})