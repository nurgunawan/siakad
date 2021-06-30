import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import { ImageHeaderUtama } from '../../assets';
import { Daftar, News } from '../../components';
import { Login } from '..';
import { Menu } from '..';
import ButtonIcon from '../../components/ButtonIcon';
import AsyncStorage from '@react-native-community/async-storage';
import { WARNA_UTAMA, WARNA_WARNING, WARNA_ABU_ABU } from '../../utils/constant';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataDaftar: null,
      dataDu: null,
      daftarGel:null,      
      dataInfo: [],
      layanan: 'home',     
      judulK:'',
      inforK:'',
      namajudul:'',
      jdl:'',
      infor:'',
      namainfo:'',
      nim:'',
      jurusan:'',      
      totalbyr:0,
      piutang:0,
      gel:0,
      beasiswa:'',    
      tunggakan:0,  
      totper:0,    
      mahasiswa:0,        
    };
  }
  componentDidMount(){  

    AsyncStorage.getItem('user', (error, result) => {               
      if (result) {
          let resultParsed = JSON.parse(result) 
          if(resultParsed && resultParsed.length>0){
            this.setState({
                nim: resultParsed[0].NIM,
                namauser: resultParsed[0].NAMA_MHS,
                jurusan: resultParsed[0].KD_JURUSAN,
                totalbyr: resultParsed[0].TOTAL_BYR,
                piutang: resultParsed[0].PIUTANG,
                totper: resultParsed[0].tot_pert,
                gel: resultParsed[0].GEL,
                beasiswa: resultParsed[0].BEASISWA,
            });                 
            
          } else {
              this.setState({
                nim:null,
                namauser: null,
                jurusan: '',
                totalbyr: '',
                piutang: 0,
                totper: 0,
                tunggakan:0,
            });            
          }        
              
      }                
    });   

    

    fetch('http://wec-roi.wearneseducation.com/api/datadaftar', {method: 'GET',headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json', }})
      .then((response) => response.json())
      .then( ( responseJson ) => {
        this.setState({          
          isLoading: false,
          daftarGel: responseJson.gel,
          dataDaftar: responseJson.jumlah_daftar,
          dataDu: responseJson.jumlah_du,    
          dataInfo: responseJson.infonews,                    
        })        
        
        var dataNews = this.state.dataInfo.map(function(itemku) {
          return {
              jdl: itemku.judul,
              infor: itemku.informasi,              
          };
        });   
        this.setState({
          namajudul: dataNews[0].jdl,
          namainfo: dataNews[0].infor
        });    
 
      })
      .catch((error)=>{
        console.log(error);
      });

      
     
  }

  clickLayanan(value) {
    this.setState({
      layanan: value,
    });
  }
  
  Logout = async() => {   
    AsyncStorage.clear();
    this.state.nim=null;

    setTimeout(() => {
      this.props.navigation.navigate('MainUtama', {screen: 'Home'});              
    }, 500);
  }

  render() {       
    // const {judul, informasi} = this.state; 
    let jumlahdata = this.state.dataDaftar;
    let jumlahdu = this.state.dataDu;
    let gel = this.state.daftarGel;
    let ada = this.state.namauser;             
   
      if (this.state.isLoading){
        return (
        <View style={styles.page}>
            <ActivityIndicator size="large" animating/>
        </View>
        )
      }else{
       
        return (
        <View style={styles.page}>        
              <ImageBackground source={ImageHeaderUtama} style={styles.header}>            
              <View style={styles.hello}>
                  <News judulK={this.state.namajudul} inforK={this.state.namainfo}/>
              </View>
              </ImageBackground>            
              <Daftar pendaftaran={jumlahdata} du={jumlahdu} gelDaftar={gel}/>  

              <View style={styles.layanan}>
              <Text style={styles.label}>Menu Pelayanan</Text>              
                  <View style={styles.iconLayanan}>
                      <ButtonIcon title="Daftar Online" type='layanan' onPress={() => this.props.navigation.navigate('Menu',{ pil: 1, otherParam: 'Daftar Online'})} />
                      <ButtonIcon title="Konfirmasi Daftar" type='layanan' onPress={() => this.props.navigation.navigate('Menu',{ pil: 2, otherParam: 'Konfirmasi Daftar'})} />
                      <ButtonIcon title="DU Online" type='layanan' onPress={() => this.props.navigation.navigate('Menu',{ pil: 3, otherParam: 'Konfirmasi Daftar Ulang'})} />
                      {ada == null ? (<ButtonIcon title="Login Mahasiswa" type='layanan' onPress={() => this.props.navigation.navigate('Login')} /> ): (<ButtonIcon title="Logout Mahasiswa" type='layanan' onPress={ () => this.Logout() } /> ) }  
                      
                  </View>     
              </View>        
        </View>
        );
      }    
  }

}


export default Home

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: WARNA_ABU_ABU,
      },
        header: {
        width: windowWidth ,
        height: windowHeight * 0.4,
        paddingHorizontal: 30,
        paddingTop: 0
      },
      hello: {
        marginTop: windowHeight * 0.09,
      },
      selamat: {
        fontSize: 20,
        fontFamily: 'TitilliumWeb-Light',
        color:'#FFFFFF'
      },
      username: {
        fontSize: 18,
        fontFamily: 'TitilliumWeb-Bold',
      },      
        iconLayanan: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 5,
            flexWrap: 'wrap',                            
        },    
        layanan: {
            paddingLeft: 35,
            paddingTop: 4
        },
        label: {
            fontSize: 15,
            fontFamily: 'TitilliumWeb-Bold',
            fontWeight: 'bold'
        },
        items:{
          flex:1,
          alignSelf:'stretch',
          margin:10,
          alignItems:'center',
          justifyContent:'center'
        }
});
