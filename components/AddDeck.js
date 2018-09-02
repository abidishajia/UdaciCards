import React, {Component} from 'react'
import {Text, TextInput, View, TouchableOpacity,StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {black, white, green, orange} from '../utils/colors'
import {saveDeckTitle} from '../utils/api'
import {addDeck} from '../actions'

class AddDeck extends Component {

  state = {
    title: ''
  }

  submit = () => {
    const {title} = this.state
    const {addDeck, navigation } = this.props
    const { goBack } = this.props.navigation;

    if(title.length === 0){
      alert('Please enter Deck Name')
    }

    if (title) {
      addDeck(title) 
      saveDeckTitle(title) 
      this.reset()
      goBack()
    }
  }

  reset = () => {
    this.setState({title: ''})
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.deckLabel}>New Deck Title: </Text>
        <TextInput 
          style={styles.deckTitle} 
          editable={true} 
          placeholder="Deck Title" 
          onChangeText={(title) => this.setState({title})}
        />
        <TouchableOpacity style={styles.button}  onPress={this.submit}>
            <Text> Create Deck </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 20,
    justifyContent: 'center'
  },
  deckLabel: {
    margin: 10,
    color: black,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20
  },
  deckTitle: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 2,
    borderColor: green
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

function mapStateToProps(decks) {
  return {decks}
}

export default connect(mapStateToProps, {addDeck})(AddDeck)


