import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import {Camera} from 'expo-camera'
import { FontAwesome } from '@expo/vector-icons'
import{storage} from '../firebase/config'
 
export default class CamaraPost extends Component {
    constructor(props){
        super(props)
        this.state ={ 
            mostrarCamara: true, 
            permisos: false,
            urlTemp : '',
        }
        this.metodosDeCamara = null
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then((resp)=>this.setState({permisos:true}))
        .catch((err)=>console.log(err))
    }
    
    tomarFoto(){
        this.metodosDeCamara.takePictureAsync()
        .then(imgTemp => this.setState({
            urlTemp: imgTemp.uri,
            mostrarCamara: false
        }))
        .catch(err=>console.log(err))
    }

    rechazarFoto(){
        this.setState({
            mostrarCamara:true,
            urlTemp: ''
        })
    }

    aceptarFoto(){
        fetch(this.state.urlTemp)
        .then(resp =>resp.blob())
        .then(img=>{
            const ref = storage.ref(`fotos/${Date.now()}.jpeg`)
            ref.put(img)
            .then(resp =>{
                ref.getDownloadURL()
                .then((url)=>this.props.actualizarFotoUrl(url))
            })
            .catch(err=>console.log(err))
        
        })
        .catch(err=>console.log(err))
    }

    render() {
       return (
        <View style ={styles.container}>
            {
            this.state.permisos && this.state.mostrarCamara? 
            <>
                <Camera
                    style= {styles.camara}
                    type = {Camera.Constants.Type.back}
                    ref = {(metodosDeCamara) => this.metodosDeCamara = metodosDeCamara}
                />
                <TouchableOpacity onPress={()=>this.tomarFoto()}>
                    <FontAwesome
                     name = 'camera'
                     size = {22}
                    />
                </TouchableOpacity>
            </>
            : 
            this.state.permisos && this.state.mostrarCamara === false?
            <>
                <Image
                    style={styles.img}
                    source={{uri: this.state.urlTemp}}
                    resizeMode={'contain'}
                />
                <TouchableOpacity
                onPress={()=>this.aceptarFoto()}
                >
                  <FontAwesome
                     name = 'check'
                     size = {22}
                    />
                </TouchableOpacity>


                <TouchableOpacity 
                onPress={()=>this.rechazarFoto()}
                >
                   <FontAwesome
                     name = 'ban'
                     size = {22}
                    />
                </TouchableOpacity>
            </>
            :
            <Text>Camara</Text>
            }
      
        </View>
    )}
}

const styles = StyleSheet.create({
    container:{ 
        flex: 1
    },
    camara: {
        height : 500,
        width: 700
    },
    img: {
        height : 300,
    }
})