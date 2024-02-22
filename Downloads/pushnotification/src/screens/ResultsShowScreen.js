import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import yelp from '../api/yelp';

const ResultsShowScreen = ({ navigation }) => {
  const [result, setResult] = useState(null);
  const id = navigation.getParam('id');

  const getResult = async id => {
    const response = await yelp.get(`/${id}`);
    setResult(response.data);
  };
  useEffect(() => {
    getResult(id);
  }, []);

  if (!result) {
    return null;
  }

  return (
    <View>
      <Text style={styles.header}>{result.name}</Text>
      <Text style={styles.subHeader}>{result.location.address1}</Text>
      <Text style={styles.detail}>Gallery:</Text>
      <FlatList
        data={result.photos}
        keyExtractor={photo => photo}
        renderItem={({ item }) => {
          return <Image style={styles.image} source={{ uri: item }} />;
        }}
      />
      <TouchableOpacity onPress = {() => alert('For more info: ')}>
        <Image
        source = {require('../../assets/contact-icon.png')}
        style = {{
          marginTop: 20,
          marginHorizontal: 30,
          justifyContent: "center",
          alignSelf: "center",
          width: 80,
          height: 80,
        }}
        />
        </TouchableOpacity>
        <Text style={styles.detail}>Contact & Apply! Click Here!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    marginTop: 10,
    marginLeft: 30,
    height: 200,
    width: 300,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50,
    marginLeft: 30, 
    fontFamily: "HelveticaNeue",
  },
  subHeader: {
    marginTop: 5,
    fontSize: 14,
    marginLeft: 30, 
    fontFamily: "HelveticaNeue",
  },
  detail: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'center',
    fontFamily: "HelveticaNeue",
  }
  
});

export default ResultsShowScreen;

