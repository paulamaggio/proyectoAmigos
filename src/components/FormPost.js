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
      <View>
        <TextInput 
            style={styles.input}
            placeholder= 'Añade una descripcion a tu post'
            value={this.state.descripcion}
            onChangeText={(text) => this.setState({descripcion: text})}/>
        <TouchableOpacity style={styles.btn} onPress={()=> this.props.onSubmit({descripcion: this.state.descripcion})}>
            <Text style={styles.textBtn}>Crear post</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 3,
        borderColor: 'purple',
        marginBottom: 20
    },
    btn:{ 
        backgroundColor: 'purple',
        padding: 16
    },
    textBtn:{
        color: 'white'
    },
})