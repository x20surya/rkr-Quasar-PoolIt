import { Button, Text, View, Dimensions, Modal } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import axios from "axios";

import * as Location from "expo-location";
import { useContext, useEffect, useRef, useState, useMemo } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MapPassenger } from "@/src/components/MapPassenger";






export default function HomeScreen() {
  const [state, setState] = useState({
    pickupCords: {
      latitude:0,
      longitude:0
    },
    droplocationCors: {
      latitude:0,
      longitude:0
    },
  });

  

  const { pickupCords, droplocationCors } = state;

  const [currentLocation,setCurrentLocation] = useState({});

  // useEffect(()=>{
  //   const interval = setInterval(async ()=>{
  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);
  //   },10000);
  //   return ()=>clearInterval(interval);
  // })

    const bottomSheetRef= useRef<BottomSheet>(null)
  
    const handleClosePress= () =>bottomSheetRef.current?.close()
    const handleOpenPress= () =>bottomSheetRef.current?.expand()
const snapPoints= useMemo(()=>['25%', '50%', '75%', '100%'],[])
  // const BottomSheetComp= gestureHandlerRootHOC(()=> {
  //   
  

  
  //   return (
    
  
    
  
  // )})

  const nav = useNavigation<NativeStackNavigationProp<any>>();

  function signOut() {
    auth()
      .signOut()
      .then(() => {
        console.log("user signed out");
        nav.replace("(auth)");
      });
  }

  function fetchPickUp (data,details){
    console.log("run");
    const lat = details.geometry.location.lat
    const lng = details.geometry.location.lng
    console.log(lat,lng);
    setState({
        ...state,pickupCords:{
            latitude:lat,
            longitude:lng
        }
    })
  }

  async function putCurrentLocation(){
     
    let location = await Location.getCurrentPositionAsync({});

    setCurrentLocation(location);

    console.log("current location",currentLocation.coords);

    setState({
        ...state,pickupCords:{
            latitude: currentLocation.coords.latitude,
            longitude : currentLocation.coords.longitude
        }
    })
  }



  function fetchDrop (data,details){
    console.log("run");
    const lat = details.geometry.location.lat
    const lng = details.geometry.location.lng
    console.log(lat,lng);
    setState({
        ...state,droplocationCors:{
            latitude:lat,
            longitude:lng
        }
    })
  }

  console.log("pickupcords", pickupCords);
  console.log("dropcords", droplocationCors);

  return (

     (
      <GestureHandlerRootView style={{flex:1}}>
        <MapPassenger dropLat={state.droplocationCors.latitude} dropLong={state.droplocationCors.longitude} pickLat={state.pickupCords.latitude} pickLong={state.pickupCords.longitude}/>

        <BottomSheet ref={bottomSheetRef} index= {1} snapPoints={snapPoints}>
        <ScrollView 
          style={{backgroundColor:'white'}}
          keyboardShouldPersistTaps="handled"
          >
          <GooglePlacesAutocomplete
            placeholder="Enter Pick Up Location"
            fetchDetails={true}
            onPress={fetchPickUp}
            query={{
              key: "AIzaSyA4IGQAa3lWLh2jy1gRqEjybQ5aAqVDKcg",
              language: "en",
            }}
          />
          <GooglePlacesAutocomplete
            placeholder="Enter Destination Location"
            fetchDetails={true}
            onPress={fetchDrop}
            query={{
              key: "AIzaSyA4IGQAa3lWLh2jy1gRqEjybQ5aAqVDKcg",
              language: "en",
            }}
          />
          </ScrollView>
      </BottomSheet>
        {/* <Button title="close" onPress={handleClosePress}/>
        <Button title="open" onPress={handleOpenPress}/> */}
        {/* <Button title="use current location" onPress={putCurrentLocation} />
        <Button title="sign out" onPress={signOut} /> */}
      </GestureHandlerRootView>
    )
  );
}
