import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Keyboard,
  Alert,
  Button,
  Dimensions
} from "react-native";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import auth from "@react-native-firebase/auth";
import { Link } from "expo-router";
import axios from "axios";

export default function Login () {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const nav = useNavigation<NativeStackNavigationProp<any>>();

  const goToMainFlow = async () => {
    
    if(email && password) {
        try {

            const response = await auth().signInWithEmailAndPassword(
                email,
                password
            )

            if(response.user){
                nav.replace("(tabs)");
            }



        }catch(e){
            Alert.alert("oops");
            console.log(e);
        }
    }
  };

  return (
    <Pressable style={styles.bigContainer} onPress={Keyboard.dismiss}>
      
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Sign In</Text>
      </View>
      <SafeAreaView style={styles.contentView}>
        <View style={styles.container}>
          <View style={styles.mainContent}>
            <TextInput
              style={styles.loginTextField}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              inputMode="email"
            />
            <TextInput
              style={styles.loginTextField}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <Pressable onPress={goToMainFlow} style={styles.signInButton}><Text style={styles.signInText}>Sign in</Text></Pressable>
          <Link href={'/signUp'} >
            <Text style={styles.linkText}>No Account? SignUp Here</Text>
          
          </Link>
        </View>
      </SafeAreaView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  bigContainer: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  contentView: {
    backgroundColor:'white',
    width: '95%',
    aspectRatio: '1/0.8',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(240, 240, 230, 1)',
    elevation:10,
    shadowColor:"black",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: 'center',
  },
  titleContainer: {
    alignItems:"center",
    justifyContent:"center",
    height:Dimensions.get('window').height *0.08,
    width:Dimensions.get('window').width *0.9,
    borderWidth:3,
    borderColor:"#77B0AA",
    borderRadius:40,
    marginBottom:20,
  },
  titleText: {
    fontSize: 30,
    color: 'rgba(77, 77, 77, 1)',
    
    margin: 0,
  },
  mainContent: {
    
    margin: 0,
  },
  loginTextField: {
    backgroundColor: 'rgba(238, 238, 238, 1)',
    padding: 0,
    height: '28%',
    width: Dimensions.get('window').width*0.85,
    margin:15,
    paddingLeft: 15,
    borderRadius: 20,
    marginBottom: 0,
    elevation:5,
    shadowColor:"black",
  },
  signInButton: {
    backgroundColor: '#77B0AA',
    height: Dimensions.get('window').height *0.06,
    width: Dimensions.get('window').width*0.65 ,
    justifyContent: 'center',
    borderRadius: 25,
    marginBottom:15,
  },
  signInText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    color:"white",
  },
  linkText: {
    color: 'black',
    fontSize:15,
  }
});
