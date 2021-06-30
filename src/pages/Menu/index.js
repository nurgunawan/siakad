import React, {Component} from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, Alert, Linking  } from 'react-native';
import { Container, Header, Content, Card, CardItem, Label, Textarea, Form, Item, Input, Button, Left, Right, Title, Body } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { ImageHeaderLogin } from '../../assets';
import ButtonAcademik from '../../components/ButtonAcademik';
import { WARNA_UTAMA, WARNA_WARNING, WARNA_ABU_ABU } from '../../utils/constant';
import Icon from 'react-native-vector-icons/Ionicons';


class Menu extends Component {     
  constructor() {
    super();            
  }

    
  render() {                     
    const { pil, otherParam } = this.props.route.params;        
    return (
      <Container>
      <Header androidStatusBarColor="#263238" style={{'backgroundColor': WARNA_UTAMA }}>
            <Left>
                <Button transparent onPress={() => this.props.navigation.goBack()}>   
                <Icon name="md-arrow-back-circle-outline" size={18} color="#FFFFFF"/>
                </Button>
            </Left>
            <Body style={{ flex: 3 }}>
            <Title>{otherParam}</Title>
            </Body>
            <Right />
        </Header>  
        <View>        
            <ImageBackground source={ImageHeaderLogin} style={styles.header}>                        
            </ImageBackground>                       
            {
              (pil ==1 ) ? 
              <View style={styles.pesananAktif}>
                <Text style={styles.label}>Menu Pilihan</Text> 
                <ButtonAcademik title="Daftar Online Wearnes" onPress={() => { Linking.openURL('https://test.royaloceancollege.com/wearnes')}} />
                <ButtonAcademik title="Daftar Online Royal" onPress={() => { Linking.openURL('https://test.royaloceancollege.com/royal')}} />
              </View>
               : (pil == 2) ?
               <View style={styles.pesananAktif}>
               <Text style={styles.label}>Menu Pilihan</Text> 
                <ButtonAcademik title="Konfirmasi Daftar Wearnes" onPress={() => { Linking.openURL('https://test.royaloceancollege.com/konfirmasiWec')}} />
                <ButtonAcademik title="Konfirmasi Daftar Royal" onPress={() => { Linking.openURL('https://test.royaloceancollege.com/konfirmasiRoi')}} />
              </View>
              :
              <View style={styles.pesananAktif}>
               <Text style={styles.label}>Menu Pilihan</Text> 
                <ButtonAcademik title="Konfirmasi Daftar Ulang Wearnes" onPress={() => { Linking.openURL('https://test.royaloceancollege.com/logincekdu')}} />
                <ButtonAcademik title="Konfirmasi Daftar Ulang Royal" onPress={() => { Linking.openURL('https://test.royaloceancollege.com/logincekduroi')}} />
              </View>

            }                 

      </View>
      </Container>
    )   
    
  }
}

export default Menu

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white',
      },
      header: {
        width: windowWidth ,
        height: windowHeight * 0.6,
        paddingHorizontal: 30,
        paddingTop: 0
      },         
     
        label: {          
            fontSize: 15,
            fontFamily: 'TitilliumWeb-Bold',
            fontWeight: 'bold'
        },
        pesananAktif: {
          marginTop: -windowHeight * 0.22,    
          paddingTop: 10,
          paddingHorizontal: 30,
          backgroundColor: WARNA_ABU_ABU,          
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        },
})
