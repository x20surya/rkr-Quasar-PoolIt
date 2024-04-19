import { Text, View,Image,StyleSheet ,ScrollView,TouchableHighlight,TouchableOpacity} from "react-native";
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
            <View style={styles.container}>
                <TouchableOpacity>
                    <View style={styles.Box}></View>
                    <Image source={require('../../../../assets/images/pic.png')} style={styles.profilepic}>
                       
                    </Image>
                </TouchableOpacity>
            </View>
            <Text style={{color:"white"}}>{userInfo.email}</Text>
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