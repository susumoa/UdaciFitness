import React from 'react'
import { View, Platform, StatusBar } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Constants from 'expo-constants'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import reducer from './reducers'
import { purple, white } from './utils/colors'
import { setLocalNotification } from './utils/helpers'
import AddEntry from './components/AddEntry'
import History from './components/History'
import EntryDetail from './components/EntryDetail'
import Live from './components/Live'

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createMaterialBottomTabNavigator()

function Tab() {
  return (
    <Tabs.Navigator
      barStyle={{
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : purple,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowRadius: 6,
          shadowOpacity: 1,
      }}
    >
      <Tabs.Screen
        name='History'
        component={History}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: () => <Ionicons name='ios-bookmarks' size={25} color={Platform.OS === 'ios' ? purple : white} />
        }}
      />
      <Tabs.Screen
        name='Add Entry'
        component={AddEntry}
        options={{
          tabBarLabel: 'Add Entry',
          tabBarIcon: () => <FontAwesome name='plus-square' size={25} color={Platform.OS === 'ios' ? purple : white} />
        }}
      />
      <Tabs.Screen
        name='Live'
        component={Live}
        options={{
          tabBarLabel: 'Live',
          tabBarIcon: () => <Ionicons name='ios-speedometer' size={25} color={Platform.OS === 'ios' ? purple : white} />
        }}
      />
    </Tabs.Navigator>
  )
}

const Stack = createStackNavigator()

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName='Home'
              headerMode='screen'
            >
              <Stack.Screen
                name='Home'
                component={Tab}
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen
                name='Entry Detail'
                component={EntryDetail}
                options={({ route }) => ({ title: `${route.params.entryId.slice(0, 4)}/${route.params.entryId.slice(5, 7)}/${route.params.entryId.slice(8)}` })}
               />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
    )
  }
}