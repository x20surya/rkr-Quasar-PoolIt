import { 
    StyleSheet,
    SafeAreaView,
    TextInput,
    Pressable,
    Keyboard,
    Alert,
    Button,
  } from 'react-native';
  import { useNavigation } from "@react-navigation/native";
  
  import React, { useState } from "react";
  import { Text, View } from '@/src/components/Themed';
  import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
  import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
  import db from "@react-native-firebase/database";
  
  export default function TabOneScreen() {
  
    const [name, setName] = useState<string | undefined>();
    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();
  
    const nav = useNavigation<NativeStackNavigationProp<any>>();
  
    const createProfile = async (response: FirebaseAuthTypes.UserCredential) => {
      // Create Profile Query Here
      db().ref(`/users/${response.user.uid}`).set({name});
      console.log(response.user.uid);
    };
  
    const registerAndGoToMainFlow = async () => {
      // Register User Query Here
      if(email && password){
        try {
          const response = await auth().createUserWithEmailAndPassword(
            email,
            password
          )
  
          if(response.user){
            await createProfile(response);
          }
  
  
  
        } catch(e){
          Alert.alert("oops");
          console.log(e);
        }
      }
    };
  
    return (
      <Pressable style={styles.contentView} onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.contentView}>
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Register</Text>
            </View>
            <View style={styles.mainContent}>
              <TextInput
                style={styles.loginTextField}
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.loginTextField}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                inputMode="email"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.loginTextField}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
            <Button
              title="Sign Up"
              onPress={registerAndGoToMainFlow}
            />
            <Button title="Go Back" onPress={nav.goBack} />
          </View>
        </SafeAreaView>
      </Pressable>
    );
  }
  
  const styles = StyleSheet.create({
    contentView: {
      flex: 1,
      backgroundColor: "white",
    },
    container: {
      flex: 1,
      marginHorizontal: 50,
      backgroundColor: "white",
      paddingTop: 20,
    },
    titleContainer: {
      flex: 1.2,
      justifyContent: "center",
    },
    titleText: {
      fontSize: 45,
      textAlign: "center",
      fontWeight: "200",
    },
    loginTextField: {
      borderBottomWidth: 1,
      height: 60,
      fontSize: 30,
      marginVertical: 10,
      fontWeight: "300",
      backgroundColor: "white"
    },
    mainContent: {
      flex: 6,
      backgroundColor: "white"
    },
  });
  