import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import thunk from 'redux-thunk';
import { BottomNavigation, Text, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import DeckList from './components/DeckList'
import CreateDeck from './components/CreateDeck'
import DeckDetail from './components/DeckDetail'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers'
import { Provider } from 'react-redux'
import logger from 'redux-logger';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { gray, red, blue, green } from './utils/colors'
import { setLocalNotification } from './utils/helper';

//const cDeck = () => <Text>Create Deck</Text>;
const CreateDeckStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="BottomTabs" component={BottomTabs} options={{ headerShown: false }} />
        <Stack.Screen name="DeckDetail" component={DeckDetail} options={{ headerShown: false }} />
        <Stack.Screen name="AddCard" component={AddCard} options={{ headerShown: false }} />
        <Stack.Screen name="Quiz" component={Quiz} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
const createBottomDeckStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='CreateDeck'>
        <Stack.Screen name="DeckList" component={DeckList} options={{ headerShown: false }} />
        <Stack.Screen name="CreateDeck" component={CreateDeck} options={{ headerShown: false }} />


      </Stack.Navigator>
    </NavigationContainer>
  )
}
const Tab = createMaterialBottomTabNavigator();
const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="deckList"
      shifting={true}
      sceneAnimationEnabled={false}
      barStyle={{ backgroundColor: blue }}
    >
      <Tab.Screen
        name="deckList"
        component={DeckList}
        options={{
          tabBarIcon: 'home-account',
        }}
      />
      <Tab.Screen
        name="deckCreate"
        component={CreateDeck}
        options={{
          tabBarIcon: 'plus-box-outline',
        }}
      />
    </Tab.Navigator>
  );
};


const Stack = createStackNavigator();

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    const theme = {
      ...DefaultTheme,
      roundness: 4,
      colors: {
        ...DefaultTheme.colors,
        primary: blue,
        accent: '#f1c40f',
      },
    };
    return (
      <PaperProvider theme={theme}>
        <Provider store={createStore(reducer, applyMiddleware(thunk, logger))}>
          <CreateDeckStack />
        </Provider>
      </PaperProvider>

    );
  }
}


