import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'

export default class FormSearch extends Component {
    constructor(props){
        super(props)
    }

    cambios(value){
        this.props.actualizarInput(value)
        this.props.filterUsuarios(value)
    }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}> Buscador </Text>
        <TextInput
        placeholder="Búsqueda"
        name="busqueda"
        onChangeText={(value) => this.cambios(value)}
        style={styles.input}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
      borderWidth: 3,
      borderColor: 'pink',
      marginBottom: 20,
      width: "60%",
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 100,
  },
  container: {
    justifyContent: 'center',
      alignItems: 'center',
      flex: 1
  },
  text: {
    fontSize: 30,
    color: 'black',
    fontWeight:'bold',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop:30
  }
})



