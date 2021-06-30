import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import { WARNA_SEKUNDER, WARNA_UTAMA } from '../../utils/constant';
import { IconDaftar, IconKonfirm, IconDu, IconLogin } from '../../assets';


const ButtonIcon = ({ title, type, onPress }) => {

    const Icon = () => {
        if (title === 'Daftar Online') return <IconDaftar />;
    
        if (title === 'Konfirmasi Daftar') return <IconKonfirm />;
    
        if (title === 'DU Online') return <IconDu />;
    
        if (title === 'Login Mahasiswa') return <IconLogin />;        
    
        return <IconDaftar />;
      };

    return (
        <TouchableOpacity style={styles.container(type)} onPress={onPress}>        
            <View style={styles.text}>
                <Icon />
                <Text style={styles.text(type)}> {title.replace(' ', '\n')}</Text>  
            </View>            
        </TouchableOpacity>
    );
};

export default ButtonIcon

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: (type) => ({        
        marginBottom : type === "layanan" ? 7 : 0,
        marginRight : type === "layanan" ? 30 : 0, 
        alignItems: 'center',     
        backgroundColor: 'white',        
        borderRadius: 10,          
        padding: type === 'layanan' ? 40 : 0,
        shadowOffset: {
          width: 0,
          height: 2,
        },     
          shadowOpacity: 0.10,
          shadowRadius: 4.65,
          elevation: 7,
          flexDirection: 'row'
      }),     
    text: (type) => ({      
      fontSize: 10,
      fontFamily:type === 'layanan' ? 'TitilliumWeb-Light' : 'TitilliumWeb-Regular',
      textAlign: 'center'
    }),
    icon: {
      marginTop: -30
    }
});
