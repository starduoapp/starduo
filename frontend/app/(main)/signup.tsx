import {Pressable, Image, Text, StyleSheet, Platform, View, TextInput} from 'react-native';
import {useState} from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import {useFonts} from 'expo-font';
import { useRouter } from 'expo-router'; 

export default function loginPage(){
    const [text, onChangeText] = useState('Useless Text');
    const [fontsLoaded] = useFonts({
        'KhulaSemiBold': require('@/assets/fonts/Khula-SemiBold.ttf'),
        'DynaPuffRegular': require('@/assets/fonts/DynaPuff-Regular.ttf')
      });
    const router = useRouter(); 
    const handleCounter = () => {router.push('/counter');};

    return (
        <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
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
            <View style={styles.signinContainer}>
                <Text style={{fontFamily:"DynaPuffRegular", color:"#4366AAFF", fontSize:35}}>Create Account</Text>
                <Text style={{fontFamily:"DynaPuffRegular", color:"#4366AAFF", fontSize:20, marginTop:30}}>Email:</Text>
                <TextInput style={styles.inputField}/>
                <Text style={{fontFamily:"DynaPuffRegular", color:"#4366AAFF", fontSize:20, marginTop:30}}>Username:</Text>
                <TextInput style={styles.inputField}/>
                <Text style={{fontFamily:"DynaPuffRegular", color:"#4366AAFF", fontSize:20, marginTop:30}}>Password:</Text>
                <TextInput secureTextEntry={true} style={styles.inputField}/>
                <Pressable style={styles.signinButton} onPress={handleCounter}>
                    <Text style={styles.signinText}>Register</Text>
                </Pressable>
            </View>
            
        </View>
    )
}

const styles=StyleSheet.create({
    signinText: {
        fontFamily: "DynaPuffRegular",
        color: "white",
        fontSize: 20,
    },
    signinButton: {
        backgroundColor:"#4366AAFF",
        borderRadius:10,
        paddingVertical: 10,
        paddingHorizontal:5,
        alignItems:"center",
        marginTop: 20,
    },
    signinContainer: {
        width:"80%",
        height:"50%",
        justifyContent:"center"
    },
    inputField: {
        fontFamily:"DynaPuffRegular",
        backgroundColor: "white",
        color: "black",
        fontSize:18,
        borderWidth:1,
        borderColor: "#D6EAF8",
        borderRadius: 10,
        marginVertical:10,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
})