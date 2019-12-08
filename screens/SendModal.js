import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import Colors from '../constants/Colors';

class SendModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      integers: '0',
      decimals: null,
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Select Amount',
      headerRight: (
        <TouchableOpacity style={styles.closeButton} onPress = {() => { navigation.popToTop() } }>
          <Ionicons name="ios-close" size={40} color="black" />
        </TouchableOpacity>
      ),
      headerLeft: null,
      headerRightContainerStyle: {
        paddingRight: 20
      },
      headerStyle: {
        shadowColor: 'transparent',
        elevation: 0,
        borderBottomWidth: 0,
      }
    }
  };

  add = (number) => {
    if (this.state.decimals) {
      if (this.state.decimals && this.state.decimals.length < 3) {
        this.setState({ decimals: this.state.decimals.concat(number) })
      } else if (this.state.decimals && this.state.decimals.length === 3 ) {
        this.setState({ decimals: this.state.decimals })
      } else {
        this.setState({ decimals: number })
      }
    } else {
      if (this.state.integers === '0') {
        this.setState({ integers: number })
      } else {
        this.setState({ integers: this.state.integers.concat(number) })
      }
    }  
  }

  addDecimal = () => {
    this.setState({ decimals: '.' })
  }

  backspace = () => {
    if (this.state.decimals) {
      if (this.state.decimals.length === 3) {
        this.setState({ decimals: this.state.decimals.slice(0, 2) })
      } else if (this.state.decimals.length === 2) {
        this.setState({ decimals: this.state.decimals.slice(0, 1) })
      } else {
        this.setState({ decimals: null })
      }
    } else if (this.state.integers !== '0') {
      if (this.state.integers.length === 1) {
        this.setState({ integers: '0' })
      } else {
        this.setState({ integers: this.state.integers.slice(0, this.state.integers.length - 1) })
      }
    }
  }

  next = () => {
    console.log('next')
  }

  render = () => {
    return (
      <View style={styles.modalContainer}>
        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>
            $
            {this.state.integers}
            {this.state.decimals}
          </Text>
          <TouchableOpacity style={styles.maxButton}><Text style={styles.maxButtonText}>Max</Text></TouchableOpacity>
        </View>

        <View style={styles.keyboardRow}>
          <TouchableOpacity style={styles.keyboardButton} onPress={() => this.add('1')}><Text style={styles.keyboardText}>1</Text></TouchableOpacity>
          <TouchableOpacity style={styles.keyboardButton} onPress={() => this.add('2')}><Text style={styles.keyboardText}>2</Text></TouchableOpacity>
          <TouchableOpacity style={styles.keyboardButton} onPress={() => this.add('3')}><Text style={styles.keyboardText}>3</Text></TouchableOpacity>
        </View>
        <View style={styles.keyboardRow}>
          <TouchableOpacity style={styles.keyboardButton} onPress={() => this.add('4')}><Text style={styles.keyboardText}>4</Text></TouchableOpacity>
          <TouchableOpacity style={styles.keyboardButton} onPress={() => this.add('5')}><Text style={styles.keyboardText}>5</Text></TouchableOpacity>
          <TouchableOpacity style={styles.keyboardButton} onPress={() => this.add('6')}><Text style={styles.keyboardText}>6</Text></TouchableOpacity>
        </View>
        <View style={styles.keyboardRow}>
          <TouchableOpacity style={styles.keyboardButton} onPress={() => this.add('7')}><Text style={styles.keyboardText}>7</Text></TouchableOpacity>
          <TouchableOpacity style={styles.keyboardButton} onPress={() => this.add('8')}><Text style={styles.keyboardText}>8</Text></TouchableOpacity>
          <TouchableOpacity style={styles.keyboardButton} onPress={() => this.add('9')}><Text style={styles.keyboardText}>9</Text></TouchableOpacity>
        </View>
        <View style={styles.keyboardRow}>
          <TouchableOpacity style={styles.keyboardButton} onPress={() => this.addDecimal()}><Text style={styles.keyboardText}>.</Text></TouchableOpacity>
          <TouchableOpacity style={styles.keyboardButton} onPress={() => this.add('0')}><Text style={styles.keyboardText}>0</Text></TouchableOpacity>
          <TouchableOpacity style={styles.keyboardButton} onPress={() => this.backspace()}><Ionicons style={{textAlign: 'center'}} name="ios-backspace" size={30} color={Colors.green} /></TouchableOpacity>
        </View>

        <View style={styles.nextButtonContainer}>
          <TouchableOpacity style={styles.nextButton} onPress={() => this.next()}><Text style={styles.nextButtonText}>Next</Text></TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default withNavigation(SendModal)

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  closeButton: {
    padding: 10,
    margin: -10,
  },
  amountText: {
    fontSize: 40,
    color: '#2d3748',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 5,
  },
  amountContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    marginVertical: 20,
  },
  maxButtonText: {
    color: Colors.green,
    textTransform: 'uppercase',
    letterSpacing: 0.05,
    fontWeight: '600',
  },
  maxButton: {
    padding: 10,
  },
  keyboardRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  keyboardButton: {
    justifyContent: 'center',
    width: '33%',
    height: 100,
  },
  keyboardText: {
    textAlign: 'center',
    color: Colors.green,
    fontSize: 28,
    fontWeight: '600'
  },
  backspace: {
    height: 30,
    width: 30,
  },
  nextButton: {
    backgroundColor: Colors.green,
    paddingVertical: 10,
    paddingHorizontal: 100,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.05,
    fontWeight: '600',
  },
  nextButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: 50,
  },
})
