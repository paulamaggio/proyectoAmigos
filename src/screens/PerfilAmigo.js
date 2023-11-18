import React, { Component } from 'react'
import { Text, View, FlatList, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { db } from '../firebase/config'
import Post from '../components/Post'



export default class PerfilAmigo extends Component {
    constructor(props){
        super(props)
        this.state={
            dataUsuario : null,
            posteosUsuario: [],
            cantidad: 0
        }
    }

    componentDidMount(){
        db.collection('users').where('owner', "==", this.props.route.params.email).onSnapshot((docs)=> {
          let usuario =  []
          docs.forEach((doc)=>{
            usuario.push({id: doc.id, data: doc.data()})
          })
          this.setState({dataUsuario:usuario})
        })

        db.collection('posts').where('owner', '==', this.props.route.params.email).onSnapshot((docs)=>{
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


  render() {
    return (
        <ScrollView>
        <View>
            <Text> Perfil </Text>
            <FlatList 
            data = {this.state.dataUsuario}
            keyExtractor={(item)=> item.id.toString()}
            renderItem={({item}) => <View>
            <Text>{item.data.username}</Text>
            <Text>{item.data.owner}</Text>
            <Text>{item.data.miniBio}</Text>
            {item.data.fotoPerfil?
            <Image 
              source={{uri:item.data.fotoPerfil}}
              style = {styles.img}      
            /> 
            :
            ''
            }
          </View>
          }
         />
        <View>
            
        <Text>Sus posteos ({this.state.cantidad}):</Text>

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
