import { useRef, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewStyle from "../constants/MapViewStyle.json";
import MapViewDirections from "react-native-maps-directions";

export function MapPassenger({dropLat, dropLong, pickLat, pickLong}){

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

    const mapRef = useRef();
    
    return(
        <MapView
          ref={mapRef}
          style={{ width: "100%", height: "100%", flex:1, }}
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
            //   latitude: ,
                latitude: dropLat,
                // longitude: state.droplocationCors.longitude,
                longitude: dropLong,
            }}
          />
          <Marker
            coordinate={{
            //   latitude: ,
            latitude: pickLat,

            //   longitude: state.pickupCords.longitude,
            longitude: pickLong,
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
    )

}