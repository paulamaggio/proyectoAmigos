import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { auth, db } from '../firebase/config'


export default class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      cantidad : 0,
      dataUsuario: null
      
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
        posteos.push(doc.descripcion)
      })

      this.setState({cantidad: posteos.length})
    })
  }

  logOut(){
      auth.signOut()
      this.props.navigation.navigate('Login')
  }

  render() {
    return (
      <View>
        <Text>Profile </Text>
         <FlatList
        data={this.state.dataUsuario}
        keyExtractor={(item)=> item.id.toString()}
        renderItem={({item}) => <View>
          <Text>{item.data.username}</Text>
          <Text>{item.data.owner}</Text>
          <Text>{item.data.miniBio}</Text>
        </View>
        }
        /> 
        <View>
            <Text>Cantidad de posteos: {this.state.cantidad}</Text>
            <TouchableOpacity style={styles.btn} onPress={() => this.logOut()}>
                <Text style={styles.textBtn}>Cerrar sesion</Text>
            </TouchableOpacity>
        </View>
      </View>
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
})