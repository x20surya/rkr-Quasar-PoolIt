import { Button, Text, View } from "react-native";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import axios from "axios";
import MapViewStyle from "../../constants/MapViewStyle.json";
import * as Location from 'expo-location';
import { useEffect, useState } from "react";

export default function HomeScreen(){

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
          console.log(location);
        })();
      }, []);

      let text = 'Waiting..';
      if (errorMsg) {
        text = errorMsg;
      } else if (location) {
        text = JSON.stringify(location);
      }
   
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
        <MapView 
        style={{width:"100%",height:"60%"}}
        provider={PROVIDER_GOOGLE}
        customMapStyle={MapViewStyle}
        
        />
        <Button title="sign out" onPress={signOut} />
    </View>
  )
}