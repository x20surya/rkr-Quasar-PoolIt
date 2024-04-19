import { Text, View ,StyleSheet,Image } from "react-native";
import auth from "@react-native-firebase/auth";
import { useState } from "react";
import { Props } from "react-native-virtualized-view/lib/typescript/ScrollView/model";
import { createMultiStyleIconSet } from "@expo/vector-icons";
import { SVGAttributes } from "react";
import {Link} from 'expo-router';
export default function About(){

    return(
        <View>
            <Link href={'/userProfile'} style={styles.backOption}>
              <Image source={require('../../../../assets/images/back.png')} style={styles.svg}></Image>
              <Text style={styles.back}>Back</Text>
            </Link>
            <Text style={styles.title}>Your Account Details : </Text>
             <View style={styles.container}>
             <View style={styles.textContainer}> 
               <Text style={{color:"white",fontSize:20,padding:2}}>Name : </Text>
               <Text style={{color:"white",fontSize:18,fontWeight:"normal",}}>Mr Unknown</Text>

            </View>
            <View style={styles.textContainer}> 
               <Text style={{color:"white",fontSize:20,padding:2}}>Email : </Text>
               <Text style={{color:"white",fontSize:18,fontWeight:"normal",}}>MrUnknown123@gmail.com</Text>

            </View>

            <View style={styles.textContainer}> 
               <Text style={{color:"white",fontSize:20,padding:2}}>Phone Number : </Text>
               <Text style={{color:"white",fontSize:18,fontWeight:"normal",}}>+91 1234567890</Text>

            </View>
         </View>
            


        </View>
    )
}
const styles =StyleSheet.create({

    textContainer:{
    justifyContent:"center",
     height:80,
     width:"97%",
     borderBottomWidth:1,
    
     borderBottomColor:"white",
     padding:10,
    },
    container:{
       marginVertical:60,
    },
  title:{
    color:"white",
    fontSize:38,
   marginTop:30,
    padding:10,
},
svg:{
    height:30,
    width:30,
   
},
backOption:{
    height:40,
    display:"flex",
    flexDirection:"row",

},
 back:{
    color:"lightblue",
    fontSize:20,  

 },
});
