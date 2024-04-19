import { Button, Text, View } from "react-native";
import auth from "@react-native-firebase/auth";
import { useState } from "react";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";


export default function UserProfile(){

    
    const nav = useNavigation<NativeStackNavigationProp<any>>();


    const [userInfo,setUserInfo] = useState({
        email : "",
    });
    
    auth().onAuthStateChanged((user) => {
        if (user) {
          console.log('User email: ', user.email);
        }
    });

    function signOut(){
        auth()
        .signOut()
        .then(()=>{
          console.log("user signed out");
          nav.replace("(auth)");
        })
      }


    return(
        <View>
            <Text style={{color:"white"}}>{userInfo.email}</Text>
            <Button title = "sign out" onPress={signOut}  />
        </View>
    )
}