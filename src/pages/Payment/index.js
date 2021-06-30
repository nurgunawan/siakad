import React, {Component} from 'react'
import { StyleSheet, Text, View, ImageBackground, Dimensions, ScrollView } from 'react-native'
import { ImageHeaderwec } from '../../assets';
import { ImageHeaderoi } from '../../assets';
import { Angsuran } from '../../components/';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import { WARNA_UTAMA, WARNA_WARNING, WARNA_ABU_ABU } from '../../utils/constant';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


class Payment extends Component {     
  constructor(props) {
    super(props);       
    this.state = {   
      tableHead: ['Tanggal bayar','Pembayaran', 'Jumlah'],   
      widthArr: [100, 100, 155],
      myArray: [],
      jurusan:'',
      namauser:'',
      totalbyr:'',
      piutang:'',
      totalbayar:0,
      totper:0,
      totabsen:0,
      totalbiaya:0,
      biaya:'',
      totalpiutang:0,
      noans:0,
      tglans:'',
      jmlang:0,
      kdjur:0,
      resultAngsur:[],
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
              biaya:resultParsed[0].BYR_BERSIH,
              totalbyr: resultParsed[0].TOTAL_BYR,
              piutang: resultParsed[0].PIUTANG,
              totper: resultParsed[0].tot_pert,
              kdjur:resultParsed[0].KD_JURUSAN,
          });                
      }                
    });   

    AsyncStorage.getItem('angsur', (error, hasilangsur) => {               
      if (hasilangsur) {        
          resultAngsur = JSON.parse(hasilangsur)          
          this.setState({resultAngsur})              
      }                
    });
  }

  render() {

    const format = num => {
    const n = String(num),
          p = n.indexOf('.')
    return n.replace(
        /\d(?=(?:\d{3})+(?:\.|$))/g,
        (m, i) => p < 0 || i < p ? `${m},` : m
      )
    }
  

    let usernama = this.state.namauser;    
    let total = this.state.totalbyr;
    let toper = this.state.totper;
    let kelas = this.state.jurusan;
    let piut = this.state.piutang;
    let totbiaya = this.state.biaya; 
    const {displayFormat} = this.state;        
    

    const tableData = this.state.resultAngsur.map(record=>([moment(record.TGL_ANS).format(displayFormat), 'Angsuran '+record.NO_ANS, 'Rp. '+format(record.JUMLAH)]));

    return (
       <View>        
          <ImageBackground source={this.state.kdjur>=1 && this.state.kdjur<=6 ? (ImageHeaderwec):(ImageHeaderoi)} style={styles.header}>            
          <View style={styles.pakbro}>
              <Text style={styles.selamat}>Selamat Datang, </Text>
              <Text style={this.state.kdjur>=1 && this.state.kdjur<=6 ? styles.username : styles.usern}>{usernama}</Text>
              <Text style={styles.kelas}>Kelas {kelas}</Text>
          </View>
          </ImageBackground>            
          <Angsuran totalbayar={total} totalbiaya={totbiaya} totalpiutang={piut} />  

          <View style={styles.pesananAktif}>
          <Text style={styles.label}>Data Angsuran</Text>   
          <View style={styles.container}>
          <ScrollView horizontal={true}>
            <View>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9', justifyContent: 'space-between', flex:1}}>
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
                            textStyle={styles.text}
                        />
                    ))
                  }
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
          </View>

          </View>        
      </View>
    )
  }
}

export default Payment

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white',
      },
        header: {
        width: windowWidth ,
        height: windowHeight * 0.42,
        paddingHorizontal: 30,
        paddingTop: 0
      },
      pakbro: {
        marginTop: windowHeight * 0.16,
      },
      selamat: {
        fontSize: 20,
        fontFamily: 'TitilliumWeb-Light',
        color:'#FFFFFF'
      },
      kelas: {
        fontSize: 16,
        fontFamily: 'TitilliumWeb-Bold',
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
        label: {          
            fontSize: 15,
            fontFamily: 'TitilliumWeb-Bold',
            fontWeight: 'bold',
        },
        pesananAktif: {
          paddingTop: 10,
          paddingHorizontal: 30,
          backgroundColor: WARNA_ABU_ABU,          
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        },
        container: { paddingTop: 5, backgroundColor: WARNA_ABU_ABU, flexDirection: 'column',width:windowWidth,
        justifyContent: 'center', alignItems: 'stretch', height:windowHeight * 0.41 },
        header1: { height: 30, backgroundColor: '#537791' },
        textHeader:{textAlign: 'center', fontWeight: 'bold',color:'#FFFFFF'},
        text: { textAlign:'center', fontWeight: 'bold',color:'#000000', fontSize:12, fontFamily: 'TitilliumWeb-light' },
        dataWrapper: { marginTop: -1 },
        row: { height: 30, backgroundColor: '#E7E6E1' }
})
