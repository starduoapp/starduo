import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../assets/colors/colors';

const SettingsScreen = () => {
  const [hours, setHours] = useState('');

  const saveHours = async () => {
    try {
      await AsyncStorage.setItem('userHours', hours);
      alert('Hours updated successfully!');
    } catch (e) {
      alert('Failed to save hours.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Your Volunteer Hours Goal</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Enter Total Hours"
        placeholderTextColor = 'gray' // Made Placeholder Text Visible
        value={hours}
        onChangeText={setHours}
        keyboardType="numeric"
      />
      <Button title="Save" onPress={saveHours} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
  },
  input: {
    width: '90%',
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 10,
    borderColor: colors.primary,
  },
});

export default SettingsScreen;
