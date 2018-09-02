import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import Decks from './components/Decks'
import AddCard from './components/AddCard'
import AddDeck from './components/AddDeck'
import Quiz from './components/Quiz'
import DeckInfo from './components/DeckInfo'
import { Entypo } from '@expo/vector-icons'
import {white} from './utils/colors'

const Tabs = createBottomTabNavigator({
  Decks:{
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({tintColor}) => <Entypo name='list' size={30} color={tintColor} />
    }
  },
  AddDeck:{
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'Add to Decks',
        tabBarIcon: ({tintColor}) => <Entypo name='add-to-list' size={30} color={tintColor} />
      }
  }
},{
  navigationOptions:{
    header: null
  },
  tabBarOptions:{
    style: {
      height: 50,
      backgroundColor: white,
   }
  }
})


export const MainNavigator = createStackNavigator({
  Home:{
    screen: Tabs
  },
  DeckInfo:{
    screen: DeckInfo
  },
  Quiz:{
    screen: Quiz
  },
  AddCard:{
    screen: AddCard
  }
})