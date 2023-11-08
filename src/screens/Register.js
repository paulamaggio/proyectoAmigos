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
            fotoPerfil:'',
            errors: {
                username: '',
                email: '',
                password: ''
            }
        }
    }

    registrarUsuario(username, email, password, miniBio){
        if (username.length == 0 && email.length == 0  && password.length == 0){
            this.setState({errors: {email:'ingrese email', username:'ingrese nombre', password: 'ingrese contraseña'}})

        }else if(username.length == 0 && email.length == 0 ) {
            this.setState({errors: {email:'ingrese email', username:'ingrese nombre', password:''}})

        }else if (username.length == 0 && password.length == 0 ){
            this.setState({errors: {email:'', username:'ingrese nombre', password:'ingrese contraseña'}})

        } else if (email.length == 0 && password.length == 0 ){
            this.setState({errors: {email:'ingrese email', username:'', password:'ingrese contraseña'}})

        } else if (email.length == 0){
            this.setState({errors: {email:'ingrese email', username:'', password:''}})

        } else if (password.length == 0 ){
            this.setState({errors: {email:'', username:'', password:'ingrese contraseña'}})

        } else if (username.length == 0){
            this.setState({errors: {email:'', username:'ingrese nombre', password:''}})
        } else {
            this.setState({errors:{email:'', username:'', password:''}})
            auth.createUserWithEmailAndPassword(email, password)
            .then(user => db.collection('users').add({
                owner: email,
                createdAt: Date.now(),
                username: username,
                miniBio: miniBio,
            }))
            .then((resp)=> console.log(resp))
            .catch(err => console.log(err) )}
            
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
            
            <Text>
                {this.state.errors.username}
            </Text>
            <TextInput
                style={styles.input}
                placeholder='Ingresa tu nombre de usuario'
                keyboardType='default'
                value={this.state.username}
                onChangeText={(text) => this.setState({username: text})}
            />
            
            <Text>
                {this.state.errors.email}
            </Text>
            <TextInput
                style={styles.input}
                placeholder='Ingresa tu email'
                keyboardType='email-address'
                value={this.state.email}
                onChangeText={(text) => this.setState({email: text})}
            />
            
            <Text>
                {this.state.errors.password}
            </Text>
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

            <TextInput
                style={styles.input}
                placeholder='Agrega tu foto de perfil'
                keyboardType='default'
                value={this.state.fotoPerfil}
                onChangeText={(text) => this.setState({fotoPerfil: text})}
            />

            <TouchableOpacity style={styles.btn} onPress={() => {this.registrarUsuario(this.state.username, this.state.email, this.state.password, this.state.miniBio)}}>
                <Text style={styles.textBtn}>Registrarme </Text>
            </TouchableOpacity>

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