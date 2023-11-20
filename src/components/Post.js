import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { auth, db } from '../firebase/config'
import firebase from 'firebase'
import { styleProps } from 'react-native-web/dist/cjs/modules/forwardedProps'

export default class Post extends Component {

    constructor(props){
        super(props)
        this.state = {
            likes: 0,
            likeado: false,
            username:[]
        }
    }

    componentDidMount(){ 
        let validacionLike = this.props.data.likes.includes(auth.currentUser.email)
        this.setState({
            likeado: validacionLike
        })
    }

    like(){
        db.collection('posts')
        .doc(this.props.id)
        .update({likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)})
        .then((resp)=> this.setState({likeado:true}))
        .catch((err)=> (console.log(err)))
    }

    dislike(){
        db.collection('posts')
        .doc(this.props.id)
        .update({likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)})
        .then((resp)=> this.setState({likeado:false}))
        .catch((err)=> (console.log(err)))
    }

    irAComentar(){
        this.props.navigation.navigate('Comments', {id: this.props.id})
    }


    irPerfil(owner){
        owner == auth.currentUser.email ?
          this.props.navigation.navigate('Profile')
          :
          this.props.navigation.navigate('PerfilAmigo', { email: owner })
    }
    
  render() {
    return (
      <View style = {styles.container}>
        <TouchableOpacity onPress={()=> this.irPerfil(this.props.data.owner)}>
            <Text style = {styles.owner}><strong>{this.props.data.owner}</strong></Text>
        </TouchableOpacity>

        <Text style = {styles.owner}>{this.props.data.descripcion}</Text>
        <Image
            source={{uri:this.props.data.fotoUrl?this.props.data.fotoUrl:''}}
            style = {styles.img}
            resizeMode='contain'
        />
        <View>
            <Text>{this.props.data.likes.length}</Text>
            { this.state.likeado ?
                <TouchableOpacity onPress={()=> this.dislike()}>
                    <FontAwesome
                        name='heart'
                        color='#ff1493'
                        size={22}
                    />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=> this.like()}>
                    <FontAwesome
                        name='heart-o'
                        color='#ff1493'
                        size={22}
                    />
                </TouchableOpacity>
            }
        </View>
        <View style= {styles.comment}>
            <TouchableOpacity
            onPress={()=> this.irAComentar()}>
                {this.props.data.comentarios?
                <Text>Comentarios: {this.props.data.comentarios.length}</Text>
                :
                <Text>Comentarios: 0</Text>
                }
            </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    img:{
        width:'100%',
        height:200,
    },
    comment: {
        marginBottom : 30,
        marginTop: 3
    },
    owner:{
        marginBottom: 5,
    }
})

