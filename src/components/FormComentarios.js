import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import {db, auth} from '../firebase/config'
import firebase from 'firebase'

export default class FormComentarios extends Component {
    constructor(props){
        super(props)
        this.state={
            comentario:''
        }

    }

    enviarComentario(comentario){
        db
        .collection('posts')
        .doc(this.props.postId)
        .update({
            comentarios: firebase.firestore.FieldValue.arrayUnion({
                owner: auth.currentUser.email, 
                createdAt: Date.now(), 
                comentario: comentario, 
            })
        })
        this.setState({comentario: ''})
    }

  render() {
    return (
      <View>
        <TextInput
        placeholder='Agrega tu comentario'
        style= {styles.input}
        keyboardType='default'
        onChangeText={(text)=>this.setState({comentario:text})}
        value={this.state.comentario}
        multiline={true}
        numberOfLines={5}
        />

        {this.state.comentario? 
          <TouchableOpacity style={styles.btn}
            onPress={()=> this.enviarComentario(this.state.comentario)}>
                <Text style={styles.textBtn}>Enviar comentario</Text>
          </TouchableOpacity>
        :
        ''
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 3,
        borderColor: 'pink',
        width: '80%',
        alignSelf: 'center'
    },
    btn:{ 
      backgroundColor: 'pink',
      padding: 16,
      justifyContent: 'center',
      alignSelf: 'center',
      width: '60%',
      marginTop:20
    },
    textBtn:{
      color: 'black',
      justifyContent: 'center',
      alignSelf: 'center',
    },
})