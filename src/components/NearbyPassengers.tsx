import axios from "axios";
import { Button, FlatList, ScrollView, Text, View } from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";


export default function NearbyPassengers(props){

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
          latitude: props.destinationCoords.latitude,
          longitude: props.destinationCoords.longitude,
        },
      });

      const [passengerinfo, setPassengerinfo] = useState([]);

      const arr = [0,1,2,3];

    async function getCurrentLocation() {
        let location = await Location.getCurrentPositionAsync({});
        
    
        setState({
          ...state,
          currentLocation: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
        });
      }


    useEffect(() => {
        const interval = setInterval(async () => {
          getCurrentLocation();
        }, 4000);
        return () => clearInterval(interval);
      });

    async function fetchPassengers(){

        

        await axios.post("http://192.168.29.196:3000/getpassenger/",{
            latitude : state.currentLocation.latitude,
            longitude : state.currentLocation.longitude,
            lat : state.destinationCords.latitude,
            long: state.destinationCords.longitude
          })
          .then((r)=>{
            console.log(r.data);
            console.log(JSON.stringify(r.data))
            setPassengerinfo(r.data);
        })
          .catch((e)=>{console.log(e)});

     }


    return(
        <View style={{flex:1}}>
            
            <ScrollView style={{flex:1}}>
            {passengerinfo.length == 0 ? <Text>system</Text> :passengerinfo.map((e)=>(
                <View key={e[0][0].id}>
                    <Text style={{color:'black'}}>{e[0][0].first_name}</Text>
                    <Button title="confirm" onPress={async ()=>{
                               
                               await axios.post(`http://192.168.29.196:3000/rideconfirmation/`,{
                                 
                                  

                              })
                              .then((r)=>{
                                console.log(r.data);
                                console.log(JSON.stringify(r.data))
                                setPassengerinfo(r.data);
                            })
                              .catch((e)=>{console.log(e)});
                        

                    }} />
                </View>
            ))}
            </ScrollView>
            <Button title="Search" onPress={fetchPassengers} />
            <Button title="Stop Searching" onPress={props.hasStoppedRidefun} />
        </View>
    )
}