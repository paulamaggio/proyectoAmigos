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
        <Text style={styles.text}> Home </Text>
        <FlatList
        style= {styles.flatList}
        data= {this.state.posts}
        keyExtractor= {(item) => item.id.toString()}
        renderItem= {({item}) => <Post navigation={this.props.navigation} data={item.data} id={item.id} />}
        />
      </View>
    )
  }
}

// const styles = StyleSheet.create({
 //  container:{
   //    flex:1
 //  },
// })

const styles = StyleSheet.create({
  container: {
    flex:1, 
    backgroundColor: '#DCDCDC',
    paddingHorizontal: 16,
    paddingTop: 16,

  },
  flatList: {
    marginTop: 16,
  },
  text: {
    fontWeight:'bold',
    fontSize: '200%'
  }
})