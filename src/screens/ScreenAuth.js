import React, { Component } from 'react'
import { View, Text, Button, Image, ActivityIndicator, ImageBackground, StatusBar } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux'

import { Styles, Color } from '../res/Styles'
import { CosEdit, CosButton } from '../components/Components'
import { addTransaction } from '../_actions/Transaction'

class ScreenLogin extends Component {
  state = {
    textTblNumber: '',
    isLoading: false
  }
  aksiChangeText = (text) => {
    this.setState({
      textTblNumber: text
    })
  }
  aksiSubmit = async () => {
    await this.setState({
      isLoading: true
    })
    if (this.state.textTblNumber != '') {
      await AsyncStorage.setItem('noMeja', `${this.state.textTblNumber}`)
      //Tambah Data table transaction (Just a tableNumber)
      await this.props.dispatch(addTransaction({
        tableNumber: this.state.textTblNumber,
        isPaid: false
      }))
      await AsyncStorage.setItem('idTransaction', `${this.props.Transaction.dataItem.data.id}`)
      await this.setState({
        isLoading: this.props.Transaction.isLoading
      })
      await this.props.navigation.navigate('StackPrivate')
    } else {
      alert('Masukan Nomor Meja Terlebih Dahulu')
      await this.setState({
        isLoading: false
      })
    }
  }
  render() {
    return (

      <ImageBackground style={[Styles.container, {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f7a56a'
      }]} source={require('../assets/Photo/background.jpeg')}>
        <StatusBar backgroundColor='#f3cea2' barStyle="dark-content" />

        {/* <View style={{
            position: 'absolute',
            width: '120%',
            height: 260,
            borderColor: Color.darkPrimaryColor,
            top: 20,
          }}>
            <Image source={{uri: 'https://blog.danabijak.com/wp-content/uploads/2018/07/kedai-kopi.jpg'}} style={{
              width: '100%', height: '100%', position: 'absolute',
              top: 0, borderRadius: 44
            }}></Image>
          </View> */}
          
        <View style={[Styles.content, Styles.cardSimpleContainer, {
          backgroundColor: 'transparent',
          width: '100%',
          height: 250,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          borderWidth: 1,
          borderColor: 'white',
          borderRadius: 24
        }]}>
          
          <View style={{
            position: 'absolute',
            width: 100,
            height: 100,
            borderColor: Color.darkPrimaryColor,
            top: -36,
          }}>
            <Image source={require('../assets/Icon/logocoffee.jpg')} style={{
              width: '100%', height: '100%', position: 'absolute',
              top: -80, borderRadius: 44
            }}></Image>
          </View>

          <View style={{
            position: 'absolute',
            width: 100,
            height: 100,
            borderColor: Color.darkPrimaryColor,
            top: 60,
          }}>
            <Image source={require('../assets/Icon/kopiloading.png')} style={{
              width: '100%', height: '100%', position: 'absolute',
              top: -80, borderRadius: 44
            }}></Image>
          </View>

          <Text style={[Styles.hurufKonten, {
            fontSize: 18,
            fontWeight: 'bold',
            color: 'white'
          }]}>Enter Table Number</Text>
          <View style={{ width: '50%', marginTop: 10, }}>
            <CosEdit
              // placeholder='Enter table'
              keyboardType='numeric'
              onChangeText={this.aksiChangeText}
            />
          </View>
          <View style={{ width: '80%', marginTop: 10, flexDirection: 'row' }}>
            <View style={{ flex: 1, marginHorizontal: 5 }}>
              {this.state.isLoading ?
                <ActivityIndicator
                  size={18}
                ></ActivityIndicator>
                :
                <CosButton label='Submit' onPress={this.aksiSubmit} />
              }
            </View>
          </View>

        </View>
      </ImageBackground>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    Transaction: state.Transaction
  }
}

export default connect(mapStateToProps)(ScreenLogin)

