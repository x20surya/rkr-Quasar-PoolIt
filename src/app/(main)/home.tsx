import { Button, Text, View } from "react-native";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import axios from "axios";

export default function HomeScreen(){
   
    const nav = useNavigation<NativeStackNavigationProp<any>>();

    function signOut(){
        auth()
        .signOut()
        .then(()=>{
          console.log("user signed out");
          nav.replace("(auth)");
        })
    }
  return(
    <View style={{flex:1}}>
        <Text style={{color:"white"}}>SYSTEM</Text>
        <MapView style={{width:"100%",height:"60%"}} />
        <Button title="sign out" onPress={signOut} />
    </View>
  )
}