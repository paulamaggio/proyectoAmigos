import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {FontAwesome, Octicons} from '@expo/vector-icons'

import Home from '../screens/Home'
import Profile from '../screens/Profile'
import Search from '../screens/Search'
import NewPost from '../screens/NewPost'

const Tab = createBottomTabNavigator()

export default function TabNavigation(){
    return (
      <Tab.Navigator>
        <Tab.Screen name='Home' component={Home} options={{headerShown: false, tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />}}/>
        <Tab.Screen name='Search' component={Search} options={{headerShown: false, tabBarIcon: () => <FontAwesome name="search" size={24} color="black" />}}/>
        <Tab.Screen name='NewPost' component={NewPost} options={{headerShown: false, tabBarIcon: () => <Octicons name="diff-added" size={24} color="black" />}}/>
        <Tab.Screen name='Profile' component={Profile} options={{headerShown: false, tabBarIcon: () => <FontAwesome name="user" size={24} color="black" />}}/>
      </Tab.Navigator>
    )
  }
