import React from 'react';
import { View, StatusBar} from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers/index'
import { Constants } from 'expo'
import { orange} from './utils/colors'
import { MainNavigator } from './routes'


function UdaciStatusBar({backgroundColor, ...props}){
  return(
    <View style={{backgroundColor, height: Constants.statusBarHeight}} >
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor={orange} barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}


