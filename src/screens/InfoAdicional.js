import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-web'
import MyImagePicker from '../components/MyImagePicker'
import {db} from '../firebase/config'

export default class InfoAdicional extends Component {
    constructor(props){
        super(props)
        this.state={
            fotoDePerfil: ''
        }
    }

    actEstFoto(url){
        this.setState({fotoDePerfil : url,})
    }

    actDocUsuario(){
        db
        .collection('users')
        .doc(this.props.route.params.docId)
        .update({
            fotoPerfil: this.state.fotoDePerfil
        })
        .then(resp=>{
            this.props.navigation.navigate('TabNavigation')
        })
    }

  render() {
    return (
    <View>
        <Text style={styles.titulo}> Agregar foto de perfil</Text>
        <MyImagePicker 
            actEstFoto = {(url)=> this.actEstFoto(url)}
        />
         {this.state.fotoDePerfil !== '' ? (
          <TouchableOpacity style={styles.btn}
          onPress={() => this.actDocUsuario()}>
            <Text style={styles.textBtn}>Añadir foto de Perfil</Text>
          </TouchableOpacity>) 
        : 
        (<></>)
        }

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
          <Text style={styles.texts}>Omitir este paso</Text>
        </TouchableOpacity>

    </View>
    )
  }
}

const styles = StyleSheet.create({
  titulo:{
    fontSize: 30,
    color: 'black',
    fontWeight:'bold',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop:30,
    marginBottom:30
  },
  texts:{
      marginBottom:15,
      alignSelf:'center',
      marginTop:15
  },
  iconos:{
      alignItems:'center'
  },
  btn:{ 
    backgroundColor: 'pink',
    padding: 16,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '60%',
    marginTop:20,
    marginBottom:10
  },
  textBtn:{
    alignSelf:'center'
  }
})