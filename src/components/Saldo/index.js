import React from 'react'
import { StyleSheet, Text, View, Dimensions, ToastAndroid } from 'react-native'
import {WARNA_UTAMA, WARNA_MERAH} from '../../utils/constant';

const Saldo = ({total_byr, piutang, totabsen, jmlmat, jmltung}) => {  

  const format = amount => {
    return Number(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };
  
  const format1 = num => {
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
                    <Text style={styles.labelSaldo}>Total Pembayaran   :</Text>
                    <Text style={styles.valueSaldo}>Rp. {format1(total_byr)}</Text>
                </View>
                <View style={styles.text}>
                    <Text style={styles.labelSaldo}>Total Tunggakan     :</Text>
                    <Text style={styles.valueAbsen}>Rp. {format1(jmltung)}</Text>
                </View>
                <View style={styles.text}>
                    <Text style={styles.labelSaldo}>Prosentasi Absensi :</Text>
                    <Text style={styles.valueAbsen}>{format(totabsen)} %</Text>
                </View>
                <View style={styles.text}>
                    <Text style={styles.labelMatkul}>Jumlah Mata Kuliah yang sudah di ikuti :</Text>
                    <Text style={styles.valueSaldo}>{jmlmat}</Text>
                </View>
            </View>            
        </View>
        );  
};

export default Saldo

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
        marginTop: -windowHeight * 0.13,
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
      labelMatkul: {
        width: '85%',
        fontSize: 13,
        fontFamily: 'TitilliumWeb-Regular',
        flexWrap: 'wrap', 
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
