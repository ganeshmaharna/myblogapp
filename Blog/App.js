import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import TabNavigator from './app/navigation/TabNavigator.js'
import NoInternet from './app/components/NoInternet.js'

const CUSTOM_THEME = {
  ...DefaultTheme,
  colors: {...DefaultTheme.colors, background: "#fff"}
}

const App = () => {
  return (
    <NavigationContainer theme={CUSTOM_THEME}>
      <TabNavigator/>
    </NavigationContainer>
    // <NoInternet/>
  )
}

export default App

const styles = StyleSheet.create({})