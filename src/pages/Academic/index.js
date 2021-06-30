import React, {Component} from 'react'
import { StyleSheet, Text, View, ImageBackground, Dimensions, Alert, Linking  } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { ImageHeaderwec } from '../../assets';
import { ImageHeaderoi } from '../../assets';
import { Saldo } from '../../components/';
import ButtonAcademik from '../../components/ButtonAcademik';
import { WARNA_UTAMA, WARNA_WARNING, WARNA_ABU_ABU } from '../../utils/constant';


class Academic extends Component {     
  constructor(props) {
    super(props);       
    this.state = {    
      tbangsur:null,  
      jurusan:'',
      namauser:'',
      totalbyr:0,
      piutang:0,
      jmlmat:0,
      jmltung:0,
      alpa:0,
      ijin:0,
      sakit:0,
      totper:0,
      gel:0,
      totabsen:0,
      jmlkul:0,
      nim:'',
      kdjur:0,
      beasiswa:'',
      tunggakan:0,  
      nunggak:0,       
      tottunggakan:0,
      mahasiswa:null,
    };    
 
  }
  


  componentDidMount(){
    AsyncStorage.getItem('user', (error, result) => {               
      if (result) {
          let resultParsed = JSON.parse(result) 
          if(resultParsed && resultParsed.length > 0 ){         
            this.setState({
                nim: resultParsed[0].NIM,
                kdjur: resultParsed[0].KD_JURUSAN,                
                namauser: resultParsed[0].NAMA_MHS,
                jurusan: resultParsed[0].KELAS,
                totalbyr: resultParsed[0].TOTAL_BYR,
                piutang: resultParsed[0].PIUTANG,
                totper: resultParsed[0].tot_pert,
                gel: resultParsed[0].GEL,
                beasiswa: resultParsed[0].BEASISWA,

            });  
            
            fetch('http://wec-roi.wearneseducation.com/api/cekpiutang', {method: 'POST',headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
            }, body: JSON.stringify({ nim: this.state.nim , gel: this.state.gel, kdjur:this.state.kdjur, beasiswa:this.state.beasiswa })} )
            .then((response) => response.json())
            .then( ( respJson ) => {
                
                this.setState({                              
                    mahasiswa: respJson.tbangsur,                                     
                })   
                
                var data = this.state.mahasiswa.map(function(itemku) {
                  return {
                      nunggak: itemku.totangs,              
                  };
                });   
                this.setState({
                  tunggakan: data[0].nunggak,                  
                });    
                console.log(this.state.tunggakan+'-'+this.state.totalbyr)

            })
            .catch((error)=>{
                console.log(error);
            });
           
          }else{
            this.setState({
              namauser: '',
              jurusan: '',
              totalbyr: 0,
              piutang: 0,
              totper: 0,
              gel:0,
              beasiswa:0,
              nim:'',
              kdjur:0,
              jmltung:0,   
              tunggakan:0,           
            });                
            setTimeout(() => {
              Alert.alert("Informasi"," Gagal Login",[{text:'OK'}]);                    
              this.props.navigation.navigate('MainUtama');              
            }, 500);
          }    
      }                
    });          
   

    AsyncStorage.getItem('absen', (error, hasil) => {       
      if (hasil) {
          let resultdata = JSON.parse(hasil)                 
          if(resultdata && resultdata.length > 0 ){
            this.setState({
              alpa: resultdata[0].alp,
              ijin: resultdata[0].ijin,
              sakit: resultdata[0].sakit,              
            });            
          }else{
            this.setState({
              alpa: 0,
              ijin: 0,
              sakit: 0,   
            });           
          }
              
      }                                     
    }); 

    AsyncStorage.getItem('kuliah', (error, matkul) => {             
      if (matkul) {       
          this.setState({
              jmlkul: matkul,              
          });                
      }                
    });   
      
    }


  render() {                  
    let usernama = this.state.namauser;    
    let total = this.state.totalbyr;
    let toper = this.state.totper;
    let totung = this.state.tunggakan;
    let piut = this.state.piutang;
    let totab = (((parseFloat(this.state.alpa,10) + parseFloat(this.state.ijin,10) + parseFloat(this.state.sakit,10)) / parseInt(toper,10))*100);
    let jmlmatkul = this.state.jmlkul;
    let tunggakanku=0;
    if(piut > 0 && (total < totung) ){                    
      tunggakanku = totung - total;
    }else{
      tunggakanku = 0;
    }
    
    return (
        <View>        
            <ImageBackground source={this.state.kdjur>=1 && this.state.kdjur<=6 ? (ImageHeaderwec):(ImageHeaderoi)} style={styles.header}>            
            <View style={styles.pakbro}>
                <Text style={styles.selamat}>Selamat Datang, </Text>
                <Text style={ this.state.kdjur>=1 && this.state.kdjur<=6 ? styles.username : styles.usern}>{usernama}</Text>
            </View>
            </ImageBackground>            
            <Saldo total_byr={total} piutang={piut} totabsen={totab} jmlmat={jmlmatkul} jmltung={tunggakanku} />  

            <View style={styles.pesananAktif}>
            <Text style={styles.label}>Menu Akademik</Text>                
                <ButtonAcademik title="Detail Angsuran" onPress={() => this.props.navigation.navigate('Payment')} />
                <ButtonAcademik title="Detail Nilai & Absensi" onPress={() => this.props.navigation.navigate('Absensi')} />
                <ButtonAcademik title="Angsuran Online" onPress={() => { Linking.openURL('https://test.royaloceancollege.com/angsuran')}}/>                                    
            </View>        
      </View>
    )
  }
}

export default Academic

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white',
      },
        header: {
        width: windowWidth ,
        height: windowHeight * 0.4,
        paddingHorizontal: 30,
        paddingTop: 0
      },
      pakbro: {
        marginTop: windowHeight * 0.15,
      },
      selamat: {
        fontSize: 20,
        fontFamily: 'TitilliumWeb-Light',
        color:'#FFFFFF'
      },
      username: {
        fontSize: 17,                
        fontFamily: 'TitilliumWeb-Bold',
        flexWrap: 'wrap',   
        width:'50%',
        fontWeight: 'bold',
        color:'#272727'
      },
      usern: {
        fontSize: 17,                
        fontFamily: 'TitilliumWeb-Bold',
        flexWrap: 'wrap',   
        width:'50%',
        fontWeight: 'bold',
        color:'#FAD925'
      },
        label: {          
            fontSize: 15,
            fontFamily: 'TitilliumWeb-Bold',
            fontWeight: 'bold'
        },
        pesananAktif: {
          paddingTop: 10,
          paddingHorizontal: 30,
          backgroundColor: WARNA_ABU_ABU,          
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        },
})
