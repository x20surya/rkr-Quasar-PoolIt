import { Text, View ,StyleSheet,Image,Dimensions } from "react-native";
import auth from "@react-native-firebase/auth";
import { useState } from "react";
import { Props } from "react-native-virtualized-view/lib/typescript/ScrollView/model";
import { createMultiStyleIconSet } from "@expo/vector-icons";
import { SVGAttributes } from "react";
import {Link} from 'expo-router';
export default function About(){

    return(
        <View style={{backgroundColor:"white",flex:1}}>
            <Link href={'/userProfile'} style={styles.backOption}>
              <Image source={require('../../../../assets/images/back.png')} style={styles.svg}></Image>
            </Link>
            <View style={styles.TitleContainer}>
                 <Text style={styles.title}>Your Account Details : </Text>
            </View>
            <View >
               <View style={styles.textContainer}> 
                    <Text style={{color:"black",fontSize:20,padding:2}}>Name : </Text>
                    <Text style={{color:"#77B0AA",fontSize:18,fontWeight:"normal",}}>Mr Unknown</Text>

                </View>
                <View style={styles.textContainer}> 
                       <Text style={{color:"black",fontSize:20,padding:2}}>Email : </Text>
                       <Text style={{color:"#77B0AA",fontSize:18,fontWeight:"normal",}}>MrUnknown123@gmail.com</Text>
                </View>

                <View style={styles.textContainer}> 
                       <Text style={{color:"black",fontSize:20,padding:2}}>Phone Number : </Text>
                        <Text style={{color:"#77B0AA",fontSize:18,fontWeight:"normal",}}>+91 1234567890</Text>
                </View>
            </View>
            


        </View>
    )
}
const styles =StyleSheet.create({

    svg:{
        height:30,
        width:30,       
    },
    backOption:{
    
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        height:40,
        paddingLeft:5,
    },   
    TitleContainer:{
        alignItems:"center",
        justifyContent:"center",
        width:Dimensions.get('window').width *0.91,
        height:Dimensions.get('window').height *0.15,
        borderWidth:3,
        borderColor:"#77B0AA",
        borderRadius:40,
        marginVertical:50,
        marginHorizontal:10,
        
    },
    title:{
        color:"black",
        fontSize:38,
    },

 textContainer:{
    justifyContent:"center",
     height:80,
     width:"97%",
     borderBottomWidth:1,
     borderBottomColor:"#77B0AA",
     padding:10,  
 },




 
});
