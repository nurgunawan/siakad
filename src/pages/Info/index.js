import React, { Component } from 'react';
import { StyleSheet,  Text,  View,  Button,  ActivityIndicator,  FlatList, Dimensions } from 'react-native';
import { WARNA_UTAMA, WARNA_WARNING, WARNA_ABU_ABU, WARNA_ROI, WARNA_MERAH, WARNA_SEKUNDER, WARNA_DISABLE } from '../../utils/constant';
import Icon from 'react-native-vector-icons/Ionicons';

class Info extends Component <{}> { 
    constructor(props) {
        super(props);       
        this.state = {  
            flatListProps: [
                {
                  title: 'Total Pembayaran',
                  description: 'Jumlah Total uang yang sudah anda bayarkan ke kampus sebagai pembayaran sebagian/seluruh biaya Pendidikan.'
                },
                {
                  title: 'Total Tunggakan',
                  description: 'Jumlah Kekurangan bayar yang seharusnya sudah anda penuhi sampai dengan saat ini( bulan saat ini ).'
                },
                {
                  title: 'Prosentasi Absensi',
                  description: 'Jumlah Prosentase Ketidakhadiran anda per mata kuliah sampai saat ini. '
                },
                {
                  title: 'Jumlah Mata Kuliah yang Sudah di Ikuti',
                  description: 'Jumlah Mata Kuliah yang sudah anda ikuti.'
                },
                {
                  title: 'Total Biaya',
                  description: 'Total Biaya pendidikan yang harus anda bayarkan.'
                },
                {
                  title: 'Total Bayar',
                  description: 'Jumlah Total uang yang sudah anda bayarkan ke kampus sebagai pembayaran sebagian/seluruh biaya Pendidikan.'
                },
                {
                  title: 'Sisa bayar (+ Tunggakan)',
                  description: 'Kekurangan Pembayaran Biaya Kuliah yang harus anda penuhi'
                }
              ]
        };    

        this.showList = this.showList.bind(this);
     
      }

      getFlatList() {
        return (
    
          <FlatList key="flatList"
            style={styles.flatList}
            data={this.state.flatListProps}
            ListHeaderComponent={() => (
                <Text style={styles.header} key="FlatList props">Informasi Data Aplikasi</Text>
            )}
            ListFooterComponent={() => (
                <Text style={styles.footer} key="FlatList props">* Apabila Data tidak sesuai, Silahkan menghubungi Kampus.</Text>
            )}
            keyExtractor={(item, index) => (`${item}--${index}`)}
            renderItem = {({ item, index }) => 
              <View style={styles.flatlistRow}>
                <View style={styles.rowHeader}>
                  <Text style={styles.judul}>{item.title}</Text>
                </View>
                <View>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
              </View>
            } />
        );
      }

      showList() {
        this.setState({
          loading: true
        });
        setTimeout(() => {
          this.setState({
            showList: true,
            loading: false
          })
        }, 5000)
      }     

    render() {
        return (        
          <View style={styles.container}>                       
            {this.getFlatList()}                   
          </View>
        );
      }

}
export default Info
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    header: {
      backgroundColor: WARNA_WARNING,
      color: 'white',
      fontSize: 20,
      textAlign: 'center',
      padding: 30
    },
    footer: {
        backgroundColor: WARNA_DISABLE,
        color: WARNA_MERAH,
        fontSize: 17,
        fontFamily: 'TitilliumWeb-Bold',
        fontWeight: 'bold',
        padding: 20,
        justifyContent: 'center'
      },
    listView: {
      flex: 1,
      flexWrap: 'wrap',
      alignSelf: 'stretch',
      padding: 20
    },
    flatList: {
      flex: 1
    },
    flatlistRow: {
      borderBottomWidth: 1,
      borderColor: 'gray',
      padding: 10
    },
    rowHeader: {
      marginTop: 10,
      borderBottomWidth: 2,
      borderColor: 'gray',
      alignItems: 'center',
      padding: 5
    },
    listRow: {
      flex: 1,
      justifyContent: 'center',
      height: 30,
      borderBottomWidth: 1,
      borderStyle: 'solid',
      borderColor: 'gray'
    },
    judul:{
        fontSize: 17,
        fontFamily: 'TitilliumWeb-Bold',
        fontWeight: 'bold'
    },
    description: {
      justifyContent: 'center'
    }
  })