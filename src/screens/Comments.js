import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet} from 'react-native'
import FormComentarios from '../components/FormComentarios'
import {db} from '../firebase/config'

export default class Comments extends Component {
    constructor(props){
        super(props)
        this.state={
            dataPost: null
        }

    }
    componentDidMount(){
        db
        .collection('posts')
        .doc(this.props.route.params.id)
        .onSnapshot((doc)=>{
            this.setState({
                dataPost: doc.data()
            })
        })
    }

  render() {
    return (
      <View>
        {
            this.state.dataPost !== null && this.state.dataPost.comentarios ? (
            <FlatList style={styles.comment}
            data = {this.state.dataPost.comentarios}
            keyExtractor ={(item)=>item.createdAt.toString()}
            renderItem ={({item})=> <View>
                <Text style={styles.owner}><strong>{item.owner}</strong></Text>
                <Text style={styles.comment}> {item.comentario} </Text>
            </View>}
            /> 
            ) : (
            <Text style={styles.alert}>Aun no hay comentarios</Text>
            )
        }

        <FormComentarios
        postId={this.props.route.params.id}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  alert: {
    marginBottom : 30,
    marginTop: 10,
    alignSelf:'center'
  },
  owner:{
  marginBottom: 2,
  marginTop: 10,
  alignSelf:'center'
  },
  comment:{
    marginBottom: 3,
    marginTop: 2,
    alignSelf:'center'
  }
})