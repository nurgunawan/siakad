import React, { useEffect, Component } from 'react'
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native'
import { SplashBackground } from '../../assets'
import AsyncStorage from '@react-native-community/async-storage';


class Splash extends Component {

  constructor(props) {
    super(props);       
    this.state = {      
      jurusan:'',
      namauser:'',
      nim:'',
    };       
  }    
  
    componentDidMount() {
      this._getData();
    }

    _getData = () => {      
                 
        AsyncStorage.getItem('user', (err, result) => {
          console.log(result)
          if (result) {
            let resultData = JSON.parse(result)    
            if(resultData && resultData.length > 0 ){ 
              this.setState({
                namauser: resultData[0].NAMA_MHS,
                jurusan: resultData[0].KD_JURUSAN,
                nim:resultData[0].NIM
              });     
                if (this.state.nim === null) {
                  setTimeout(() => {
                    this.props.navigation.navigate('MainUtama');              
                  }, 1500);
                } else {              
                    setTimeout(() => {
                      this.props.navigation.navigate('MainApp');              
                    }, 1500);
                }           
            }else{
              this.setState({
                namauser: '',
                jurusan: '',
                nim:''
              });
              setTimeout(() => {
                this.props.navigation.navigate('MainUtama');              
              }, 1500);
            }                  
            
        }else{
          setTimeout(() => {
            this.props.navigation.navigate('MainUtama');              
          }, 1500);
        }      
        });
      };

    render() {
        return (
            <ImageBackground source={ SplashBackground } style={ styles.background }>           
            </ImageBackground>
        );
      }
}

export default Splash

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
