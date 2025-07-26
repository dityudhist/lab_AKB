import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';
import Foundation from '@expo/vector-icons/Foundation';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';

const Tugas6 = () => {
  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <Text style={styles.heading}>Tugas 6</Text>
      <Text style={styles.subheading}>Muhammad Aditya Yudhistira</Text>
      <Text style={styles.subheading}>105841114122</Text>

      <View style={styles.iconGrid}>
        <View style={styles.iconBox}><AntDesign name="star" size={28} color="crimson" /></View>
        <View style={styles.iconBox}><Entypo name="moon" size={28} color="slategray" /></View>
        <View style={styles.iconBox}><EvilIcons name="arrow-down" size={28} color="#444" /></View>
        <View style={styles.iconBox}><Feather name="airplay" size={28} color="#333" /></View>
        <View style={styles.iconBox}><FontAwesome name="heart" size={28} color="hotpink" /></View>
        <View style={styles.iconBox}><Fontisto name="bower" size={24} color="#555" /></View>
        <View style={styles.iconBox}><Foundation name="anchor" size={28} color="#2a2a2a" /></View>
        <View style={styles.iconBox}><Ionicons name="alert-circle" size={28} color="#b22222" /></View>
        <View style={styles.iconBox}><MaterialCommunityIcons name="account-clock" size={28} color="#1e90ff" /></View>
        <View style={styles.iconBox}><Octicons name="file-submodule" size={28} color="#8b008b" /></View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    flexGrow: 1,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  subheading: {
    fontSize: 18,
    color: '#555',
    marginBottom: 5,
  },
  iconGrid: {
    marginTop: 25,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  iconBox: {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default Tugas6;
