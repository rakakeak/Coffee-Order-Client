import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';

import { Styles, Color } from '../res/Styles'
import { convertToRupiah } from '../res/Constant'
import IconFA5 from 'react-native-vector-icons/FontAwesome5'

import { reRenderMenu, getMenu } from '../_actions/Menu'
import { addOrderBiasa } from '../_actions/Order'
import { setIsOrdered } from '../_actions/Home'

class CompListOrderConfirmed extends Component {
  render() {
    return (
      this.props.item ?
        <View style={{ flex: 1, marginHorizontal: 4 }}>
          <View style={{
            // backgroundColor: 'green',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 10
          }}>
            <Text style={[Styles.hurufKonten, {
              fontSize: 14,
              fontWeight: '300',
              flex: 1,
              textAlign: 'center',
              fontWeight: 'bold',
            }]}>{this.props.item.menu.name}</Text>

            <Text style={[Styles.hurufKonten, {
              fontSize: 14,
              fontWeight: '300',
              flex: 1,
              textAlign: 'center',
              fontWeight: 'bold'
            }]}>{this.props.item.qty}</Text>

            <Text style={[Styles.hurufKonten, {
              fontSize: 14,
              fontWeight: '300',
              flex: 1,
              textAlign: 'center',
              fontWeight: 'bold'
            }]}>{convertToRupiah(this.props.item.price * this.props.item.qty)}</Text>

            <View style={{
              // backgroundColor: 'blue',
              flex: 1,
              alignItems: 'center'
            }}>
              {this.props.item.status == false ?
                <TouchableOpacity
                  onPress={this.props.onPressStatus}
                >
                  <Text style={[Styles.hurufKonten, {
                    fontSize: 14,
                    fontWeight: '300',
                    flex: 1,
                    textAlign: 'right',
                    fontWeight: 'bold',
                    color: 'red'
                  }]}>Waiting</Text>
                </TouchableOpacity>
                :
                <View>
                  <Text style={[Styles.hurufKonten, {
                    fontSize: 14,
                    fontWeight: '300',
                    flex: 1,
                    textAlign: 'right',
                    fontWeight: 'bold',
                    color: '#0b7f3b'
                  }]}>Success</Text>
                </View>
              }
            </View>




            {/* <Text style={[Styles.hurufKonten, {
              fontSize: 15,
              fontWeight: 'bold',
              position: 'absolute',
              left: 60,
              top: 50,
              color: '#0fae50'
            }]}>
              {convertToRupiah(this.props.item.price * this.props.item.qty)} ({this.props.item.qty})</Text> */}

          </View>

        </View >
        : false
    )
  }
}
const mapStateToProps = (state) => {
  return {
    Order: state.Order,
    Menu: state.Menu
  }
}
export default connect(mapStateToProps)(CompListOrderConfirmed)