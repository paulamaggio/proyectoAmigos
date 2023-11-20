import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity } from 'react-native'

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
      <View>
        <Text> Search </Text>
        <TextInput
        placeholder="Búsqueda"
        name="busqueda"
        onChangeText={(value) => this.cambios(value)}
        />
      </View>
    )
  }
}
