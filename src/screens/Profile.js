import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { auth } from '../firebase/config'

export default class Profile extends Component {

    logOut(){
        auth.signOut()
        this.props.navigation.navigate('Login')
    }

  render() {
    return (
      <View>
        <Text> Profile </Text>
        <Text>{auth.currentUser.email}</Text>
        <View>
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