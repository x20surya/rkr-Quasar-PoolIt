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
    backgroundColor: 'rgba(240, 240, 230, 1)'
  },
  contentView: {
    backgroundColor:'white',
    width: '95%',
    aspectRatio: '1/0.7',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(52, 52, 52, 0.5)',
  
  },
  container: {
    width: '100%',
    flex: 1,
    flexDirection: "column",
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  titleContainer: {
    height:Dimensions.get('window').height *0.09 ,

  },
  titleText: {
    fontSize: 40,
    color: 'rgba(77, 77, 77, 1)',
    
    margin: 0,
  },
  mainContent: {
    
    margin: 0,
  },
  loginTextField: {
    backgroundColor: 'rgba(238, 238, 238, 1)',
    padding: 0,
    height: '30%',
    width: Dimensions.get('window').width*0.85,
    margin:15,
    paddingLeft: 15,
    borderRadius: 5,
    marginBottom: 0,
  },
  signInButton: {
    backgroundColor: 'rgba(158, 255, 75, 1)',
    height: Dimensions.get('window').height *0.06,
    width: Dimensions.get('window').width*0.65 ,
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    shadowColor: 'black',
    shadowRadius: 50,
    margin: 0,
  },
  signInText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500'

  },
  linkText: {
    color: 'blue'
  }
});
