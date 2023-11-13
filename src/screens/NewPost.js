import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { auth, db } from '../firebase/config'

import FormPost from '../components/FormPost'

export default class NewPost extends Component {

  onSubmit({descripcion}){
    db.collection('posts').add({
      owner: auth.currentUser.email,
      createdAt: Date.now(),
      descripcion: descripcion,
      likes: []
    })
    .then()
    .catch(err => (console.log(err)))
  }

  render() {
    return (
      <View>
        <Text> NewPost </Text>
        <FormPost onSubmit={ (obj) => this.onSubmit(obj)} />
      </View>
    )
  }
}
