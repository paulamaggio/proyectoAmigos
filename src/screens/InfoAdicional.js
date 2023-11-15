import React, { Component } from 'react'
import { Text, View } from 'react-native'
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
        <Text> Agregar foto de perfil</Text>
        <MyImagePicker 
            actEstFoto = {(url)=> this.actEstFoto(url)}
        />
         {this.state.fotoDePerfil !== '' ? (
          <TouchableOpacity onPress={() => this.actDocUsuario()}>
            <Text>Añadir foto de Perfil</Text>
          </TouchableOpacity>) 
        : 
        (<></>)
        }

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
          <Text>Omitir este paso</Text>
        </TouchableOpacity>

    </View>
    )
  }
}
