import React, {Component} from 'react'
import { StyleSheet, View, ImageBackground, Dimensions, Alert, TouchableOpacity, TextInput } from 'react-native'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Label, Textarea, Form, Item, Input, Button, Left, Right, Title, Body } from 'native-base';
import { WARNA_UTAMA, WARNA_WARNING, WARNA_ABU_ABU, WARNA_ROI } from '../../utils/constant';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker"; 
import Icon from 'react-native-vector-icons/Ionicons';


class EditProfile extends Component { 
    constructor(props) {
        super(props);
        this.state = {            
            'nama': '',                                
            'tmplhr': '',
            'tgllhr': '',
            'alamat': '',
            'kota': '',
            'telp': '',
            'agama':'',
            'kelas':'',
            'jurusan':'',
            'nim':'',
            'jk':'',
            'username':null,           
        };
    }   

    _focusInput(inputField) {
        this[inputField]._root.focus();
    }

    onValueChange(value: string) {
        this.setState({
            selected: value
        });
    }
    
    _onSave = async() => {            
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(this.state.nama < 2) {
            Alert.alert(
                "Alert",
                "Masukkan Nama Lengkap",
                [
                    { text: "Ok", onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
            )
        }else if(this.state.tmplhr < 2) {
            Alert.alert(
                "Alert",
                "Masukkan Tempat Lahir",
                [
                    { text: "Ok", onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
            )
        }else if(this.state.tgllhr=='') {
            Alert.alert(
                "Alert",
                "Masukkan Tanggal lahir",
                [
                    {text: "Ok", onPress: () => console.log('OK Pressed')}
                ],
                {cancelable: false}
            )
        }else if(this.state.alamat=='') {
            Alert.alert(
                "Alert",
                "Masukkan Alamat Lengkap",
                [
                    {text: "Ok", onPress: () => console.log('OK Pressed')}
                ],
                {cancelable: false}
            )    
        }else if(this.state.kota=='') {
            Alert.alert(
                "Alert",
                "Masukkan Kota",
                [
                    {text: "Ok", onPress: () => console.log('OK Pressed')}
                ],
                {cancelable: false}
            )
        }else if(this.state.telp<8) {
            Alert.alert(
                "Alert",
                "Masukkan Telepon",
                [
                    {text: "Ok", onPress: () => console.log('OK Pressed')}
                ],
                {cancelable: false}
            )
        }else{            
            try {                
                let response = await fetch('http://wec-roi.wearneseducation.com/api/MHSedit/'+this.state.nim, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nama: this.state.nama,
                        tmplhr: this.state.tmplhr,
                        tgllhr: this.state.tgllhr,
                        alamat: this.state.alamat,
                        kota: this.state.kota,
                        telp: this.state.telp
                    }),
                });
                
                let responseJson = await response.json();

                if(responseJson.status === "success"){                     
                    this.setState({                                  
                        username: responseJson.operator,                          
                    });          
                                        
                   AsyncStorage.setItem('user', JSON.stringify(this.state.username));                     
                    Alert.alert(
                        "Success",
                        responseJson.message,
                        [
                            { text: "Ok", onPress: () => this.props.navigation.navigate('Profile') }
                        ],
                        { cancelable: false }
                    )
                }else{                    
                    Alert.alert(
                        "Error",
                        responseJson.message,
                        [
                            { text: "Try Again", onPress: () => console.log('OK Pressed') }
                        ],
                        { cancelable: false }
                    )
                }
            } catch (error) {                
                Alert.alert(
                    "Error",
                    "Terjadi kesalahan, harap pastikan Anda terhubung ke internet dan coba lagi",
                    [
                        { text: "Try Again", onPress: () => console.log('OK Pressed') }
                    ],
                    { cancelable: false }
                )
                console.log("caught", error)
            }

        }

    }

    _getDataku = () => { 
        AsyncStorage.getItem('user', (err, result) => {     
        if (result) {
            let resultParsed = JSON.parse(result)              
            this.setState({
              nim: resultParsed[0].NIM,
              nama: resultParsed[0].NAMA_MHS,
              tmplhr:resultParsed[0].TMP_LAHIR,
              tgllhr: resultParsed[0].TGL_LAHIR,
              jk: resultParsed[0].JKELAMIN,
              agama: resultParsed[0].AGAMA,
              alamat: resultParsed[0].ALAMAT,
              telp: resultParsed[0].TELEPON,
              kota: resultParsed[0].KOTA,
              kelas: resultParsed[0].KELAS,
              jurusan: resultParsed[0].KD_JURUSAN,
            });                
        }                 
        })
      };

    componentDidMount(){
        this._getDataku();
    }

    

    render() {     
        let nim = this.state.nim;   
        let value = this.state.tgllhr;
        const { show, mode, displayFormat} = this.state;                   
        return (            
            <Container>
            <Header style={ this.state.jurusan>=1 && this.state.jurusan<=6 ? {'backgroundColor': WARNA_UTAMA }: {'backgroundColor': WARNA_ROI}} androidStatusBarColor="#263238">
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>   
                        <Icon name="md-arrow-back-circle-outline" size={18} color="#FFF"/>
                        </Button>
                    </Left>
                    <Body style={{ flex: 3 }}>
                    <Title>Edit Mahasiswa</Title>
                    </Body>
                    
                </Header>          
            <Content padder>
                <Form>
                    <Item floatingLabel style={{ margin: 10 }}>
                        <Label>Nama Lengkap</Label>
                        <Input style={styles.text1}
                            getRef={(input) => this.nama = input}
                            autoCapitalize='none'
                            value={this.state.nama}
                            onChangeText={(text) => this.setState({ nama: text })}
                            onSubmitEditing={(event) => {
                                this._focusInput('tmplhr')
                            }}/>
                    </Item>
                    <Item floatingLabel style={{ margin: 10 }} >
                        <Label>Tempat Lahir</Label>
                        <Input style={styles.text1}
                            getRef={(input) => this.tmplhr = input}
                            value={this.state.tmplhr}
                            autoCapitalize='none'
                            onChangeText={(text) => this.setState({ tmplhr: text })}
                            onSubmitEditing={(event) => {
                                this._focusInput('tgllhr')
                            }} />
                    </Item>
                    <Item floatingLabel style={{ margin: 10 }} >
                        <Label>Tanggal Lahir (yyyy-mm-dd)</Label>                                               
                        <Input style={styles.text1}
                            getRef={(input) => this.tgllhr = input}
                            value={this.state.tgllhr}
                            autoCapitalize='none'
                            keyboardType={"phone-pad"}  
                            onChangeText={(text) => this.setState({ tgllhr: text })}
                            onSubmitEditing={(event) => {
                                this._focusInput('alamat')
                            }}/>
                    </Item>
                    <Item floatingLabel style={{ margin: 10 }} >
                        <Label>Alamat</Label>                        
                        <Input style={styles.text1}
                            getRef={(input) => this.alamat = input}
                            value={this.state.alamat}
                            autoCapitalize='none'  
                            numberOfLines={4}
                            multiline={true}                          
                            onChangeText={(text) => this.setState({ alamat: text })}
                            onSubmitEditing={(event) => {
                                this._focusInput('kota');
                            }} />
                    </Item>
                    <Item floatingLabel style={{ margin: 10 }} >
                        <Label>Kota</Label>
                        <Input style={styles.text1}
                            getRef={(input) => this.kota = input}
                            value={this.state.kota}
                            autoCapitalize='none'                            
                            onChangeText={(text) => this.setState({ kota: text })}
                            onSubmitEditing={(event) => {
                                this._focusInput('telp');
                            }} />
                    </Item>
                    <Item floatingLabel style={{ margin: 10 }} >
                        <Label>Telepon</Label>
                        <Input style={styles.text1}
                            getRef={(input) => this.telp = input}
                            value={this.state.telp}
                            autoCapitalize='none'
                            keyboardType={"phone-pad"}                            
                            onChangeText={(text) => this.setState({ telp: text })}/>
                    </Item>
                    <Button
                        onPress={() => this._onSave()}
                        block style={{ backgroundColor: WARNA_UTAMA , marginTop: 15, marginLeft: 100, marginRight: 100 }} rounded bordered>
                        <Text style={{ color:'#FFF' }}>Save</Text>
                    </Button>                    
                    <Button
                        onPress={() => this.props.navigation.goBack()}
                        block style={{ backgroundColor: WARNA_WARNING,  marginTop: 15, marginLeft: 100, marginRight: 100 }} rounded bordered>
                        <Text style={{ color:'#FFF' }}>Cancel</Text>
                    </Button>  
                </Form>
            </Content>
            </Container>
        );
    }
}

export default EditProfile
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
   
    header: {
        width: windowWidth ,
        height: windowHeight * 0.4,
        paddingHorizontal: 30,
        paddingTop: 0
     },
    
    text1:{
        fontSize: 13,
        fontFamily: 'TitilliumWeb-light',
        padding: 5,
        textAlign: 'left', 
        fontWeight: 'bold',
    },
    datePickerBox:{
    marginTop: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 0,
    borderRadius:10,
    height: 40,
    justifyContent:'center'
    },
    
    datePickerText: {
    fontSize: 14,
    marginLeft: 5,
    borderWidth: 0,
    color: '#000',     
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