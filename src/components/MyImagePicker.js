import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import {storage} from '../firebase/config' 
import { FontAwesome } from '@expo/vector-icons'


export default class MyImagePicker extends Component {
    constructor(props){
        super(props)
        this.state={
            imagenCargada: ''
        }
    }

    activarPicker(){
        ImagePicker.launchImageLibraryAsync()
        .then(imageData => this.setState({imagenCargada:imageData.assets[0].uri}))
        .catch(err => console.log(err))
    }

    aceptarImg(){
        fetch(this.state.imagenCargada)
        .then(resp => resp.blob())
        .then(imagen => {
            let ref = storage.ref(`imgPerfil/${Date.now()}.jpeg`)
            ref.put(imagen)
            .then(()=> {
                ref.getDownloadURL()
                .then((url) => {this.props.actEstFoto(url)})
            })
        })
        .catch(err => console.log(err))


    }

    rechazarImg(){
        this.setState({imagenCargada: ''})
    }



  render() {
    return (
      <View>
        {this.state.imagenCargada !== ''?
            <>
                <Image 
                source={{uri:this.state.imagenCargada}}
                style = {styles.img}
                resizeMode='contain'
                /> 
                <TouchableOpacity style={styles.iconos}
                onPress={()=>this.aceptarImg()}>
                    <Text>Aceptar foto</Text>
                  <FontAwesome
                     name = 'check'
                     size = {30}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconos}
                onPress={()=>this.rechazarImg()}>
                    <Text>Seleccionar otra foto</Text>
                   <FontAwesome
                     name = 'ban'
                     size = {30}
                    />
                </TouchableOpacity>

            </>
        :
            <>
                <TouchableOpacity
                onPress={()=>this.activarPicker()}>
                    <Text style={styles.texts}>Cargar imagen de mi galeria</Text>
                </TouchableOpacity>
            </>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
    img:{
        height:200,
    },
    texts:{
        marginBottom:10,
        alignSelf:'center'
    },
    iconos:{
        alignItems:'center',
        marginBottom:15,
        marginTop:15
    }
})
