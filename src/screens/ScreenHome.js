import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, FlatList, Image, ScrollView, ActivityIndicator, ToastAndroid } from 'react-native'
import { Header, Right, Left, Title, Body, Tabs, Tab, ScrollableTab } from 'native-base'
import IconIon from 'react-native-vector-icons/Ionicons'
// import IconAntDesign from 'react-native-vector-icons/AntDesign'
import IconMaterialCom from 'react-native-vector-icons/MaterialCommunityIcons'
import axios from 'axios'

import Constanta, { convertToRupiah } from '../res/Constant'
import { Styles, Color } from '../res/Styles'

import AsyncStorage from '@react-native-community/async-storage';
import CompTouchable from '../components/CompTouchable'
// import { CosButton } from '../components/Components'
import { getMenu, getMenuWhereCategory } from '../_actions/Menu'
import { getCategory } from '../_actions/Category'
import { addOrder, editOrder } from '../_actions/Order'
import { setIntervalNya, counterNya } from '../_actions/Home'

// getMenuWhereCategory
class ScreenHome extends Component {
  state = {
    noMeja: 0,
    idTransaction: 0,
    initNameCategory: 'All',
    startedMenus: [],
    toogleStarted: ''
  }

  convertIntToTime = (given_seconds) => {
    dateObj = new Date(given_seconds * 1000);
    hours = dateObj.getUTCHours();
    minutes = dateObj.getUTCMinutes();
    seconds = dateObj.getSeconds();

    timeString = hours.toString().padStart(2, '0') + ':' +
      minutes.toString().padStart(2, '0') + ':' +
      seconds.toString().padStart(2, '0');
  }

  aksiListOrder = async () => {
    await this.props.navigation.navigate('SwitchBill')
  }
  getNoMeja = async () => {
    try {
      const noMeja = await AsyncStorage.getItem('noMeja')
      const idTransaction = await AsyncStorage.getItem('idTransaction')
      await this.setState({
        noMeja: noMeja,
        idTransaction: idTransaction
      })
    } catch (e) {
      console.log(e)
    }
  }
  clearNoMeja = async () => {
    try {
      await AsyncStorage.clear();
      await this.props.navigation.navigate('StackPublic')
    } catch (e) {
    }
  }
  aksiCategoryMenus = (categoryId, categoryName) => {
    this.props.dispatch(getMenuWhereCategory(categoryId))
    this.setState({
      initNameCategory: categoryName
    })
  }
  cekIsStartedMenus = async () => {
    const startedMenus = await AsyncStorage.getItem('startedMenus')
    await this.setState({
      startedMenus
    });
  }
  aksiAddOrderMenus = async (menuId, transactionId) => {
    //Cari data Jika isPaid false , Input Order.
    //Cek Data Transaksi (Apakah sudah STATUS PAID / BELUM)
    let transaksiData
    let menuData
    try {
      transaksiData = await axios.get(`${Constanta.host}/transaction/${transactionId}`)
      menuData = await axios.get(`${Constanta.host}/menu/${menuId}`)
    } catch (e) {
      console.log(e)
    }
    // console.log(`Transaksi Data : ${JSON.stringify(transaksiData)}`)
    // console.log(`Menu Data : ${JSON.stringify(menuData)}`)
    // console.log(`jmlMenuData Data : ${JSON.stringify(jmlMenuDataByTrans)}`)

    if (!transaksiData.data.isPaid) {
      //Cek jika ada Menu yg sudah terdaftar di Order MenuId dan TransaksiId, Tambah
      //Cek Jumlah Order di setiap Transaksi
      //const jumlahSemuaMenuByTransaksi = await axios.get(`${Constanta.host}/transaction/${transactionId}`)
      const jmlMenuDataByTrans = await axios.get(`${Constanta.host}/order/transactionId/${transactionId}/menuId/${menuId}`)

      if (!jmlMenuDataByTrans.data) {
        const dataJadi = {
          menuId,
          transactionId,
          price: menuData.data.price,
          qty: 1
        }
        ToastAndroid.show('Success Add Order', ToastAndroid.SHORT);
        this.props.dispatch(addOrder(dataJadi))
      } else {
        if (jmlMenuDataByTrans.data.status == null) {
          //Ambil dulu jumlah Qty nya, lalu Tambahkan + 1
          //Patch Data Where IDOrderNya
          let idOrderNya = jmlMenuDataByTrans.data.id
          let jmlDataNya = jmlMenuDataByTrans.data.qty
          jmlDataNya = jmlDataNya + 1
          const dataJadi = {
            qty: jmlDataNya
          }
          ToastAndroid.show(`Berhasil Menambahkan Order , Jumlah : ${jmlDataNya}`, ToastAndroid.SHORT);
          this.props.dispatch(editOrder(idOrderNya, dataJadi))
        } else {
          //Data sudah di confirm
          ToastAndroid.show(`Data sudah terkonfirmasi , Silakan Tunggu Pesanan Anda`, ToastAndroid.SHORT);
        }
      }
    } else {
      alert('Sudah Bayar')
    }
  }
  //Tahap Percobaan
  setStartedMenus = (menuId) => {
    let arrTemporer = this.state.startedMenus
    let kosong = true;
    arrTemporer.forEach((item, index, arr) => {
      if (item.id == menuId) {
        kosong = false
      }
    })
    if (kosong) {
      //Push array where id
      arrTemporer.push(menuId)
    } else {
      //Pop array where id
      arrTemporer.pop
    }
    // const noMeja = AsyncStorage.setItem('startedMenus',this.state.startedMenus)
  }

  componentDidMount() {
    let timerHandlenya =
      this.getNoMeja()
    this.props.dispatch(getMenu())
    this.props.dispatch(getCategory())
    this.props.dispatch(setIntervalNya(
      setInterval(() => {
        this.props.dispatch(counterNya(this.props.Home.timer))
      }, 1000)
    ))
    // this.cekIsStartedMenus()
  }
  render() {

    return (
      <View style={{ flex: 1 }}>
        {/* Header */}
        <Header hasTabs style={{ backgroundColor: '#fad88c' }}>
          <Left style={{ flex: 1 }}>
            <Text style={{ fontWeight: 'bold', color: '#0a0f14' }}>Table :</Text>
            <Text style={{ fontWeight: 'bold', color: '#0a0f14', fontSize: 26 }}> {this.state.noMeja}</Text>
          </Left>
          <Body style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
            <Title style={{ color: '#0a0f14', fontWeight: 'bold' }}>Mr Coffee</Title>
          </Body>
          <Right style={{ flex: 1 }}>
            <Text style={{ fontWeight: 'bold', color: '#0a0f14' }}>{this.props.Home.timerString}</Text>
          </Right>
        </Header>


        {/* List Category */}
        <View style={[Styles.content, {
          backgroundColor: '#fcf4e3',
          width: '100%',
          height: 75,
          alignItems: 'center',
          marginBottom: 0,
          paddingBottom: 10,
        }]}>
          {this.props.Menu.isLoading ?
            <ActivityIndicator></ActivityIndicator>
            :

            <FlatList
              horizontal={true}
              style={{ flex: 1 }}
              showsHorizontalScrollIndicator={false}
              data={this.props.Category.dataItem}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <CompTouchable
                  namaKategori={item.name}
                  onPress={() => this.aksiCategoryMenus(item.id, item.name)}
                />
              )}
            />
          }
        </View>

        {/* Test List Tab View */}
        {/* <Tabs renderTabBar={() => <ScrollableTab />}>
          {this.props.Category.dataItem.map((item, index) => (
            <Tab key={index} heading={item.name}
              style={{ backgroundColor: '#2a2727' }}
              tabStyle={{ backgroundColor: '#2a2727' }}
              textStyle={{ color: '#b77e31' }}
              activeTabStyle={{ backgroundColor: '#2a2727' }}
              activeTextStyle={{ color: '#8c512d' }}
              tabBarUnderlineStyle={{ backgroundColor: '#2a2727' }}>
              
              {this.props.Menu.isLoading ?
              <ActivityIndicator></ActivityIndicator>
              :
              <FlatList
                data={this.props.Menu.dataItem}
                showsVerticalScrollIndicator={true}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={ {
                    backgroundColor: Color.whiteColor,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    padding: 5,
                    margin: 5,
                    height: 100,
                    flexDirection: 'row',
                    position: 'relative',
                    borderWidth: 1,
                    borderColor: '#075025'
                  }}>

                    <Image source={{ uri: item.image }} style={{
                      width: 100,
                      height: '100%',
                      marginRight: 20,
                      borderRadius: 10
                    }}></Image>
                    <View style={{ flexDirection: 'column' }}>
                      <Text style={[Styles.hurufKonten, {
                        fontSize: 15,
                        fontWeight: 'bold',
                        textAlign: 'left'
                      }]}>
                        {item.name}</Text>
                      <Text style={[Styles.hurufKonten, {
                        fontSize: 17,
                        fontWeight: 'bold',
                        textAlign: 'left'
                      }]}>  
                        {convertToRupiah(item.price)}</Text>
                    </View>
                    <TouchableOpacity style={{

                      alignItems: 'center',
                      position: 'absolute',
                      bottom: 32,
                      right: 10,
                      flex: 1

                    }}
                      onPress={() => this.aksiAddOrderMenus(item.id, this.state.idTransaction)}
                      onLongPress={() => alert('Long Pressed')}
                    >
                      <View style={{
                        backgroundColor: '#0b7f3b',
                        borderRadius: 10,
                        width: 88,
                        height: 28,
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Text style={{ fontWeight: 'bold', color: 'white' }}>Add </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              />
            }


            </Tab>
          ))}
        </Tabs> */}



        {/* List Menu */}
        <View style={{
          backgroundColor: '#fcf4e3',
          width: '100%',
          flex: 7,
          justifyContent: 'center',
          alignItems: 'flex-start',
          marginBottom: 0,
          padding: 8
        }}>
          <View style={{ height: '100%', width: '100%' }}>
            <Text style={[Styles.hurufKonten, {
              fontSize: 17,
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: 5
            }]}>Choose Your Coffee</Text>

            {this.props.Menu.isLoading ?
              <ActivityIndicator></ActivityIndicator>
              :
              <FlatList
                data={this.props.Menu.dataItem}
                showsVerticalScrollIndicator={true}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={[Styles.cardSimpleContainer, {
                    backgroundColor: Color.whiteColor,
                    justifyContent: 'flex-start',
                    // alignItems: 'center',
                    padding: 5,
                    margin: 5,
                    height: 100,
                    flexDirection: 'row',
                    position: 'relative',
                    borderWidth: 1,
                    borderColor: '#075025'
                  }]}>

                    <Image source={{ uri: item.image }} style={{
                      width: 100,
                      height: '100%',
                      marginRight: 20,
                      borderRadius: 10
                    }}></Image>
                    <View style={{ flexDirection: 'column' }}>
                      <Text style={{
                        fontSize: 17,
                        fontWeight: 'bold',
                        textAlign: 'left',

                      }}>
                        {item.name}</Text>
                      <Text style={[Styles.hurufKonten, {
                        fontSize: 15,
                        fontWeight: 'bold',
                        textAlign: 'left',
                        marginTop: 8
                      }]}>
                        {convertToRupiah(item.price)}</Text>
                    </View>
                    <TouchableOpacity style={{

                      alignItems: 'center',
                      position: 'absolute',
                      bottom: 32,
                      right: 10,
                      flex: 1

                    }}
                      onPress={() => this.aksiAddOrderMenus(item.id, this.state.idTransaction)}
                      onLongPress={() => alert('Long Pressed')}
                    >
                      <View style={{
                        backgroundColor: '#0b7f3b',
                        borderRadius: 10,
                        width: 88,
                        height: 28,
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Text style={{ fontWeight: 'bold', color: 'white' }}>Add </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              />
            }
          </View>
        </View>

        {/* Option */}
        {/* if ({this.state.idTransaction > 0 && ( */}
        <View style={{
          backgroundColor: '#fcf4e3',
          width: '100%',
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'row',
          padding: 8
        }}>

          <TouchableOpacity style={[Styles.cardSimpleContainer, {
            backgroundColor: '#0b7f3b',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 5,
            paddingHorizontal: 8,
            margin: 5,
            height: '75%',
            flex: 1,
            flexDirection: 'row',
            borderRadius: 24
          }]}
            onPress={() => this.aksiListOrder()}
          >
            <Text style={[Styles.hurufKonten, {
              fontSize: 15,
              fontWeight: 'bold',
              textAlign: 'center',
              color: Color.whiteColor
            }]}>
              LIST ORDER</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{
            backgroundColor: '#0b7f3b',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: 5,
            margin: 5,
            height: 60,
            width: 60,
            borderRadius: 60,
            flexDirection: 'row'
          }}
            onPress={() => this.props.navigation.navigate('SWScreenViewbill')}
          >
            <Text style={[Styles.hurufKonten, {
              fontSize: 15,
              fontWeight: 'bold',
              textAlign: 'center',
              color: Color.whiteColor
            }]}>
              VIEW BILL</Text>
          </TouchableOpacity>

        </View>
        {/* )} */}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    Menu: state.Menu,
    Category: state.Category,
    Transaction: state.Transaction,
    Order: state.Order,
    Home: state.Home
  }
}

export default connect(mapStateToProps)(ScreenHome)