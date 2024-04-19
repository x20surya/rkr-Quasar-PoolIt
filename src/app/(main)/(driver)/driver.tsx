import { Link, useNavigation } from "expo-router";
import { useState } from "react";
import { Button, Text, View } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Location from "expo-location";
import { ScrollView } from "react-native-virtualized-view";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewStyle from "../../../constants/MapViewStyle.json"
import DriverMap from "@/src/components/DriverMap";

export default function DriverScreen() {
  const [state, setState] = useState({
    currentLocation: {
      latitude: 0,
      longitude: 0,
    },
    passenger1Cords: {
      pickupCords: {
        latitude: 0,
        longitude: 0,
      },
      destinationCords: {
        latitude: 0,
        longitude: 0,
      },
    },
    passenger2Cords: {
      pickupCords: {
        latitude: 0,
        longitude: 0,
      },
      destinationCords: {
        latitude: 0,
        longitude: 0,
      },
    },
    passenger3Cords: {
      pickupCords: {
        latitude: 0,
        longitude: 0,
      },
      destinationCords: {
        latitude: 0,
        longitude: 0,
      },
    },
    destinationCords: {
      latitude: 0,
      longitude: 0,
    },
  });

  const [currentLocation, setCurrentLocation] = useState({});

  const nav = useNavigation<NativeStackNavigationProp<any>>();

  async function putCurrentLocation() {
    let location = await Location.getCurrentPositionAsync({});

    console.log("current location", location.coords);

    setState({
      ...state,
      currentLocation: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    });
  }

  function fetchDestination(data, details) {
    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;
    setState({
      ...state,
      destinationCords: {
        latitude: lat,
        longitude: lng,
      },
    });
  }



  return (
    <View style={{ flex: 1 }}>
      <ScrollView 
      style={{ backgroundColor: "white" , flex:1}}
      keyboardShouldPersistTaps="handled"
      >
        <GooglePlacesAutocomplete
          placeholder="Enter Your Destination"
          onPress={fetchDestination}
          fetchDetails={true}
          query={{
            key: "AIzaSyA4IGQAa3lWLh2jy1gRqEjybQ5aAqVDKcg",
            language: "en",
          }}
        />
        
      </ScrollView>
      <DriverMap latitude = {state.destinationCords.latitude} longitude = {state.destinationCords.longitude} />
      <Link href={"/passengerFinder"} asChild>
      <Button title="Find Passenger" />
      </Link>
    </View>
  );
}
