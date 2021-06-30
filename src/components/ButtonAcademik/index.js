import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import { WARNA_SEKUNDER } from '../../utils/constant';
import { IconAngsur, IconDetailAngsur, IconNilai } from '../../assets';

const ButtonAcademik = ({ title, type, onPress }) => {

    const Icon = () => {
        if (title === 'Detail Angsuran') return <IconDetailAngsur />;
    
        if (title === 'Detail Nilai & Absensi') return <IconNilai />;

        if (title === 'Angsuran Online') return <IconAngsur />;        
    
        return <IconDetailAngsur />;
      };

    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Icon />
        <View style={styles.text}>
        <Text style={styles.title}>{title}</Text>        
        </View>
      </TouchableOpacity>        
    );
};

export default ButtonAcademik

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginVertical: windowHeight*0.01,
    alignItems: 'center'
  },
  text: {
    marginLeft: windowWidth*0.01,
    padding:15
  },
  title: {
    fontSize: 18,
    fontFamily: 'TitilliumWeb-SemiBold'
  },
  
});
