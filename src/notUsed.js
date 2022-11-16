import React, {Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import { Layer } from 'react-map-gl';
import { useCurrentPosition } from 'react-use-geolocation';

import {Location,Permision} from 'expo';

function Mylocation() {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
    </View>
  );
}
  
  
export default Mylocation; 















//const API_endpoint = 'https://api.openweathermap.org/data/3.0/onecall?';
//const API_key = '3bd854dd91804757808caa15a0498de2'