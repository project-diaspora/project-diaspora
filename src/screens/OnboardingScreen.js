import React from 'react';
import {
  StyleSheet, View, Text, Image, TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Onboarding from 'react-native-onboarding-swiper';
import Colors from '../constants/Colors';

const OnboardingScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Onboarding
      showDone={false}
      showSkip={false}
      bottomBarHighlight={false}
      pages={[
        {
          title: 'Welcome',
          subtitle: 'Project Diaspora is a new kind of financial service, one that does not hold your money.',
          backgroundColor: Colors.green,
          image: (
            <View style={styles.imageBackground}>
              <Text style={{ fontSize: 100 }}>👋</Text>
            </View>
          ),
        },
        {
          title: 'Money in your control',
          subtitle: 'Your money is stored on your device and can only be access by you and you only. This added responsibility means you are required to keep your \'seed\' safe and secure.',
          backgroundColor: Colors.green,
          image: (
            <View style={styles.imageBackground}>
              <Ionicons name="ios-lock" size={150} color={Colors.grey700} />
            </View>
          ),
        },
        {
          title: 'Keep your seed safe',
          subtitle: 'On sign up, you generated a twelve word seed. Those twelve words act as the password to your money and you should keep them safe. They are now stored securely on your device but we\'ll ask you to back them up offline in the case that you lose access to your phone.',
          backgroundColor: Colors.green,
          image: (
            <View style={styles.imageBackground}>
              <Ionicons name="ios-key" size={150} color={Colors.grey700} />
            </View>
          ),
        },
        {
          title: 'USD denominated in DAI',
          subtitle: 'DAI is a cryptocurrency pegged to the US dollar. At any time, 1 DAI = 1 USD and will be represented as a $ within the app.',
          backgroundColor: Colors.green,
          image: (
            <View style={styles.imageBackground}>
              <Image source={require('../../assets/images/dai.png')} style={{ height: 150, width: 150 }} />
            </View>
          ),
        },
        {
          title: 'We\'re all set',
          subtitle: (
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('mainFlow')}>
              <Text
                style={styles.nextButtonText}
              >Let&apos;s go
              </Text>
            </TouchableOpacity>
          ),
          backgroundColor: Colors.green,
          image: (
            <Ionicons name="ios-checkmark-circle" size={150} color="white" />
          ),
        },
      ]}
    />
  </View>
);

OnboardingScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
    width: 250,
    borderRadius: 125,
    backgroundColor: 'white'
  },
  nextButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 100,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  nextButtonText: {
    color: Colors.green,
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.05,
    fontWeight: '600',
  },
});

export default OnboardingScreen;
