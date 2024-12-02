import React, { useRef, useEffect }from 'react';
import { View, Image, Text, StyleSheet, Animated } from 'react-native';
import { Svg, Path, Defs, RadialGradient, Stop } from 'react-native-svg';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Titlescreen() {
    let [fontsLoaded] = useFonts({
        'LeckerliOne': require('@/assets/fonts/LeckerliOne-Regular.ttf'),
    });
    const progress = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(progress, {
          toValue: 100,
          duration: 5000,
          useNativeDriver: false, 
        }).start();
      }, [progress]);
    
      const progressBarWidth = progress.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
      });
    
    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
    }

    return (
        <SafeAreaView style={styles.titlescreenContainer}>
            <LinearGradient
                colors={['rgba(177, 217, 242, 0.61)', 'rgba(207, 231, 246, 0.61)', 'rgba(234, 243, 250, 0.61)']}
                style={StyleSheet.absoluteFillObject}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            />
            <Image
                source={require('@/assets/images/starduo.png')} 
                style={styles.starduoImage}
            />
            <Svg style={styles.line4} width="214" height="67" viewBox="0 0 214 67" fill="none">
                <Path 
                    d="M3.76003 63.8402C20.9499 -10.7642 128.025 -10.0286 210.4 34.3202" 
                    stroke="#FFC736" 
                    strokeOpacity="1" 
                    strokeWidth="6" 
                    strokeLinecap="round" 
                />
            </Svg>

            <Text style={styles.starDuo}>
                StarDuo
            </Text>
            <Svg style={styles.star2} width="42" height="53" viewBox="0 0 42 53" fill="none">
                <Path 
                    d="M19.0423 2.36841C19.4856 0.247208 22.5144 0.247217 22.9577 2.36841L26.1572 17.6792C26.2889 18.3094 26.7158 18.8376 27.3043 19.0985L39.8757 24.6716C41.4616 25.3747 41.4616 27.6253 39.8757 28.3284L27.3043 33.9015C26.7158 34.1624 26.2889 34.6906 26.1572 35.3208L22.9577 50.6316C22.5144 52.7528 19.4856 52.7528 19.0423 50.6316L15.8428 35.3208C15.7111 34.6906 15.2842 34.1624 14.6957 33.9015L2.12432 28.3284C0.538397 27.6253 0.538393 25.3747 2.12432 24.6716L14.6957 19.0985C15.2842 18.8376 15.7111 18.3094 15.8428 17.6792L19.0423 2.36841Z" 
                    fill="url(#paint0_radial_62_52)" 
                />
                <Defs>
                    <RadialGradient id="paint0_radial_62_52" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(21 26.5) rotate(90) scale(33.5 23)">
                        <Stop stopColor="#FDF39A" />
                        <Stop offset="0.362066" stopColor="#FFDB5D" stopOpacity="0.8" />
                        <Stop offset="1" stopColor="#FFC736" stopOpacity="0.8" />
                    </RadialGradient>
                </Defs>
            </Svg>
            <View style={styles.progressBarContainer}>
                <Animated.View style={[styles.progressBar, { width: progressBarWidth }]} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    titlescreenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'linear-gradient(180deg, rgba(177, 217, 242, 0.61) 0%, rgba(207, 231, 246, 0.61) 80.15%, rgba(234, 243, 250, 0.61) 100%)'
    },
    gradientBackground: {
        ...StyleSheet.absoluteFillObject,
      },
    starduoImage: {
        width: 400,
        height: 400,
        position: "absolute",
        top: 150, 
        left: 30,
        right: 30, 
        resizeMode: "contain", 
        flexShrink: 0, 
    },
    line4: {
        position: "absolute",
        top: 438,
        left: 135,

    },
    starDuo: {
        width:366,
        height:100,
        position: "absolute",
        top: 430,
        textAlign: "center",
        color: "rgba(59, 68, 86, 1)",
        fontFamily: "LeckerliOne",
        fontSize: 80,
        fontWeight: "400",
    },
    star2: {
        position: "absolute",
        top: 465,
        left: '75%',
    },
    progressBarContainer: {
        position: 'absolute',
        bottom: 240, 
        width: 367,
        height: 22,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        overflow: 'hidden',
      },
      progressBar: {
        height: '100%',
        backgroundColor: '#A2D4F3',
        borderRadius: 20,
      },
});
