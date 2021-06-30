import React, { Component } from 'react'
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, Keyboard, Button, Alert, ImageBackground } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker"; 
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import { ImageHeaderLogin } from '../../assets';
import { WARNA_UTAMA, WARNA_WARNING, WARNA_ABU_ABU, KONEK } from '../../utils/constant';


class Login extends Component{
    constructor(props) {
        super(props);        
        this.state = {
          show: false,
          value: '',
          nim:'',        
          mode: 'date',
          displayFormat: 'DD-MM-YYYY', 
          layanan: 'home', 
          user:null,
          username:null,
          absensi:null,
          kuliah:null,
          angsuran:null,
          nilai:null,                  
        };        
      }
     
      showDateTimePicker = () => {       
        this.setState({ show: true });
        Keyboard.dismiss();
      };
    
      hideDateTimePicker = () => {
        this.setState({ show: false });
      };
    
      handleDatePicked = value => {
        this.setState({ value: value });
        setTimeout(() => {
          this.hideDateTimePicker();
        }, 250);
      };
 
      CheckLogin = () => {   
        const {value, nim,  show, mode, displayFormat} = this.state;          
        
        fetch('http://wec-roi.wearneseducation.com/api/loginakun', {method: 'POST',headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }, body: JSON.stringify({ nim: nim , tgllahir: value })} )
            .then((response) => response.json())
            .then( ( responseJson ) => {
                // console.log(responseJson)
                this.setState({          
                    isLoading: false,
                    username: responseJson.operator,  
                    absensi: responseJson.absensi,  
                    kuliah: responseJson.kuliah, 
                    angsuran: responseJson.angsuran,
                    nilai: responseJson.nilai,
                })
                
                AsyncStorage.clear();
                    
                    AsyncStorage.setItem('user', JSON.stringify(this.state.username));                             
                    
                    AsyncStorage.setItem('absen', JSON.stringify(this.state.absensi));
                
                    AsyncStorage.setItem('kuliah', JSON.stringify(this.state.kuliah));
                
                    AsyncStorage.setItem('angsur', JSON.stringify(this.state.angsuran));
                
                    AsyncStorage.setItem('nilai', JSON.stringify(this.state.nilai));   
                if(this.state.username && this.state.username.length>0){                    
                    this.props.navigation.navigate('MainApp',  {screen: 'Academic'});   
                }else{
                    setTimeout(() => {
                        Alert.alert("Informasi"," Gagal Login",[{text:'OK'}]);                    
                        this.props.navigation.navigate('MainUtama');              
                    }, 500);
                }

        })
        .catch((error)=>{
            console.log(error);
        });
 
    }

    
    render() {
        const {value, nim,  show, mode, displayFormat} = this.state;                   
        
        return (
        <View>
        <ImageBackground source={ImageHeaderLogin} style={styles.header}>                        
        </ImageBackground>   
            <View style={styles.container}>
                <View style={styles.nim}>
                    <TextInput placeholder="No. Induk Mahasiswa" value={nim} keyboardType='numeric' maxLength={10} onChangeText={text => this.setState({nim:text})}/>
                </View>                                                                          
                <TouchableOpacity >                
                    <View style={styles.datePickerBox}>                                
                        <TextInput value={value ? moment(value).format(displayFormat) : ''} onFocus={this.showDateTimePicker} placeholder="Tanggal lahir" />
                    </View>                
                </TouchableOpacity>                            
                <DateTimePickerModal date={value ? new Date(value) : new Date()} isVisible={show} mode={mode} onConfirm={this.handleDatePicked} onCancel={this.hideDateTimePicker} />
                <TouchableOpacity style={styles.appButtonContainer} onPress={ () => this.CheckLogin() } >
                    <Text style={styles.appButtonText}>Login</Text>
                </TouchableOpacity>
            </View> 
        </View>
        );  
    };

};

export default Login

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
    container: {
    backgroundColor: 'white',
    padding: 25,
    marginHorizontal: 35,
    borderRadius: 10,
    shadowColor: '#000',       
    marginTop: -windowHeight * 0.22,    
    shadowOffset: {
        width: 0,
        height: 2,
        },     
        shadowOpacity: 0.10,
        shadowRadius: 4.65,
        elevation: 7,            
    }, 
    nim:{
    flexDirection: 'row',
    marginTop:20,
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1, 
    borderRadius:10,              
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
    },
    appButtonContainer: {
    marginTop:40,
    elevation: 8,
    backgroundColor: "#00AFEF",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 12
    },
    appButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
    }

})
