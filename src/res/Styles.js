import { StyleSheet} from 'react-native'

export const Color = {
  backgroundColor : '#FAFAFA',
  primaryColor : '#03A9F4',
  darkPrimaryColor : '#0b7f3b',
  accentColor : '#448AFF',
  lightPrimaryColor : '#B3E5FC',
  primaryTextColor : '#212121',
  secondaryTextColor : '#757575',
  deviderColor : '#BDBDBD',
  whiteColor : '#FFFFFF',
  errorColor : '#E53935',
  successColor: '#018786'
}
export const Styles = StyleSheet.create({
  container : {
    flex:1
  },
  content:{
    padding:8
  },
  cardSimpleContainer: {
    shadowColor: '#000000',
    shadowOffset: {
      height: 3,
      width: 3
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    backgroundColor: '#FCF4E3',
    borderRadius: 3,
    elevation: 4
  },
  hurufKonten:{
    fontSize:16,
    color:Color.primaryTextColor
  }
})