import React, {Component,useState} from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import stops from './stops.json';
import {Layer, NavigationControl,Marker} from 'react-map-gl';
import ReactMapGL, {Image} from 'react-map-gl';
import * as turf from '@turf/turf';
import MapboxDirectionsFactory from '@mapbox/mapbox-sdk/services/directions';
import {lineString as makeLineString} from '@turf/helpers';
import './Map.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuYWl0b3UiLCJhIjoiY2w5ZWp3NG5oMGdhZjNucGJxOXh2MTRuZCJ9.4DkyNzrCoBvSBIEy0r3IPg'
const accessT = 'eyJ1IjoiZGFuYWl0b3UiLCJhIjoiY2w5ZWp3NG5oMGdhZjNucGJxOXh2MTRuZCJ9'

const origin = [20.852923,39.665555];
const destination = [20.8412895,39.6201176];

class Mapp extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            lng:  20.853746, //longitude
            lat: 39.665028, //latitude
            zoom: 12
            //SELECTED_BUS <-- KODIKOS LEWFOREIOU
        }
    }
    
    componentDidMount(){

        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center:[this.state.lng, this.state.lat],
            zoom: this.state.zoom
            
        })
        //          Zoom in-out in map
        map.addControl(new mapboxgl.NavigationControl());
        
        
        
        const point = {
          'type': 'FeatureCollection',
          'features': [{
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'Point',
            'coordinates': [20.853263,39.665083]
          }
         }]
        };
//---------------------- LEOFOREIO-------------------------------------------
       
      map.on('load', () => {
        map.addSource('point', {
          'type': 'geojson',
          'data': point
        });

        map.addLayer({
          'id': 'point',
          'source': 'point', // reference the data source
          'type': 'symbol',
          
          'layout': {
              'icon-image': 'bus', // reference the image
              'icon-size': 1,
              'icon-rotation-alignment': 'map',
              'icon-allow-overlap': true,
              'icon-ignore-placement': true
            }
          });

        map.addSource('stops',{
            type:'geojson',
            data: stops
        })

        stops.forEach(function(marker){
            const el = document.createElement('div');
            el.className= 'marker';
            new mapboxgl.Marker(el).setLngLat([marker.longitude,marker.latitude]).setPopup(new mapboxgl.Popup({offset: 30}).setHTML('<h4>'+ marker.description.el+"<br>"+marker.lineNames + '</h4>')).addTo(map);
        })
      });

//--------------------Function to take the directions of the route --------------------------------------------
        async function getRoute(){//edw tha bazoyme to origin kai to dest ths diadromis kai tha bgazei thn diadromi kai to lewforeio
            
            const or1 = origin[0].toString();
            const or2 = origin[1].toString();
            const dest1 = destination[0].toString();
            const dest2 = destination[1].toString();
            //create a query to the API ,the start will always be the same,only the end(destination) will change
            const query = await fetch(
              'https://api.mapbox.com/directions/v5/mapbox/driving/'+or1+','+or2+';'+dest1+','+dest2+'?geometries=geojson&access_token=pk.eyJ1IjoiZGFuYWl0b3UiLCJhIjoiY2w5ZWp3NG5oMGdhZjNucGJxOXh2MTRuZCJ9.4DkyNzrCoBvSBIEy0r3IPg', { method: 'GET' });
            
            const json = await query.json();
            const data = json.routes[0];
            const route = data.geometry.coordinates;
            // einai to const me olh th diadromi
            const geojson = { 
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'LineString',
                    coordinates: route
                 }
            };

          // if the route already exists on the map, we'll reset it using setData
          if (map.getSource('route')) {
            map.getSource('route').setData(geojson);
          }
          // otherwise, we'll make a new request
         else {
          //               gia Line tou route
            map.addLayer({
              id: 'route',
              type: 'line',
              source: {
                type: 'geojson',
                data: geojson //to const apo prin
              },
             layout: {
                  'line-join': 'round',
                  'line-cap': 'round'
              },
             paint: {
                'line-color': '#3887be',
                'line-width': 5,
                'line-opacity': 0.75
             }
          });
        }
      //----------------------------------------------- KINISI ------------------------------------------------
        const steps = 500;
        let counter = 0;
        const routeline = {
          type: 'Feature',
          features: [{
                        'type': 'Feature',
                        'geometry': {
                        'type': 'LineString',
                        'coordinates': route
                          }
          }]
        };
        const lineDistance = turf.length(routeline.features[0]);
        const arc = [];
        for (let i = 0; i < lineDistance; i += lineDistance / steps) {
          const segment = turf.along(routeline.features[0], i);
          arc.push(segment.geometry.coordinates);
       }
          
        // Update the route with calculated arc coordinates
        routeline.features[0].geometry.coordinates = arc;

        function animate() {
          const start = routeline.features[0].geometry.coordinates[counter >= steps ? counter - 1 : counter];
          const end = routeline.features[0].geometry.coordinates[counter >= steps ? counter : counter + 1 ];
          if (!start || !end) return;
               
              // Update point geometry to a new position based on counter denoting
              // the index to access the arc
              point.features[0].geometry.coordinates = routeline.features[0].geometry.coordinates[counter];
               
              // Calculate the bearing to ensure the icon is rotated to match the route arc
              // The bearing is calculated between the current point and the next point, except
              // at the end of the arc, which uses the previous point and the current point
              point.features[0].properties.bearing = turf.bearing(
                  turf.point(start),
                  turf.point(end)
              );
               
              // Update the source with this new data
              map.getSource('point').setData(point);
               
              // Request the next frame of animation as long as the end has not been reached
              if (counter < steps) {
                  requestAnimationFrame(animate);
              }
               
              counter = counter + 1;
          }
               
           // Start the animation
          animate(counter);   
      
       
    }
//-------------------------------------- TELOS getRoute --------------------------------------------
    //------ MAP ON -----------------------------------------------
    //                      Add starting point to the map, i mple koukida
    
    map.on('load', () => {
    // make an initial directions request that
    // starts and ends at the same location
        getRoute(origin);

        map.addLayer({
            id: 'point',
            type: 'circle',
            source: {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: [{
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'Point',
                        coordinates: origin
                }
            }]
            }
            },
            paint: {
                'circle-radius': 10,
                'circle-color': '#3887be'
            }
      });
      
    });//telos 1o mapon


    //         ending point, to kokkino shmeio termatismoy        
    map.on('load',() => {
      
      const end = {
        type: 'FeatureCollection',
        features: [{
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Point',
              coordinates: destination
            }
          }]
       };
        if (map.getLayer('end')) {
          map.getSource('end').setData(end);
        } else {
          map.addLayer({
            id: 'end',
            type: 'circle',
            source: {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: [{
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'Point',
                    coordinates: destination
                  }
                }]
             }},
            paint: {
            'circle-radius': 10,
            'circle-color': '#f30'
          } });
      }
      
             
      //                Kalesma
       
      getRoute();
    });
      
    
  }
 
    //ref->to access the dom elements
    render(){
        return(
            
            <div> 
                <div ref={el =>this.mapContainer= el} style={{width: '100%',height:'600px',borderRadius:'15px', border :'2px solid red'}} /> 
                
            </div>
            
        );
    };
}

export default Mapp; 
