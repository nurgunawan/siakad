import React, {Component} from 'react'
import { StyleSheet, View, ImageBackground, Dimensions } from 'react-native'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Left, Right, Title, Body } from 'native-base';
import { WARNA_UTAMA, WARNA_WARNING, WARNA_ABU_ABU, WARNA_ROI } from '../../utils/constant';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';


class Profile extends Component { 
    constructor(props) {
        super(props);       
        this.state = {            
            nim: '',
            nama: '',
            tmplahir:'',
            tgllahir: '',
            jk: '',
            agama: '',
            alamat: '',
            telp: '',
            kota: '',
            kelas: '',
            jurusan: '',
            displayFormat: 'DD-MM-YYYY', 
        };    
     
      }

    async componentDidMount(){
        await AsyncStorage.getItem('user', (error, resultP) => {   
            console.log(resultP)            
          if (resultP) {
              let resultParsed = JSON.parse(resultP)          
              this.setState({
                nim: resultParsed[0].NIM,
                nama: resultParsed[0].NAMA_MHS,
                tmplahir:resultParsed[0].TMP_LAHIR,
                tgllahir: resultParsed[0].TGL_LAHIR,
                jk: resultParsed[0].JKELAMIN,
                agama: resultParsed[0].AGAMA,
                alamat: resultParsed[0].ALAMAT,
                telp: resultParsed[0].TELEPON,
                kota: resultParsed[0].KOTA,
                kelas: resultParsed[0].KELAS,
                jurusan: resultParsed[0].KD_JURUSAN,
              });                
          }                
        });     
    }

    render() {
        return (            
            <Container>                              
                <Header style={ this.state.jurusan>=1 && this.state.jurusan<=6 ? {'backgroundColor': WARNA_UTAMA }: {'backgroundColor': WARNA_ROI}} androidStatusBarColor="#263238">
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>   
                        <Icon name="md-arrow-back-circle-outline" size={18} color="#FFF"/>
                        </Button>
                    </Left>
                    <Body style={{ flex: 3 }}>
                    <Title>Profile Mahasiswa</Title>
                    </Body>
                    <Right />
                </Header> 
                <Content padder>
                    <Card style={styles.kotak}>
                        <CardItem >
                            <Left>
                                <Thumbnail source={ this.state.jk=='P' ? (require('../../assets/images/user1_cewek.png')):(require('../../assets/images/user1.png')) } />
                                <Body>
                                <Text style={{fontWeight: 'bold' }}>{this.state.nim}</Text>
                                <Text note>{this.state.nama}</Text>
                                <Text note>Kelas {this.state.kelas}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Text style={{fontWeight: 'bold' }}>Tempat lahir </Text>
                            <Text note style={styles.text1}>{this.state.tmplahir}</Text>
                            <Text style={{fontWeight: 'bold' }}>Tanggal lahir </Text>
                            <Text note style={styles.text1}>{moment(this.state.tgllahir).format(this.state.displayFormat)}</Text>
                            <Text style={{fontWeight: 'bold' }}>Jenis Kelamin </Text>                                
                            <Text note style={styles.text1}>{this.state.jk=='P' ? "Perempuan": "Laki-Laki" }  </Text>
                            <Text style={{fontWeight: 'bold' }}>Agama </Text>
                            <Text note style={styles.text1}>{this.state.agama}</Text>
                            <Text style={{fontWeight: 'bold' }}>Alamat</Text>
                            <Text note style={styles.text1}>{this.state.alamat}</Text>
                            <Text style={{fontWeight: 'bold' }}>Kota</Text>
                            <Text note style={styles.text1}>{this.state.kota}</Text>
                            <Text style={{fontWeight: 'bold' }}>Telepon</Text>
                            <Text note style={styles.text1}>{this.state.telp}</Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Left>  
                            <Icon.Button name="md-pencil-outline" size={18} color="#FFF" 
                            onPress={() => this.props.navigation.navigate("EditProfile", {
                                'nama': this.state.nama,                                
                                'tmplahir': this.state.tmplahir,
                                'tgllahir': this.state.tgllahir,
                                'alamat': this.state.alamat,
                                'kota': this.state.kota,
                                'telp': this.state.telp    
                            })} light>
                                Edit Profile
                            </Icon.Button>                                                      
                            </Left>
                        </CardItem>
                    </Card>
                </Content>                 
            </Container>
        );
    }
}

export default Profile
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
   
    header: {
        width: windowWidth ,
        height: windowHeight * 0.4,
        paddingHorizontal: 30,
        paddingTop: 0
     },
    kotak:{
    flex:0,
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
    },
    photo:{
        shadowColor: '#000',
        borderColor:'#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },
    text1:{
        fontSize: 13,
        fontFamily: 'TitilliumWeb-light',
        padding: 5,
        textAlign: 'left', 
    }
})

// onPress={() => this.props.navigation.navigate("EditEmployee", {
//     'id': this.props.navigation.getParam('id', null),
//     'firstname': this.props.navigation.getParam('firstname', null),
//     'lastname': this.props.navigation.getParam('lastname', null),
//     'company': this.props.navigation.getParam('company', null),
//     'companyId': this.props.navigation.getParam('companyId', null),
//     'email': this.props.navigation.getParam('email', null),
//     'phone': this.props.navigation.getParam('phone', null)})}
// , {                                
//     'nama': this.props.navigation.getParam('nama', null),                                
//     'tmplahir': this.props.navigation.getParam('tmplahir', null),
//     'tmplahir': this.props.navigation.getParam('tgllahir', null),
//     'alamat': this.props.navigation.getParam('alamat', null),
//     'kota': this.props.navigation.getParam('kota', null),
//     'telp': this.props.navigation.getParam('telp', null)})