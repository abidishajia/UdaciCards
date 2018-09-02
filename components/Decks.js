import React, {Component} from 'react'
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  Text
} from 'react-native'
import {connect} from 'react-redux'
import {getDecks} from '../utils/api'
import {receiveDecks} from '../actions'
import {purple, white, orange} from '../utils/colors'


class Decks extends Component {

  componentDidMount() {
    const {receiveDecks} = this.props
    getDecks().then((decks) => receiveDecks(decks))
  }

  decksLength(item){
    if(item.questions.length ===  1){
      return item.questions.length + ' card'
    } else if (item.questions.length > 1){
      return item.questions.length + ' cards'
    } else {
      return 'Deck is empty'
    }
  }

  renderItem = ({item}) => {
    const { navigation } = this.props
    return (
      <TouchableOpacity 
          style={styles.item} 
          onPress={() => navigation.navigate('DeckInfo', {deckTitle: item.title, deckLength:item.questions.length})}
      >
        <View  style={{ flex: 1 }}>
            <Text>{item.title}</Text>
            <Text>{this.decksLength(item)}</Text> 
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const {data} = this.props

    return (
      <View style={{ flex: 1 }}>
         <Text style={styles.header}> DECKS</Text>
         <FlatList style={styles.container} 
                    data={data} 
                    extraData={this.state} 
                    renderItem={this.renderItem}
                    keyExtractor = {(item, index) => item.title}
        />
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
  item: {
    backgroundColor: white,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: orange,
    marginBottom: 5
  },
  text:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  header:{
    paddingTop: 5,
    backgroundColor: white,
    textAlign: 'center',
    fontSize: 24
  }
});

function mapStateToProps(decks) {
  const data = Object.values(decks)
  return {decks, data}
}

export default connect(mapStateToProps, {receiveDecks})(Decks)

