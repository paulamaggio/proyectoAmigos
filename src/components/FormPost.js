import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'

export default class FormPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            descripcion: ''
        }
    }

  render() {
    return (
      <View style={styles.container}>
        <TextInput 
            style={styles.input}
            placeholder= 'Añade una descripcion a tu post'
            value={this.state.estadoDescripcion}
            onChangeText={(text) => this.props.actualizarDescripcion(text)}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 3,
        borderColor: 'green',
        marginBottom: 20,
        width: "600%",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },

    container: {
      justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
})

