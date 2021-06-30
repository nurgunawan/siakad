import React, { Component } from 'react'
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, Keyboard, Button, Alert } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker"; 
import moment from 'moment';

class Logindata extends Component {      
   
    constructor(props) {
        super(props);
        this.state = {
          show: false,
          value: '',
          nim:'',
          mode: 'date',
          displayFormat: 'DD/MM/YYYY',  
        };
        // this.CheckLogin = this.CheckLogin.bind(this);
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
      clickLayanan(navigation) {
        this.setState({
          layanan: navigation,
        });
      }

      CheckLogin=({nim , value, displayFormat, navigation }) => {         
          
          if(this.state.nim == '123' && moment(this.state.value).format(this.state.displayFormat)=='10/09/2020'){   
            
            Alert.alert("Informasi","Berhasil Login",[{text:'OK'}]);              
            
           
          }else{
            Alert.alert("Error","Login Gagal",[{text: 'Okay'}]);
          }
      }

      

    render() {
        const {value, nim,  show, mode, displayFormat} = this.state;        
        // 
        return (
        <View style={styles.container}>
            <View style={styles.nim}>
                <TextInput placeholder="No. Induk Mahasiswa" value={nim} keyboardType='numeric' maxLength={10} onChangeText={text => this.setState({nim:text})}/>
            </View>                                                                          
            <TouchableOpacity onPress={this.showDateTimePicker} >                
                <View style={styles.datePickerBox}>                                
                    <TextInput value={value ? moment(value).format(displayFormat) : ''} onFocus={this.showDateTimePicker} placeholder="Tanggal lahir" />
                </View>                
            </TouchableOpacity>                            
            <DateTimePickerModal date={value ? new Date(value) : new Date()} isVisible={show} mode={mode} onConfirm={this.handleDatePicked} onCancel={this.hideDateTimePicker} />
            <TouchableOpacity style={styles.appButtonContainer} onPress={ this.CheckLogin } >
                <Text style={styles.appButtonText}>Login</Text>
            </TouchableOpacity>
        </View> 
        );  
    };
};

export default Logindata

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
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
