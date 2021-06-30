import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import {WARNA_UTAMA, WARNA_MERAH} from '../../utils/constant';

const Daftar = ({pendaftaran, du, gelDaftar}) => {
    return (

        <View style={styles.container}>
            <View style={styles.informasiSaldo}>
                <View style={styles.text}>
                    <Text style={styles.labelSaldo}>Gelombang Daftar :</Text>
                    <Text style={styles.valueSaldo}>{gelDaftar}</Text>
                </View>
                <View style={styles.text}>
                    <Text style={styles.labelSaldo}>Total Pendaftaran :</Text>
                    <Text style={styles.valueSaldo}>{pendaftaran}</Text>
                </View>
                <View style={styles.text}>
                    <Text style={styles.labelSaldo}>Total Daftar Ulang :</Text>
                    <Text style={styles.valueSaldo}>{du}</Text>
                </View>
            </View>            
        </View>
        );  
};

export default Daftar

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 13,
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
        fontSize: 15,
        fontFamily: 'TitilliumWeb-Regular',
      },
      valueSaldo: {
        fontSize: 18,
        fontFamily: 'TitilliumWeb-Bold',
        textAlign: 'left',
        fontWeight: 'bold',
      }
});
