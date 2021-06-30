import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Payment, Academic, Profile, Splash, Login, Absensi, EditProfile, Info, Menu } from '../pages';
import { BottomNavigator } from '../components/';
import TabItem from '../components/TabItem';

const Stack = createStackNavigator(); 
const StackAK = createStackNavigator(); 
const StackHome = createStackNavigator(); 
const Tab = createBottomTabNavigator();
const Tab1 = createBottomTabNavigator();

const AddButton = () => {
  return null
}
const MainUtama = () => {
    return (
      <Tab1.Navigator tabBar={props => <BottomNavigator {...props} />}>
        <Tab1.Screen name="Home" component={MainHome} />        
        <Tab1.Screen name="Academic" component={Login} />
        <Tab1.Screen name="Profile" component={Login} />
        <Tab1.Screen name="Info" component={Login} />
      </Tab1.Navigator>      
    )
}

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={MainHome} />        
      <Tab.Screen name="Academic" component={MainAkademik} />
      <Tab.Screen name="Profile" component={Profile}/>
      <Tab.Screen name="Info" component={Info} />
    </Tab.Navigator>      
  )
}
const MainHome=() => {
  return (
    <StackHome.Navigator>
       <StackHome.Screen name="Home" component={Home} options={{ headerShown: false, gestureEnabled: false }} />
       <StackHome.Screen name="Login" component={Login} options={{ headerShown: false }} />           
       <StackHome.Screen name="Menu" component={Menu} options={{ headerShown: false }} />           
    </StackHome.Navigator>
    )
}

const MainAkademik=() => {
  return (
    <StackAK.Navigator>
       <StackAK.Screen name="Academic" component={Academic} options={{ headerShown: false }} />                              
       <StackAK.Screen name="Payment" component={Payment} options={{ headerShown: false }} /> 
       <StackAK.Screen name="Absensi" component={Absensi} options={{ headerShown: false }} />                                     
    </StackAK.Navigator>
    )
}



const Router = () => {
    return (
    <Stack.Navigator initialRouteName="Splash">
       <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />                       
       <Stack.Screen name="MainUtama" component={MainUtama} options={{ headerShown: false }} />  
       <Stack.Screen name="MainHome" component={MainHome} options={{ headerShown: false }} />                
       <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }} />
       <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
       
    </Stack.Navigator>
    )
}

export default Router

const styles = StyleSheet.create({})
