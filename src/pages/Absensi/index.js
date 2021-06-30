import React,{Component} from 'react'
import { StyleSheet, Text, View, ImageBackground, Dimensions, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { ImageHeaderwec } from '../../assets';
import { ImageHeaderoi } from '../../assets';
import { AbsensiMhs } from '../../components';
import { WARNA_UTAMA, WARNA_WARNING, WARNA_ABU_ABU } from '../../utils/constant';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

class Absensi extends Component {     
  constructor(props) {
    super(props);       
    this.state = {   
      tableHead: ['Mata Kuliah','Nilai Akhir'],   
      widthArr: [250, 110],      
      jurusan:'',
      namauser:'',
      totalbyr:'',
      piutang:'',
      totalI:0,
      totper:0,
      totabsen:0,
      totalA:0,
      biaya:'',
      totalS:0,      
      alpa:0,
      ijin:0,
      sakit:0,
      kdjur:0,            
      resultNilai:[],
      displayFormat: 'DD-MM-YYYY', 
    };    
 
  }

componentDidMount(){
  AsyncStorage.getItem('user', (error, result) => {               
    if (result) {
        let resultParsed = JSON.parse(result)          
        this.setState({
          namauser: resultParsed[0].NAMA_MHS,
          jurusan: resultParsed[0].KELAS,
          biaya:resultParsed[0].HARGA,
          totalbyr: resultParsed[0].TOTAL_BYR,
          piutang: resultParsed[0].PIUTANG,
          totper: resultParsed[0].tot_pert,
          kdjur: resultParsed[0].KD_JURUSAN,
        });                
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

  AsyncStorage.getItem('nilai', (error, hasilnilai) => {             
    if (hasilnilai) {           
        resultNilai = JSON.parse(hasilnilai)                  
        this.setState({resultNilai})    
    }                
  });   

  }

render() {                  
  let usernama = this.state.namauser;    
  let total = this.state.totalbyr;
  let toper = this.state.totper;
  let piut = this.state.piutang;
  let kelas = this.state.jurusan;
  let totab = (((parseFloat(this.state.alpa,10) + parseFloat(this.state.ijin,10) + parseFloat(this.state.sakit,10)) / parseInt(toper,10))*100);
  
  const tableData = this.state.resultNilai.map(record=>([record.matakuliah, record.nilaiakhir]));  
  
  return (
    <View>        
      <ImageBackground source={this.state.kdjur>=1 && this.state.kdjur<=6 ? (ImageHeaderwec):(ImageHeaderoi)} style={styles.header}>            
      <View style={styles.pakbro}>
          <Text style={styles.selamat}>Selamat Datang, </Text>
          <Text style={this.state.kdjur>=1 && this.state.kdjur<=6 ? styles.username : styles.usern}>{usernama}</Text>
          <Text style={styles.kelas}>Kelas {kelas}</Text>
      </View>
      </ImageBackground>            
      <AbsensiMhs totabsen={totab} totalA={this.state.alpa} totalI={this.state.ijin} totalS={this.state.sakit} />  

      <View style={styles.pesananAktif}>
      <Text style={styles.label}>Nilai Mata Kuliah</Text>    
      <View style={styles.container}>
          <ScrollView horizontal={true}>
            <View>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                <Row data={this.state.tableHead} widthArr={this.state.widthArr} style={styles.header1} textStyle={styles.textHeader}/>
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                  {
                    tableData.map((rowData, index) => (                      
                        <Row
                            key={index}
                            data={rowData}
                            widthArr={this.state.widthArr}
                            style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                            textStyle={[styles.text, rowData[1]<60 && {color: '#ED3237'}]}
                        />                        
                    ))
                  }
                </Table>
              </ScrollView>
            </View>
          </ScrollView>          
          </View>      
          <Text style={styles.valueInfo}>* Geser kebawah untuk melihat nilai lainnya</Text>                                                  
      </View>        
    </View>

    )
  }
}
export default Absensi

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white',
      },
        header: {
        width: windowWidth ,
        height: windowHeight * 0.41,
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
        fontSize: 15,                
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
      kelas: {
        fontSize: 16,
        fontFamily: 'TitilliumWeb-Bold',
        color:'#FFFFFF'
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
        container: { paddingTop: 3, backgroundColor: WARNA_ABU_ABU, flexDirection: 'column',width:windowWidth,
        justifyContent: 'center', alignItems: 'stretch', height:windowHeight * 0.41 },
        header1: { height: 30, backgroundColor: '#537791' },
        textHeader:{textAlign: 'center', fontWeight: 'bold',color:'#FFFFFF'},
        text: { textAlign: 'center', fontWeight: 'bold',color:'#000000', fontSize:12, fontFamily: 'TitilliumWeb-light' },
        dataWrapper: { marginTop: -1 },
        row: { height: 30, backgroundColor: '#E7E6E1' },
        valueInfo: {     
          paddingTop: 5,   
          fontSize: 12,
          fontFamily: 'TitilliumWeb-Light',
          textAlign: 'left',
          fontWeight: '100',
          color: '#ED3237'
        }
})
