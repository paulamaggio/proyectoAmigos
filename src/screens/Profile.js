import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, FlatList, ScrollView, Image } from 'react-native'
import { auth, db } from '../firebase/config'
import { getAuth, deleteUser } from "firebase/auth";

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
    const user = auth.currentUser;

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
          .then(user.delete()
                .then(this.props.navigation.navigate('Register'))
                .catch((err)=>console.log(err)))
          .catch((err)=>console.log(err))

        }
      })
    })
  }

  render() {
    return (
      <ScrollView>
      <View style={styles.container} >
        <Text style={styles.email}>Mi perfil </Text>
         <FlatList style={styles.userContainer}
        data={this.state.dataUsuario}
        keyExtractor={(item)=> item.id.toString()}
        renderItem={({item}) => <View>
          <Text style={styles.texts}><strong>Usuario: {item.data.username}</strong></Text>
          <Text style={styles.texts}>Email: {item.data.owner}</Text>
          <Text style={styles.texts}>{item.data.miniBio}</Text>

          {item.data.fotoPerfil?
            <Image
              source={{uri:item.data.fotoPerfil}}
              style = {styles.img}
              resizeMode={'contain'}
            /> 
          :
          ''
          }

        </View>
        }
        /> 

        <View>
          <Text style={styles.texts}>Tus posteos ({this.state.cantidad}) :</Text>
          <FlatList
          data = {this.state.posteosUsuario}
          keyExtractor= {(item) => item.id.toString()}
          renderItem= {({item}) => 
        <View style={styles.postContainer}>
          <Post navigation={this.props.navigation} data={item.data} id={item.id} />
          <TouchableOpacity style={styles.btnEliminar} onPress={()=>this.borrarPosteo(item.id)}>
            <Text style={styles.textsBtn}>Borrar post</Text>
          </TouchableOpacity>
        </View>}
          /> 

          <TouchableOpacity style= {styles.btn} onPress={() => this.logOut()}>
            <Text style={styles.textsBtn}>Cerrar sesion</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={()=> this.eliminarCuenta(auth.currentUser.email)}>
            <Text style={styles.textsBtn}>Eliminar tu cuenta</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#F5F5F5', 
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  userContainer:{
    marginBottom: 16,
    backgroundColor: '#FFFFFF', 
    borderRadius: 8, 
    padding: 16,
    elevation: 2, 
  },
  postContainer:{
    marginBottom: 16,
    backgroundColor: '#FFFFFF', 
    borderRadius: 8, 
    padding: 16,
    elevation: 2, 
  },
  btn:{
    backgroundColor:'pink',
    padding: 10,
    borderRadius:6,
    marginTop:20,
    alignSelf: 'center',
    justifyContent: 'center',
    width:'20%'
  },
  btnEliminar:{
    backgroundColor:'pink',
    padding: 10,
    borderRadius:6,
    marginBottom: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    width:'20%'
  },
  email:{
    fontWeight:'bold',
    alignSelf:'center',
    fontSize: 20,
    marginBottom: 30

  },
  texts:{
    marginBottom:10,
    alignSelf:'center'
  },
  textsBtn:{
    alignSelf:'center'
  },
  img:{
    width:'100%',
    height:200,
  }
})