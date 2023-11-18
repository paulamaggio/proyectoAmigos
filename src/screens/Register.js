import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { auth, db } from '../firebase/config'

export default class FormRegister extends Component {
    constructor(props){
        super(props)
        this.state = {
            username:'',
            email:'',
            password:'',
            miniBio:'',
            fotoPerfil:''
        }
    }

    registrarUsuario(username, email, password, miniBio){

        auth.createUserWithEmailAndPassword(email, password)
        .then(user => db.collection('users').add({
            owner: email,
            createdAt: Date.now(),
            username: username,
            miniBio: miniBio,
            fotoPerfil : ''
            }))
        .then((resp)=> this.props.navigation.navigate('InfoAdicional', {docId:resp.id}))
        .catch(err => console.log(err) )

        this.setState({
            username: '',
            email:'',
            password:'',
            miniBio:'',
            fotoPerfil:''
        })
    }

    componentDidMount(){
        auth.onAuthStateChanged((user) => {
            if (user !== null){
                this.props.navigation.navigate('TabNavigation')
            }
        })
    }

  render(){
    return (
      <View>
        <Text> FORMULARIO </Text>
            
            {/* VALIDACIONES */}
            {
                this.state.username?
                ''
                :
                <Text>Debe ingresar un nombre de usuario</Text> 
            }
            <TextInput
                style={styles.input}
                placeholder='Ingresa tu nombre de usuario'
                keyboardType='default'
                value={this.state.username}
                onChangeText={(text) => this.setState({username: text})}
            />
            
            {
                this.state.email?
                ''
                :
                <Text>Debe ingresar un email</Text> 
            }
            <TextInput
                style={styles.input}
                placeholder='Ingresa tu email'
                keyboardType='email-address'
                value={this.state.email}
                onChangeText={(text) => this.setState({email: text})}
            />

            {
                this.state.password?
                ''
                :
                <Text>Debe ingresar una contraseña</Text> 
            }
            <TextInput
                style={styles.input}
                placeholder='Ingresa tu contraseña'
                keyboardType='default'
                value={this.state.password}
                onChangeText={(text) => this.setState({password: text})}
            />
            
            <TextInput
                style={styles.input}
                placeholder='Ingresa una Bio'
                keyboardType='default'
                value={this.state.miniBio}
                onChangeText={(text) => this.setState({miniBio: text})}
            />

        {
            this.state.username && this.state.email && this.state.password && this.state.email.includes('@') && this.state.email.includes('.com') && this.state.password.length >= 6 ? (
                
                <TouchableOpacity style={styles.btn} onPress={() => {this.registrarUsuario(this.state.username, this.state.email, this.state.password, this.state.miniBio)}}>
                <Text style={styles.textBtn}>Registrarme </Text>
                </TouchableOpacity>
            ) : (
            this.state.email.includes('@') === false || this.state.email.includes('.com') === false ? (
            
                <Text>El email debe contener '@' y '.com'.</Text>
            ) : 
            this.state.password.length < 5 ? (

                <Text>La contraseña debe tener mas de 5 caracteres.</Text>
            ) 
            : (
                <Text>Complete los campos de nombre de usuario, email y contraseña para registrarse.</Text>
            )
            )
        }

            <Text>Ya tienes una cuenta? <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}><Text style={styles.textLink}>Logueate aqui! </Text></TouchableOpacity></Text>

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