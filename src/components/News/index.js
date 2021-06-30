import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

const News = ({judulK, inforK}) => {

    return (        
        <View style={styles.informasiNews}>
            <View style={styles.text}>
                <Text style={styles.labelTopic}>{judulK} </Text>                
            </View>
            <View style={styles.text}>
                <Text style={styles.labelText}>{inforK}</Text>                
            </View>          
        </View>                    
    );
};

export default News

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    informasiNews: {
        width: '100%',
      },
      text: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      labelText: {
        fontSize: 12,
        fontFamily: 'TitilliumWeb-Regular',
        color: '#2B4D66',             
        flexWrap: 'wrap',   
        width:'100%',
        
      },
      labelTopic: {
        fontSize: 15,
        fontFamily: 'TitilliumWeb-Bold',
        textAlign: 'center',
        fontWeight: 'bold'
      }
})
