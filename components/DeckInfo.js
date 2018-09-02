import React, {Component} from 'react'
import {StyleSheet, TouchableOpacity, View,Text} from 'react-native'
import {connect} from 'react-redux'
import {purple, white, orange} from '../utils/colors'

class DeckInfo extends Component {

  static navigationOptions = ({ navigation }) => {
      const { deckTitle, deckLength } = navigation.state.params
      return {
          title: deckTitle,
          deckLength: deckLength
      }
  }


  render() {
    const  {  deck, navigation } = this.props

    return (
         <View style={styles.container}>
            <Text style={styles.text}> {this.props.navigation.state.params.deckTitle} </Text>
            <Text style={styles.textTwo}> This deck has {this.props.navigation.state.params.deckLength} Card(s) </Text>

            <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate('AddCard', {deckTitle: this.props.navigation.state.params.deckTitle})}
            >
                <Text> Add Card </Text>
            </TouchableOpacity>
            {this.props.navigation.state.params.deckLength > 0 ?

             <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate('Quiz', {deckTitle: this.props.navigation.state.params.deckTitle})}>
                <Text> Start Quiz </Text>
            </TouchableOpacity> :

            <TouchableOpacity 
                style={styles.button} 
                onPress={() =>  alert('Please add cards to the deck')}>
                <Text> Start Quiz </Text>
            </TouchableOpacity> 

            }
          </View> 
    )
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 10,
      backgroundColor: '#FFF',
    },
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF',
      borderColor: orange,
      borderWidth: 5,
      padding: 10,
      marginBottom: 20
    },
    text: {
      paddingTop: 5,
      backgroundColor: white,
      textAlign: 'center',
      fontSize: 24
    },
    textTwo:{
      paddingTop: 5,
      backgroundColor: white,
      textAlign: 'center',
      fontSize: 24,
      marginBottom: 10
    }
  })


function mapStateToProps(decks) {
	return {
		decks
	};
}


export default connect(mapStateToProps)(DeckInfo)

