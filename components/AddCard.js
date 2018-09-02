import React, {Component} from 'react'
import {Text, TextInput, View, TouchableOpacity, StyleSheet } from 'react-native'

import {connect} from 'react-redux'
import {black, white, lightGray, orange} from '../utils/colors'

import {addCardToDeck} from '../utils/api'
import {addCard} from '../actions'

class AddCard extends Component {

  state = {
      question: '',
      answer: ''
  }

  submit = () => {
    const {question, answer} = this.state
    const {deck} = this.props
    const { goBack } = this.props.navigation;

    if(question.length === 0 || answer.length === 0){
      alert('Please fill all the fields')
    }
   
    if(question && answer){
      this.props.dispatch(addCard(deck.title, {question, answer}))
      addCardToDeck(deck.title, {question, answer})
      this.reset()
      goBack()
    }
   
  }
  reset = () => {
    this.setState({question: '', answer: ''})
  }

  render() {
    const {deck} = this.props

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{deck.title}</Text>
        <TextInput 
                style={styles.question} 
                editable={true}
                placeholder="Please enter your question here" 
                onChangeText={(question) => this.setState({question})}
            />

        <TextInput 
            style={[styles.question, styles.heightText]} 
            editable={true} 
            multiline={true} 
            placeholder="Please enter your answer here" 
            onChangeText={(answer) => this.setState({answer})}
        />

         <TouchableOpacity style={styles.button}  onPress={this.submit}>
                <Text> Add Card </Text>
         </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 20
  },
  title: {
    color: black,
    fontSize: 24,
    textAlign: 'center'
  },
  question: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 1,
    borderColor: lightGray,
    borderRadius: 4
  },
  heightText:{
    height: 100
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderColor: orange,
    borderWidth: 5,
    padding: 10,
    marginBottom: 20
  }
})

function mapStateToProps(decks, {navigation}) {
  const {deckTitle} = navigation.state.params
  return {
    deck: decks[deckTitle] || {}
  }
}


export default connect(mapStateToProps)(AddCard)
