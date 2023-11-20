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
        <View style={styles.container}>
            <FlatList style={styles.userContainer}
            data = {this.state.dataUsuario}
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
        <Text style={styles.texts}>Sus posteos ({this.state.cantidad}):</Text>

          <FlatList
          data = {this.state.posteosUsuario}
          keyExtractor= {(item) => item.id.toString()}
          renderItem= {({item}) => 
            <View style={styles.postContainer}>
              <Post navigation={this.props.navigation} data={item.data} id={item.id} />
            </View>}
          /> 
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
  img:{
    width:'100%',
    height:200,
  }
})
