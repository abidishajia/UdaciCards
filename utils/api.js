import {AsyncStorage} from 'react-native'

const DECKS_STORAGE_KEY = 'DECKS_STORAGE.decks'

function dummyDecks() {
  return {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        }, {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }
}


export function getDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((results) => {
        const decks = JSON.parse(results)
        return (results) ?  decks : dummyDecks()
    })
  }
  
  export function getDeck(id) {
    return getDecks().then((decks) => (decks[id]))
  }
  
  export function saveDeckTitle(deckTitle) {
    getDecks().then((decks) => {
      if (!decks[deckTitle]) {
        decks[deckTitle] = {
          title: deckTitle,
          questions: []
        }
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
      }
    })
  }

  export function addCardToDeck(deckTitle, {question, answer}) {
    getDecks().then((decks) => {
      if (decks[deckTitle] && decks[deckTitle]['questions']) {
        decks[deckTitle]['questions'].push({question, answer})
      }
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
    })
  }