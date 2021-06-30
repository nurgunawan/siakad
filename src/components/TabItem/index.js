import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { IconAkun, IconAkunAktif, IconAkademik, IconAkademikAktif, IconHome, IconHomeAktif, IconInfo, IconInfoAktif  } from '../../assets'
import { WARNA_UTAMA, WARNA_DISABLE } from '../../utils/constant'

const TabItem = ({ isFocused, onPress, onLongPress, label }) => {

    const Icon = () => {
        if(label === "Home") return isFocused ? <IconHomeAktif/> : <IconHome />          
        if(label === "Academic") return isFocused ? <IconAkademikAktif/> : <IconAkademik />
        if(label === "Profile") return isFocused ? <IconAkunAktif/> : <IconAkun />
        if(label === "Info") return isFocused ? <IconInfoAktif/> : <IconInfo />
  
        return <IconHome />
    }

    return (        
        <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.container} >            
            <Icon />
            <Text style={styles.text(isFocused)}>{label}</Text>
        </TouchableOpacity>
    );
};

export default TabItem;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    text: (isFocused) => ({
        fontSize: 10,
        color: isFocused ? WARNA_UTAMA : WARNA_DISABLE,
        marginTop: 5
    })
});
