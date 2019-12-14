import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Switch} from 'react-native';
import Colors from '../constants/Colors';
import {Ionicons} from '@expo/vector-icons';

const USER_IMG = 'https://images.unsplash.com/photo-1484862149534-102beb3bd0ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&w=512&h=512&facepad=4'

const SettingsScreen = ({navigation}) => {

  const [privacy, setPrivacy] = useState(false)

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={{uri: USER_IMG}} style={styles.profileImage}/>
        <View style={styles.profileNames}>
          <Text style={styles.username}>@nada</Text>
          <Text style={styles.fullName}>Nada Khoury</Text>
        </View>
      </View>

      <ScrollView>
        <Text style={styles.subHeader}>Security</Text>
        <TouchableOpacity onPress={() => {
          navigation.navigate('RecoveryPhrase')
        }}>
          <View style={[styles.option, styles.optionView, styles.optionTop]}>
            <Text style={{fontSize: 16}}>Recovery Phrase</Text>
            <Ionicons name="ios-arrow-forward" size={20} color={Colors.grey}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={[styles.option, styles.optionView]}>
            <Text style={{fontSize: 16}}>App Lock</Text>
            <Ionicons name="ios-arrow-forward" size={20} color={Colors.grey}/>
          </View>
        </TouchableOpacity>
        <View style={[styles.option, styles.optionView]}>
          <Text style={{fontSize: 16}}>Allow others to find me</Text>
          <Switch
            style={styles.switch}
            value={privacy}
            trackColor={Colors.green}
            onValueChange={v => {
              setPrivacy(!privacy)
            }}
          />
        </View>
        <Text style={styles.subHeader}>Other</Text>
        <TouchableOpacity>
          <View style={[styles.option, styles.optionView, styles.optionTop]}>
            <Text style={{fontSize: 16}}>Local Currency</Text>
            <Text style={styles.optionText}>USD</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={[styles.option, styles.optionView]}>
            <Text style={{fontSize: 16}}>Support</Text>
            <Ionicons name="ios-arrow-forward" size={20} color={Colors.grey}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={[styles.option, styles.optionView]}>
            <Text style={{fontSize: 16}}>Legal</Text>
            <Ionicons name="ios-arrow-forward" size={20} color={Colors.grey}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.option, styles.optionView]} onPress={() => {
          this.signout()
        }}>
          <Text style={styles.logout}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

}

SettingsScreen.navigationOptions = {
  headerStyle: {
    shadowColor: 'transparent',
    elevation: 0,
    borderBottomWidth: 0,
    backgroundColor: Colors.green,
  },
  headerBackTitle: 'Settings',
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

export default SettingsScreen


