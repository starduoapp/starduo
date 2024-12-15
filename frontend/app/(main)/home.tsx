import {Pressable, Image, Text, StyleSheet, Platform, View, TextInput} from 'react-native';
import {useState} from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import {useFonts} from 'expo-font';
import { useRouter } from 'expo-router'; 

export default function HomeScreen () {
    let [fontsLoaded] = useFonts({
        'KhulaSemiBold': require('@/assets/fonts/Khula-SemiBold.ttf')
      });
      return (
        <View style={{flex:1, alignItems:"center"}}>
            <LinearGradient
                colors={[
                '#FFD1D1',
                '#E8F1F4',
                '#DEF1FF']}
                locations={
                    [0, 0.44, 0.91]
                }
                style={StyleSheet.absoluteFillObject}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}/>
            <View style={styles.container}>
                <Text style={styles.headerText}>Calendar </Text>
            </View>
            <View style={[styles.container, {marginTop:20}]}>
                <Text style={[styles.headerText]}> Messages</Text>
            </View>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        width: "90%",
        borderRadius: 20,
        backgroundColor: "white",
        height: "39%",
        marginTop: "18%",
    },
    headerText: {
        fontFamily: "KhulaSemiBold",
        fontSize: 30,
        margin: 15,
        color: "#646464",
        borderBottomColor: '#646464',
        borderBottomWidth: 2,
    }
})