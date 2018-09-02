import React, {PureComponent} from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {setLocalNotification, clearLocalNotification} from '../utils/notifications'
import {white,green, red, charcoal, orange, black} from '../utils/colors'

class Quiz extends PureComponent {

  state = {
    index: 0,
    count: 0,
    toggleAnswer: false
  }

  componentDidMount() {
    clearLocalNotification().then(setLocalNotification)
  }

  flipCard(toggleAnswer){
    this.setState({toggleAnswer})
  }

  handleButtonClick(type){
    switch(type){
      case 'correct':
        return (
          this.setState((state) => {
          return {
            index: state['index'] + 1,
            count: state['count'] + 1,
            toggleAnswer : false
          }
        })
      )
      case 'incorrect':
      return (
        this.setState((state) => {
          return {
            ...state,
            index: state['index'] + 1,
            toggleAnswer : false
          }
        })
      )
      case 'restart':
        return this.setState({index: 0, count: 0,  toggleAnswer : false})
    }
  }


  render() {
    const {index, count, toggleAnswer} = this.state
    const { goBack } = this.props.navigation;
    const {deckTitle} = this.props.navigation.state.params;
    const questions = this.props.decks[deckTitle].questions;

    if (index > 0 && index === questions.length) {
      return (
        <View style={styles.container}>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreLabel}>Quiz Score: </Text>
            <Text style={styles.score}>{(count / questions.length) * 100} %</Text>
          </View>

          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.button} onPress={() => goBack()}>
              <Text>Back to Deck</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.handleButtonClick('restart')}>
              <Text> Restart Quiz</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    const card= questions[index]
    return (
      <View style={styles.container}>
        <Text style={styles.pagination}>{index + 1}/{questions.length}</Text>
        <View>
          {toggleAnswer ? (
                <Text style={styles.content}>{questions[index].answer}</Text>
            ):(
                <Text style={styles.content}>{questions[index].question}</Text>
            )}

          <TouchableOpacity onPress={() => this.flipCard(!toggleAnswer)} style={styles.button}>
              {toggleAnswer ? (
                  <Text>Question</Text>
              ):(
                  <Text>Answer</Text>
              )}
          </TouchableOpacity>

        </View>
        <View style={styles.btnContainer}>

          <TouchableOpacity style={[styles.button, styles.correct]} onPress={() => this.handleButtonClick('correct')}>
            <Text>Correct</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.incorrect]} onPress={() => this.handleButtonClick('incorrect')}>
            <Text>Incorrect</Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15
  },
  pagination: {
    flex: 1,
    alignItems: 'flex-start'
  },
  btnContainer: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'stretch'
  },
  content: {
    color: black,
    fontSize: 24,
    textAlign: 'center',
    marginBottom:20
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
  correct: {
    borderColor: green
  },
  incorrect: {
    borderColor: red
  },
  scoreContainer: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scoreLabel: {
    fontSize: 36,
    color: charcoal
  },
  score: {
    fontSize: 48,
    color: green
  }
})

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(Quiz)