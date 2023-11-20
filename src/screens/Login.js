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

      this.setState({
        email:'',
        password:''
      })
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
        <View style={styles.container}>
          <Text style={styles.text}> Login </Text>
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

          {
            this.state.email && this.state.password && this.state.email.includes('@') && this.state.email.includes('.com') && this.state.password.length >= 6 ? (
                
              <TouchableOpacity style={styles.btn} onPress={() => this.loguearUsuario(this.state.email, this.state.password)}>
                <Text style={styles.textBtn}>Login</Text>
              </TouchableOpacity>
            ) : (
                <Text>Complete los campos de email y contraseña para loguearse.</Text>
            )
        }

          <Text>Aun no tienes una cuenta? <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}><Text style={styles.textLink}>Registrate aqui!</Text></TouchableOpacity></Text>

        </View>
      )
    }
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      alignItems:'center',
    },
    input: {
        borderWidth: 3,
        borderColor: 'pink',
        marginBottom: 20
    },
    btn:{ 
        backgroundColor: 'pink',
        padding: 16,
        marginBottom:15
    },
    textBtn:{
        color: 'black'
    },
    textLink:{
        color:'blue'
    },
    text: {
      fontWeight:'bold',
      marginBottom:20,
      marginTop:20,
      fontSize:20,
      alignSelf:'center'
    }
})