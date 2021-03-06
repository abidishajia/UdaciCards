import {ADD_DECK, ADD_CARD, RECEIVE_DECKS } from '../actions/index'

export default function decks(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
    
        case ADD_DECK:
            return {
                ...state,
                ...action.deck
            }
    
        case ADD_CARD:
            return {
                ...state,
                ...action.question
            }
    
        default:
            return state
     }
}

