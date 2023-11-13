import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { auth, db } from '../firebase/config'
import firebase from 'firebase'

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

  render() {
    return (
      <View style = {styles.container}>
        <Text>{this.props.data.owner}</Text>
        <Text>{this.props.data.descripcion}</Text>
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
                        color='red'
                        size={22}
                    />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=> this.like()}>
                    <FontAwesome
                        name='heart-o'
                        color='red'
                        size={22}
                    />
                </TouchableOpacity>
            }
</View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    img:{
        width:'100%',
        height:200
    }
})