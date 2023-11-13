import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet } from 'react-native'
import { auth, db } from '../firebase/config'

import Post from '../components/Post'

export default class Home extends Component {

  constructor(props){
    super(props)
    this.state = {
        posts: []
    }
  }

  componentDidMount(){
    db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(docs => {
      let arrayPosts = []
      docs.forEach(doc => {
        arrayPosts.push({
          id: doc.id,
          data: doc.data()
        })
      })

      this.setState({posts: arrayPosts})
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> Home </Text>
        <FlatList
        data= {this.state.posts}
        keyExtractor= {(item) => item.id.toString()}
        renderItem= {({item}) => <Post  data={item.data} id={item.id} />}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
      flex:1
  },
})