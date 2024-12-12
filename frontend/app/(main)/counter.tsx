import { View, Image, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import {Dimensions} from 'react-native';
import PurplePlanet from '@/assets/images/purplePlanet.svg';
import PinkPlanet from '@/assets/images/pinkPlanet.svg';
import Star1 from '@/assets/images/star1.svg';
import Star2 from '@/assets/images/star2.svg';
import Arrow from '@/assets/images/arrowUp.svg';
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import React from "react";
import Animated, {Easing, useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";

const windowHeight = Dimensions.get('window').height;
const ratio = Math.min(Dimensions.get('window').width, Dimensions.get('window').height);

export default function CounterScreen() {
  let [fontsLoaded] = useFonts({
    'DynaPuffRegular': require('@/assets/fonts/DynaPuff-Regular.ttf'),
    'Chilanka': require('@/assets/fonts/Chilanka-Regular.ttf')
  });
  const y = useSharedValue(0);
  const vy = useSharedValue(0);
  const active = useSharedValue(true);
  const inView = useSharedValue(true);
  const animatedContainerStyle = useAnimatedStyle(() => {
    return {transform: [{translateY: withTiming(y.value, {duration: active.value?50:200, easing: Easing.linear}) }]};
  });
  const panGesture = Gesture.Pan()
    .onStart(() => {
      active.value = true;
    })
    .onChange((e: any) => {
      if (e.translationY < 0 && inView.value) {
        y.value = e.translationY;
        vy.value = e.velocityY;
      } else if (e.translationY > 0 && !inView.value) {
        y.value = -windowHeight + e.translationY;
        vy.value = e.velocityY;
      }
    })
    .onEnd(() => {
      if ((y.value > -windowHeight/2 && vy.value > -40) || (y.value > windowHeight/2 || vy.value > 40)) {
        y.value = 0;
        inView.value = true;
      } else {
        y.value = -windowHeight;
        inView.value = false;
      }
      active.value = false;
    });
  return (
    <Animated.View style={[styles.container, animatedContainerStyle]}>
      <LinearGradient
        colors={[
          '#9bbafd',
          '#e8f1f4']}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}/>
      <Star1 style={{position: "absolute", top: "40%", left: "10%"}} width={40} height={40}/>
      <Star1 style={{position: "absolute", top: "10%", left: "85%"}} width={40} height={40}/>
      <Star1 style={{position: "absolute", top: "53%", left: "80%"}} width={41} height={66}/>
      <Star2 style={{position: "absolute", top: "85%", left: "20%"}} width={41} height={66}/>
      <Star2 style={{position: "absolute", top: "80%", left: "86%"}} width={40} height={40}/>
      <Star2 style={{position: "absolute", top: "45%", left: "45%"}} width={41} height={66}/>
      <PurplePlanet width={ratio*0.7} height={ratio*0.7} style={styles.purplePlanet}/>
      <PinkPlanet width={ratio} height={ratio} style={styles.pinkPlanet}/>
      <View style={{flex: 1, gap: 14, flexDirection: "row", justifyContent: "center", position: "absolute", bottom: 40, left: "50%", transform: [{translateX: "-50%"}]}}>
        <Text style={styles.orbitText}>Swipe up</Text>
        <Arrow width={25} height={25} />
      </View>
      <View style={{position:"absolute", bottom:"25%", width:"80%", left: "10%"}}>
        <Text style={styles.dearText}>Dear <Text style={{color:"#4366AAFF"}}>Planet B612</Text>,</Text>
        <Text style={styles.orbitText}>You have been orbiting
          with <Text style={{color:"#4366AAFF"}}>Planet ABC</Text> for
          <Text style={{color:"#4366AAFF", fontSize:30}}> 100</Text> days
        </Text>
      </View>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={{position: "absolute", width: "100%", height: windowHeight+100, top: 0}}/>
      </GestureDetector>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    position: "sticky",
    flex: 1,
    zIndex: 3
  },
  pinkPlanet: {
    position: "absolute",
    top:"-10%",
    left:"-20%",
  },
  purplePlanet: {
    position:"absolute",
    top:"20%",
    left: ratio*0.5,
  },
  dearText: {
    fontFamily: "DynaPuffRegular",
    fontSize:25,
    marginBottom: 15
  },
  orbitText: {
    fontFamily: "Chilanka",
    fontSize:25,
    color:"black",
    lineHeight:40
  }
});