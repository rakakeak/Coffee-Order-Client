import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'


import { Styles, Color } from '../res/Styles'
class CompTouchable extends Component {
  render() {
    return (
      <TouchableOpacity style={[Styles.cardSimpleContainer,{
        backgroundColor: '#0b7f3b',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        marginHorizontal:12, marginVertical:6, borderRadius:24, 
        width:114,
      }]}
      onPress={this.props.onPress}
      onLongPress={this.props.onLongPress}
      >
        <Text style={[Styles.hurufKonten, {
          fontSize: 15,
          fontWeight: 'bold',
          textAlign: 'center',
          color:Color.whiteColor
        }]}>
          {this.props.namaKategori}</Text>
      </TouchableOpacity>
    )
  }
}
export default CompTouchable