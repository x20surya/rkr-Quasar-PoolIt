import { Button, Text, View, Dimensions } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import axios from "axios";
import MapViewStyle from "../../constants/MapViewStyle.json";
import * as Location from "expo-location";
import { useContext, useEffect, useRef, useState, useMemo } from "react";
import MapViewDirections from "react-native-maps-directions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import BottomSheet from "@gorhom/bottom-sheet";

const snapPoints= useMemo(()=>['25%', '50%', '70%'],[])

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

  const mapRef = useRef();

  const { pickupCords, droplocationCors } = state;

  const [currentLocation,setCurrentLocation] = useState({});

  // useEffect(()=>{
  //   const interval = setInterval(async ()=>{
  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);
  //   },10000);
  //   return ()=>clearInterval(interval);
  // })


  const nav = useNavigation<NativeStackNavigationProp<any>>();

  function signOut() {
    auth()
      .signOut()
      .then(() => {
        console.log("user signed out");
        nav.replace("(auth)");
      });
  }

  function fethPickUp (data,details){
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



  function fethDrop (data,details){
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
      <View style={{flex:1 }}>
        
        <MapView
          ref={mapRef}
          style={{ width: "100%", height: "100%", flex:1 }}
          provider={PROVIDER_GOOGLE}
          customMapStyle={MapViewStyle}
          initialRegion={{
            latitude: 30.7333,
            longitude: 76.7794,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: state.droplocationCors.latitude,
              longitude: state.droplocationCors.longitude,
            }}
          />
          <Marker
            coordinate={{
              latitude: state.pickupCords.latitude,
              longitude: state.pickupCords.longitude,
            }}
          />
          <MapViewDirections
            origin={pickupCords}
            destination={droplocationCors}
            apikey="AIzaSyA4IGQAa3lWLh2jy1gRqEjybQ5aAqVDKcg"
            strokeWidth={5}
            strokeColor="blue"
            optimizeWaypoints={true}
            onReady={(result) => {
              mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: 30,
                  bottom: 300,
                  left: 30,
                  top: 300,
                },
              });
            }}
          />
        </MapView>

        {/* <ScrollView 
        style={{backgroundColor:'white'}}
        keyboardShouldPersistTaps="handled"
        >
        <GooglePlacesAutocomplete
          placeholder="Enter Pick Up Location"
          onPress={fethPickUp}
          fetchDetails={true}
          query={{
            key: "AIzaSyA4IGQAa3lWLh2jy1gRqEjybQ5aAqVDKcg",
            language: "en",
          }}
        />
        <GooglePlacesAutocomplete
          placeholder="Enter Destination Location"
          onPress={fethDrop}
          fetchDetails={true}
          query={{
            key: "AIzaSyA4IGQAa3lWLh2jy1gRqEjybQ5aAqVDKcg",
            language: "en",
          }}
        />
        </ScrollView> */}
        <BottomSheet snapPoints={snapPoints}>
          <Text>Awsome</Text>
        </BottomSheet>
        {/* */}
      </View>
    )
  );
}
