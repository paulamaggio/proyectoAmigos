import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { auth } from '../firebase/config'

export default class FromLogin extends Component {
    constructor(props){
      super(props)
      this.state = {
          email:'',
          password:''
      }
    }
 
    loguearUsuario(email, password){
      auth.signInWithEmailAndPassword(email, password)
      .then((user) => {this.props.navigation.navigate('TabNavigation')})
      .catch(err => console.log(err) )
    }

    componentDidMount(){
      auth.onAuthStateChanged((user) => {
          if (user !== null){
              this.props.navigation.navigate('TabNavigation')
          }
      })
    }

    render() {
      return (
        <View>
          <Text> Login </Text>
            <TextInput
                    style={styles.input}
                    placeholder='Ingresa tu email'
                    keyboardType='email-address'
                    value={this.state.email}
                    onChangeText={(text) => this.setState({email: text})}
                />
            <TextInput
                    style={styles.input}
                    placeholder='Ingresa tu contraseña'
                    keyboardType='default'
                    value={this.state.password}
                    onChangeText={(text) => this.setState({password: text})}
                />
          <TouchableOpacity style={styles.btn} onPress={() => this.loguearUsuario(this.state.email, this.state.password)}>
                  <Text style={styles.textBtn}>Login </Text>
          </TouchableOpacity>

          <Text>Aun no tienes una cuenta? <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}><Text style={styles.textLink}>Registrate aqui!</Text></TouchableOpacity></Text>

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
    textLink:{
        color:'blue'
    }
})