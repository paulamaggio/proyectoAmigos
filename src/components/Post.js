import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { auth, db } from '../firebase/config'
import firebase from 'firebase'

export default class Post extends Component {

    constructor(props){
        super(props)
        this.state = {
            likes: 0,
            likeado: false
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
      <View>
        <Text>{this.props.data.descripcion}</Text>
        <View>
            <Text>{this.props.data.likes}</Text>
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
