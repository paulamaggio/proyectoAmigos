import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity, StyleSheet  } from 'react-native'
import { auth, db } from '../firebase/config'

import FormSearch from '../components/FormSearch'
import { ScrollView } from 'react-native-web'

export default class Search extends Component {
  constructor(props){
    super(props)
    this.state={
      usuarios:[],
      usuariosBackup:[],
      value:''
    }
  }

  componentDidMount(){
    db.collection('users').onSnapshot((docs)=> {
      let arrayUsuarios=[]
      docs.forEach((doc)=>{
        arrayUsuarios.push({
          id:doc.id, 
          data: doc.data()
        })
      })
      this.setState({usuarios: arrayUsuarios, usuariosBackup: arrayUsuarios}, ()=>console.log(this.state.usuarios))
    })
  }

  actualizarInput(value){
    this.setState({
      value: value
    })
  }

  filterUsuarios(value){
    let filtUsuarios = this.state.usuariosBackup.filter((elm) => 
        elm.data.username.toLowerCase().includes(value.toLowerCase()) || elm.data.owner.toLowerCase().includes(value.toLowerCase()) 
    )
    this.setState({
      usuarios: filtUsuarios
    });
  }

  irPerfil(owner){
    if (owner == auth.currentUser.email){
      this.props.navigation.navigate('Profile')
    } else {
      this.props.navigation.navigate('PerfilAmigo', { email: owner })
    }
  }

  render() {
    return (
      <View>
        <ScrollView>
        <FormSearch style={styles.form} filterUsuarios={(value) => this.filterUsuarios(value)} actualizarInput={(value) => this.actualizarInput(value)}/>
        {
          this.state.value != ''? (
            this.state.usuarios.length != 0?
              <FlatList
              data={this.state.usuarios}
              keyExtractor={(item)=> item.id.toString()}
              renderItem={({item})=>
                <View style={StyleSheet.busqueda}>
                  <TouchableOpacity onPress={() => this.irPerfil(item.data.owner)}>
                    <Text> {item.data.name}</Text>
                    <Text>{item.data.owner}</Text>
                  </TouchableOpacity>
                </View>
                }
              />
              :
              <Text>El usuario buscado no existe.</Text>
          ) : (
            <Text style={styles.text}>Busca un usuario</Text>
          )
        }
      </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 550,
    fontWeight:'bold',


},
 form: {
   margintop: '100%'
}
}
)

