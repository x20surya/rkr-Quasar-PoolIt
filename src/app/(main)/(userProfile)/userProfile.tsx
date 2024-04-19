import { Text, View,Image,StyleSheet ,ScrollView,TouchableHighlight,TouchableOpacity,Button} from "react-native";
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
            <View style={styles.container}>
                <TouchableOpacity>
                    <View style={styles.Box}></View>
                    <Image source={require('../../../../assets/images/pic.png')} style={styles.profilepic}>
                       
                    </Image>
                </TouchableOpacity>
            </View>
            <Text style={{color:"white"}}>{userInfo.email}</Text>
            <Button title = "sign out" onPress={signOut}  />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        justifyContent:"center",
    },
    Box:{
        backgroundColor:"orange",
        height:200,
        width:300,
    },

    profilepic:{
      height:150,
      width:150,
    }
});