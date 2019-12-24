import React, { useState, useContext } from 'react';
import {
  StyleSheet, Text, View, Image, TouchableHighlight, Linking, ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { Context as AuthContext } from '../context/AuthContext';


const SupportScreen = ({ navigation }) => {
  const { state, signout, clearErrorMessage } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={require('../../assets/images/inverse-logo.png')} style={styles.profileImage} />
        <View style={styles.profileNames}>
          <Text style={styles.username}>Massari</Text>
        </View>
      </View>

      <ScrollView>
        <Text style={styles.subHeader}>Social Media</Text>
        <TouchableHighlight onPress={() => {
          Linking.openURL('https://discord.gg/gNdnuzr');
        }}
        >
          <View style={[styles.option, styles.optionView, styles.optionTop]}>
            <Image source={require('../../assets/images/discord.png')} style={{ height: 20, width: 20 }} />
            <Text style={{ paddingLeft: 10, fontSize: 16 }}>Discord Community Forum</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => {
          Linking.openURL('https://twitter.com/ProjctDiaspora');
        }}
        >
          <View style={[styles.option, styles.optionView]}>
            <Ionicons name="logo-twitter" size={20} color="#1DA1F2" />
            <Text style={{ paddingLeft: 10, fontSize: 16 }}>Twitter</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => {
          Linking.openURL('https://www.instagram.com/projectdiasporaleb/');
        }}
        >
          <View style={[styles.option, styles.optionView]}>
            <Ionicons name="logo-instagram" size={20} color="#E1306C" />
            <Text style={{ paddingLeft: 10, fontSize: 16 }}>Instagram</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => {
          Linking.openURL('https://github.com/project-diaspora');
        }}
        >
          <View style={[styles.option, styles.optionView]}>
            <Ionicons name="logo-github" size={20} color={Colors.grey800} />
            <Text style={{ paddingLeft: 10, fontSize: 16 }}>Github</Text>
          </View>
        </TouchableHighlight>

        <Text style={styles.subHeader}>Other</Text>
        <TouchableHighlight onPress={() => {
          Linking.openURL('https://medium.com/p/343da7e50da2');
        }}
        >
          <View style={[styles.option, styles.optionView, styles.optionTop]}>
            <Ionicons name="ios-paper" size={20} color={Colors.grey800} />
            <Text style={{ paddingLeft: 10, fontSize: 16 }}>Our Manifesto</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => {
          Linking.openURL('mailto:project.diaspora.leb@gmail.com');
        }}
        >
          <View style={[styles.option, styles.optionView]}>
            <Ionicons name="ios-at" size={20} color={Colors.grey800} />
            <Text style={{ paddingLeft: 10, fontSize: 16 }}>project.diaspora.leb@gmail.com</Text>
          </View>
        </TouchableHighlight>
      </ScrollView>
    </View>
  );
};

SupportScreen.navigationOptions = {
  headerStyle: {
    shadowColor: 'transparent',
    elevation: 0,
    borderBottomWidth: 0,
    backgroundColor: Colors.green,
  },
  headerTintColor: 'white'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileHeader: {
    flexDirection: 'row',
    backgroundColor: Colors.green,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    margin: 5,
    borderWidth: 2,
    borderColor: 'white',
  },
  profileNames: {
    marginHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  username: {
    color: 'white',
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 0.025,
    marginBottom: 5,
  },
  fullName: {
    color: '#edf2f7',
    fontSize: 16,
  },
  subHeader: {
    marginTop: 40,
    marginBottom: 5,
    fontSize: 22,
    fontWeight: '600',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  option: {
    fontSize: 16,
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: Colors.grey300,
    backgroundColor: Colors.grey100,
  },
  optionView: {
    flexDirection: 'row',
  },
  optionTop: {
    borderTopWidth: 2,
  },
  optionText: {
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.05,
  },
  logout: {
    color: Colors.red,
    fontSize: 16,
  },
  switch: {
    marginVertical: -5
  }
});

export default SupportScreen;
