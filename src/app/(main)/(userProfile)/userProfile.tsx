import { Text, View } from "react-native";
import auth from "@react-native-firebase/auth";
import { useState } from "react";


export default function UserProfile(){


    const [userInfo,setUserInfo] = useState({
        email : "",
    });
    
    auth().onAuthStateChanged((user) => {
        if (user) {
          console.log('User email: ', user.email);
        }
    });


    return(
        <View>
            <Text style={{color:"white"}}>{userInfo.email}</Text>
        </View>
    )
}