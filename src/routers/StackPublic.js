import React from 'react'
import { createSwitchNavigator } from 'react-navigation'
// import { createBottomTabNavigator } from "react-navigation"
// import IconFa from 'react-native-vector-icons/FontAwesome5'

// import { Styles, Color } from '../res/Styles'
// import ScreenHome from '../app/home/ScreenHome'
import ScreenAuth from '../screens/ScreenAuth'
import IntroScreen from '../screens/IntroScreen'

export default StackPublic = createSwitchNavigator(
  {
    IntroScreen: IntroScreen,
    ScreenAuth:ScreenAuth
  }, 
  {
    initialRouteName: "IntroScreen",
    headerMode: 'none'
  }
);