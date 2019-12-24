import React, { useState, useContext } from 'react';
import {
  StyleSheet, Text, View, Image, TouchableHighlight, TouchableOpacity, ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { Context as AuthContext } from '../context/AuthContext';

const SettingsScreen = ({ navigation }) => {
  const { state, signout, clearErrorMessage } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={require('../../assets/images/inverse-logo.png')} style={styles.profileImage} />
        <View style={styles.profileNames}>
          <Text style={styles.username}>@{state.username}</Text>
        </View>
      </View>

      <ScrollView>
        <Text style={styles.subHeader}>Security</Text>
        <TouchableHighlight onPress={() => {
          navigation.navigate('RecoveryPhrase');
        }}
        >
          <View style={[styles.option, styles.optionView, styles.optionTop]}>
            <Text style={{ fontSize: 16 }}>Recovery Phrase</Text>
            <Ionicons name="ios-arrow-forward" size={20} color={Colors.grey} />
          </View>
        </TouchableHighlight>

        <Text style={styles.subHeader}>Other</Text>
        <TouchableHighlight>
          <View style={[styles.option, styles.optionView, styles.optionTop]}>
            <Text style={{ fontSize: 16 }}>Local Currency</Text>
            <Text style={styles.optionText}>USD</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => {
          navigation.navigate('Support');
        }}
        >
          <View style={[styles.option, styles.optionView]}>
            <Text style={{ fontSize: 16 }}>Support</Text>
            <Ionicons name="ios-arrow-forward" size={20} color={Colors.grey} />
          </View>
        </TouchableHighlight>
        <TouchableHighlight>
          <View style={[styles.option, styles.optionView]}>
            <Text style={{ fontSize: 16 }}>Legal</Text>
            <Ionicons name="ios-arrow-forward" size={20} color={Colors.grey} />
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            signout();
          }}
        >
          <View style={[styles.option, styles.optionView]}>
            <Text style={styles.logout}>Sign Out</Text>
          </View>
        </TouchableHighlight>
      </ScrollView>
    </View>
  );
};

SettingsScreen.navigationOptions = {
  headerStyle: {
    shadowColor: 'transparent',
    elevation: 0,
    borderBottomWidth: 0,
    backgroundColor: Colors.green,
  },
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
    justifyContent: 'space-between',
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

export default SettingsScreen;
