import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import {WARNA_UTAMA, WARNA_MERAH} from '../../utils/constant';

const Angsuran = ({totalbiaya, totalbayar, totalpiutang}) => {
  const format = num => {
    const n = String(num),
          p = n.indexOf('.')
    return n.replace(
        /\d(?=(?:\d{3})+(?:\.|$))/g,
        (m, i) => p < 0 || i < p ? `${m},` : m
      )
    }

    return (
        <View style={styles.container}>
            <View style={styles.informasiSaldo}>
                <View style={styles.text}>
                    <Text style={styles.labelSaldo}>Total Biaya :</Text>
                    <Text style={styles.valueSaldo}>Rp. {format(totalbiaya)}</Text>
                </View>
                <View style={styles.text}>
                    <Text style={styles.labelSaldo}>Total bayar :</Text>
                    <Text style={styles.valueSaldo}>Rp. {format(totalbayar)}</Text>
                </View>
                <View style={styles.text}>
                    <Text style={styles.labelSaldo}>Sisa Bayar (+ Tunggakan) :</Text>
                    <Text style={styles.valueAbsen}>Rp. {format(totalpiutang)}</Text>
                </View>                
            </View>            
        </View>
        );  
};

export default Angsuran

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        marginHorizontal: 30,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        marginTop: -windowHeight * 0.12,
        flexDirection: 'row',
      },
      text: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      informasiSaldo: {
        width: '100%',
      },
      labelSaldo: {
        fontSize: 14,
        fontFamily: 'TitilliumWeb-Regular',
      },      
      valueSaldo: {        
        fontSize: 15,
        fontFamily: 'TitilliumWeb-Bold',
        textAlign: 'left',
        fontWeight: 'bold',
      },
      valueAbsen: {        
        fontSize: 15,
        fontFamily: 'TitilliumWeb-Bold',
        textAlign: 'left',
        fontWeight: 'bold',
        color: '#ED3237'
      }
});
