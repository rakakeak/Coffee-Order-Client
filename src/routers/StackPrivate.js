import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { createBottomTabNavigator, createSwitchNavigator } from "react-navigation";
import IconFa from 'react-native-vector-icons/FontAwesome5'
import IconAnt from 'react-native-vector-icons/AntDesign'

import { Styles, Color } from '../res/Styles'
import ScreenHome from '../screens/ScreenHome'
import ScreenViewbill from '../screens/ScreenViewbill'
import ScreenViewbillConfirmed from '../screens/ScreenViewbillConfirmed'
import ScreenCart from '../screens/ScreenCart'
import ScreenPay from '../screens/ScreenPay'

const SwitchBill = createSwitchNavigator({
  SWScreenCart:ScreenCart,
  SWScreenViewbill:ScreenViewbill,
  SWScreenPay:ScreenPay,
  SWScreenViewbillConfirmed:ScreenViewbillConfirmed
},{
  initialRouteName:'SWScreenCart'
})

export default StackPrivate = createStackNavigator(
  {
    ScreenHome,
    ScreenViewbill,
    SwitchBill
  }, {
    initialRouteName: "ScreenHome",
    headerMode: 'none'
  }
);