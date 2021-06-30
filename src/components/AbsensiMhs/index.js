import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import {WARNA_UTAMA, WARNA_MERAH} from '../../utils/constant';

const AbsensiMhs = ({totabsen, totalA, totalI, totalS}) => {

  const format = amount => {
    return Number(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };
    return (
        <View style={styles.container}>
            <View style={styles.informasiSaldo}>
                <View style={styles.text}>
                    <Text style={styles.labelSaldo}>Alpha</Text>
                    <Text style={styles.labelSaldo}>Sakit</Text>
                    <Text style={styles.labelSaldo}>Ijin</Text>
                    
                </View>
                <View style={styles.text}>
                    <Text style={styles.valueSaldo}>{totalA}</Text>
                    <Text style={styles.valueSaldo}>{totalS}</Text>
                    <Text style={styles.valueSaldo}>{totalI}</Text>
                </View>
                <View style={styles.text}>
                    <Text style={styles.labelSaldo}>Prosentasi Absensi :</Text>
                    <Text style={styles.valueAbsen}>{format(totabsen)}%</Text>                    
                </View>
                <View style={styles.text}>                    
                    <Text style={styles.valueInfo}>* Presensi dihitung setiap Pertemuan</Text>
                </View>
            </View>            
        </View>
        );  
};

export default AbsensiMhs

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
      valueSaldo: {        
        fontSize: 15,
        fontFamily: 'TitilliumWeb-Bold',
        textAlign: 'center',
        fontWeight: 'bold',
      },
      valueAbsen: {        
        fontSize: 15,
        fontFamily: 'TitilliumWeb-Bold',
        textAlign: 'left',
        fontWeight: 'bold',
        color: '#ED3237'
      },
      valueInfo: {        
        fontSize: 12,
        fontFamily: 'TitilliumWeb-Light',
        textAlign: 'left',
        fontWeight: '100',
        color: '#ED3237'
      }
});
