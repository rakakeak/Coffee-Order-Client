import React, { Component } from 'react'
import { View, TextInput, Text } from 'react-native'
import { Button } from 'native-base'

import { Styles, Color } from '../res/Styles'

export const CosEdit = (props) => {
  return (
    <View style={{
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row'
    }}>
      {props.label ?
        <Text style={[Styles.hurufKonten, { fontWeight: 'bold', marginRight: 5 }]}>{props.label}</Text>
        : false}
      <TextInput style={[{
        backgroundColor: 'transparent',
        borderWidth:1,
        borderColor:'white',
        color: 'white',
        fontSize: 16,
        width: '120%',
        // textAlign:'center',
        shadowColor: '#000000',
        shadowOffset: {
          height: 3,
          width: 3
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        borderRadius: 3,
        elevation: 4
      }]}
        keyboardType={props.keyboardType}
        secureTextEntry={props.secureTextEntry}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        placeholderTextColor='white'
      >
      </TextInput>
    </View>
  )
}

export const CosButton = (props) => {
  return (
    <View >
      <Button style={{
        backgroundColor: '#0b7f3b',
        width:'100%', 
        justifyContent:'center',
        borderRadius: 24
      }}
        onPress={props.onPress}
        // title={props.label ? props.label : 'Button'}
      >
        <Text style={{color:'white', justifyContent:'center', fontWeight:'bold'}}>SUBMIT</Text>
      </Button>
    </View>
  )
}