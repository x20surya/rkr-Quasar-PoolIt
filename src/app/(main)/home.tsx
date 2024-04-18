import { Button, Text, View } from "react-native";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

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
    <View>
        <Text style={{color:"white"}}>SYSTEM</Text>
        <Button title="sign out" onPress={signOut} />
    </View>
  )
}