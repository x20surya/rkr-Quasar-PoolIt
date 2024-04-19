import { Button, Text, View, Dimensions, Modal, Alert } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import axios from "axios";

import * as Location from "expo-location";
import { useContext, useEffect, useRef, useState, useMemo, useCallback } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MapPassenger } from "@/src/components/MapPassenger";






export default function HomeScreen() {

  //true if Ride is booked & but driver may or may not be found
  const [validForBooking, setValidity]= useState(false);

  //true if Ride is booked & driver is found
  const [rideBooked, setBookingStatus]= useState(false);

  
  const [state, setState] = useState({
    pickupCords: {
      name: "Current Location",
      latitude:0,
      longitude:0
    },
    droplocationCors: {
      name: "Enter Drop Off Location",
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
    const handleMnimizePress= () =>bottomSheetRef.current?.snapToIndex(0)
    const handleOpenPress= () =>bottomSheetRef.current?.expand()
const snapPoints= useMemo(()=>['25%', '50%', '75%', '100%'],[])
  // const BottomSheetComp= gestureHandlerRootHOC(()=> {
  //   
  

  
  //   return (
    
  
    
  
  // )})

  const nav = useNavigation<NativeStackNavigationProp<any>>();

  function fetchPickUp (data,details){
    console.log("run");
    const lat = details.geometry.location.lat
    const lng = details.geometry.location.lng
    console.log(lat,lng);
    if(state.droplocationCors.latitude!=0){
      bottomSheetRef.current?.snapToIndex(0)
    }
    let nm3=data.description
    setState({
        ...state,pickupCords:{
            name: nm3,
            latitude:lat,
            longitude:lng
        }
    })
    
    
  }

  async function putCurrentLocation(){
     
     location = await Location.getCurrentPositionAsync({});

    // setCurrentLocation(location);

    // console.log("current location", currentLocation.coords);
    let nm1="Current Location"
    setState({
        ...state,pickupCords:{
          name: nm1,
            latitude: currentLocation.coords.latitude,
            longitude : currentLocation.coords.longitude
        }
    })
  }
let location
const assignCurrentLocation = useCallback(async ()=>{
  location =await Location.getCurrentPositionAsync({})
  console.log("burrr", location);
  




setCurrentLocation(location);
console.log("currr",currentLocation)


let nm2= state.pickupCords.name

  setState({
    ...state,pickupCords:{
        name: nm2,
        latitude: currentLocation.coords.latitude,
        longitude : currentLocation.coords.longitude
    }
})

},[])

  useEffect( ()=> {
    setTimeout(()=>{assignCurrentLocation();},1000)
    
    
    
  },[assignCurrentLocation])


  function fetchDrop (data,details){
    
    console.log('data',data);
    console.log('details',details);
    const lat = details.geometry.location.lat
    const lng = details.geometry.location.lng
    console.log(lat,lng);
    bottomSheetRef.current?.snapToIndex(0)
    let nm4= data.description
    console.log(nm4)
    setState({
        ...state,droplocationCors:{
          name: nm4,
            latitude:lat,
            longitude:lng
        }
    })
    
    
  }

  // console.log("pickupcords", pickupCords);
  // console.log("dropcords", droplocationCors);
  // console.log("cu", currentLocation);

  const confirmBooking = ()=>
{
  if(state.droplocationCors.name=="Enter Drop Off Location"){
    Alert.alert('Bhosdike', 'Destination Daal', [
      {
        text: 'Ok Papa',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      }])
  }else{
    setValidity(true)
    Alert.alert('Nice', 'Ride Booked', [
      {
        text: 'Ok Papa',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      }])

  }
}

  return (

     (
      <GestureHandlerRootView style={{flex:1}}>
        <MapPassenger
        dropLat={state.droplocationCors.latitude}
        dropLong={state.droplocationCors.longitude}
        pickLat={state.pickupCords.latitude==0 ? ((Object.keys(currentLocation).length)>0? currentLocation.coords.latitude:0 ):state.pickupCords.latitude}
        pickLong={state.pickupCords.longitude==0 ? ((Object.keys(currentLocation).length)>0? currentLocation.coords.longitude:0 ):state.pickupCords.longitude}/>

        {!validForBooking && !rideBooked && <BottomSheet ref={bottomSheetRef} index= {1} snapPoints={snapPoints}>
        <ScrollView 
          style={{backgroundColor:'white'}}
          keyboardShouldPersistTaps="handled"
          >
          <GooglePlacesAutocomplete
            placeholder={state.pickupCords.name}
            fetchDetails={true}
            onPress={fetchPickUp}
            query={{
              key: "AIzaSyA4IGQAa3lWLh2jy1gRqEjybQ5aAqVDKcg",
              language: "en",
            }}
          />
          <GooglePlacesAutocomplete
            placeholder={state.droplocationCors.name}
            fetchDetails={true}
            onPress={fetchDrop}
            query={{
              key: "AIzaSyA4IGQAa3lWLh2jy1gRqEjybQ5aAqVDKcg",
              language: "en",
            }}
          />
          <Button title="use current location" onPress={putCurrentLocation} />
          </ScrollView>
      </BottomSheet>}
      {validForBooking && !rideBooked && <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
            <Text>Finding Drivers</Text>
        </BottomSheet>}
      <Button onPress={confirmBooking} title="Confirm Booking"/>
        {/* <Button title="close" onPress={handleClosePress}/>
        <Button title="open" onPress={handleOpenPress}/> */}
        
      </GestureHandlerRootView>
    )
  );
}
