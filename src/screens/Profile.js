import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, FlatList, ScrollView, Image } from 'react-native'
import { auth, db } from '../firebase/config'
import Post from '../components/Post'


export default class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      cantidad : 0,
      dataUsuario: null,
      posteosUsuario : [],
      idUsuario : ''
    }
  }

  componentDidMount(){
    db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot((docs)=>{
      let usuario = []
      docs.forEach((doc)=> {
       usuario.push({id: doc.id, data: doc.data()})
      })
      this.setState({dataUsuario:usuario})
    })

    db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot((docs)=>{

      let posteos = []
      docs.forEach((doc)=>{
        let posteo = {
          id: doc.id,
          data: doc.data()
        }
        posteos.push(posteo)
      })
      this.setState({posteosUsuario : posteos})
      this.setState({cantidad: posteos.length})
    })
  }

  logOut(){
      auth.signOut()
      this.props.navigation.navigate('Login')
  }

  borrarPosteo(idPost){
    let validar = confirm('Esta seguro de que quiere borrar este post?')
    if(validar){
    db
    .collection('posts')
    .doc(idPost)
    .delete()
    .then()
    .catch((err)=> (console.log(err)))}
    
  }

  eliminarCuenta(email){
    db
    .collection('users')
    .where('owner', '==', email)
    .onSnapshot((docs)=>{
      let id = ''
      docs.forEach((doc)=>{
        id = doc.id
      })
      this.setState({idUsuario:id}, ()=>{
        let validar = confirm('Esta seguro de que quiere eliminar su cuenta?')
        if(validar){
          db
          .collection('users')
          .doc(this.state.idUsuario)
          .delete()
          .then((resp)=>console.log(resp))
          .catch((err)=>console.log(err))

          this.props.navigation.navigate('Register')
        }
      })
    })
  }

  render() {
    return (
      <ScrollView>
      <View >
        <Text>Profile </Text>
         <FlatList
        data={this.state.dataUsuario}
        keyExtractor={(item)=> item.id.toString()}
        renderItem={({item}) => <View>
          <Text>{item.data.username}</Text>
          <Text>{item.data.owner}</Text>
          <Text>{item.data.miniBio}</Text>
          <Image 
              source={{uri:item.data.fotoPerfil}}
              style = {styles.img}      
          /> 
        </View>
        }
        /> 
        <View>
            <Text>Cantidad de posteos: {this.state.cantidad}</Text>
        </View>

        <View>
          <Text>Tus posteos:</Text>
          <FlatList
          data = {this.state.posteosUsuario}
          keyExtractor= {(item) => item.id.toString()}
          renderItem= {({item}) => 
        <View>
          <Post navigation={this.props.navigation} data={item.data} id={item.id} />
          <TouchableOpacity onPress={()=>this.borrarPosteo(item.id)}>
            <Text>Borrar post</Text>
          </TouchableOpacity>
        </View>}
          /> 

          <TouchableOpacity style={styles.btn} onPress={() => this.logOut()}>
            <Text style={styles.textBtn}>Cerrar sesion</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> this.eliminarCuenta(auth.currentUser.email)}>
            <Text>Eliminar tu cuenta</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
    btn:{ 
        backgroundColor: 'purple',
        padding: 16
    },
    textBtn:{
        color: 'white'
    },
    img:{
      height:200
  }
})