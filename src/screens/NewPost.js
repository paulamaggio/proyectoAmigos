import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { auth, db } from '../firebase/config'

import FormPost from '../components/FormPost'
import CamaraPost from '../components/CamaraPost'

export default class NewPost extends Component {

  constructor(props){
    super(props)
    this.state = {
      descripcion: '',
      urlFoto:'',
      paso1: true
    }
  }

  onSubmit({fotoUrl, descripcion}){
    db.collection('posts').add({
      owner: auth.currentUser.email,
      createdAt: Date.now(),
      fotoUrl: fotoUrl,
      descripcion: descripcion,
      likes: []
    })
    .then(() => {this.props.navigation.navigate('Home')})
    .catch(err => (console.log(err)))
  }

  actualizarDescripcion(text){
    this.setState({
      descripcion: text
  })
}

actualizarFotoUrl(url){
  this.setState({
    urlFoto:url,
    paso1: false
  })
}

  render() {
    return (
      <View style = {styles.container}>
        <Text> NewPost </Text>
        {
          this.state.paso1? 
          <CamaraPost 
          actualizarFotoUrl = {(url)=>this.actualizarFotoUrl(url)}
          />
          :
          <>
          <FormPost 
          //onSubmit={ (obj) => this.onSubmit(obj)} 
          actualizarDescripcion={(descripcion)=> this.actualizarDescripcion(descripcion)}
          estadoDescripcion= {this.state.descripcion}
          />
          <TouchableOpacity style={styles.btn} onPress={()=> this.onSubmit({descripcion: this.state.descripcion, fotoUrl:this.state.urlFoto})}>
              <Text style={styles.textBtn}>Crear post</Text>
          </TouchableOpacity>
          </>
        }
      
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
      borderWidth: 3,
      borderColor: 'purple',
      marginBottom: 20
  },
  btn:{ 
      backgroundColor: 'purple',
      padding: 16
  },
  textBtn:{
      color: 'white'
  },
  container:{ 
    flex:1
  }
})