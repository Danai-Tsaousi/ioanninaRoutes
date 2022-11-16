import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import { Layer } from 'react-map-gl';
import { useCurrentPosition } from 'react-use-geolocation';

//using expo to take read geolocation information from a device

function Mylocation() {

    const status = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');//to link poy leei tis syntetagmenes kai ama to patiseis bgaieni xartis--- ALLAGI
  
    mapLink.href = '';
    mapLink.textContent = '';
  
    function success(position) {//edw logika tha prosuetoyme to icon bus kai tha kineitai
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      status.textContent = '';
      //mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    }
  
    function error() {
      status.textContent = 'Unable to retrieve your location';
    }
  
    if (!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
    } else {
      status.textContent = 'Locating…';
      navigator.geolocation.watchPosition(success, error);
    }
  
  }
export default Mylocation; 















//const API_endpoint = 'https://api.openweathermap.org/data/3.0/onecall?';
//const API_key = '3bd854dd91804757808caa15a0498de2'