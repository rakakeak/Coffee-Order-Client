import React, { Component } from 'react';
import { 
    StyleSheet,
    ImageBackground,
    View
  } from 'react-native';
import { Container, Button, Text, Icon } from 'native-base';
import Swiper from 'react-native-swiper';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillUpdate is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
    'Warning: ViewPagerAndroid',
]);



class IntroScreen extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            count: 0
         }
      }
    
    //   onPress = () => {
    //    Actions.menu({type: ActionConst.RESET})
    //   }


  render() {
      
    const resizeMode = 'center';
    
    return (
      <Container>
        
        <Swiper style={styles.wrapper} showsButtons={false} activeDotColor="#75CC8D">
            
            <ImageBackground style={styles.slide1}
                source={require('../assets/Photo/slide2.jpg')}
            >
                <Text style={styles.tittle}>BOOKING</Text>
                <Text style={styles.section}>Book your table easily and quickly</Text>
            </ImageBackground>
            
            <ImageBackground style={styles.slide2}
                source={require('../assets/Photo/slide1.jpg')}
            >
                <Text style={styles.tittle}>Order</Text>
                <Text style={styles.section}>Order your coffee with a touch of the screen</Text>
            </ImageBackground>


            <ImageBackground style={styles.slide3}
                source={require('../assets/Photo/slide4.jpg')}
            >
                <Text style={styles.tittle}>Drink</Text>
                <Text style={styles.section}>Enjoy your coffee</Text>
                <View style={styles.menuButtom}>
                <Button style={{borderRadius:24, backgroundColor:'#0b7f3b'}} iconLeft success full onPress={() => this.props.navigation.navigate('ScreenAuth')}>
                    <Icon type='MaterialCommunityIcons' name='food-fork-drink' />
                    <Text>Lets Started</Text>
                </Button>
                
                </View>
                
                
            </ImageBackground>
           
           
        </Swiper>
        
      </Container>
    );
  }
}
const styles = StyleSheet.create({
    wrapper: {
    },
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5',
      
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9',
    },
    tittle: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
      textAlign:'center'
    },
    section: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '400',
        paddingTop: 15,
        paddingLeft: 5,
        paddingRight:5,
        fontWeight:'bold',
        textAlign:'center'
      },
      menuButtom: {
        paddingTop: 0,
        position:'absolute',
        bottom:160,
        width:'60%'
      }
  })

  export default IntroScreen;