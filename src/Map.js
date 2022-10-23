import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoicGluZWxvcGllbCIsImEiOiJjbDllaXZ2ZncwaDAxM3pteXJ1NzNvb2ZqIn0.7sg24uSozKhe4u4M1YiV4Q'

const data = [
    {
        "name" : "Dikastiko",
        "Lines": "16,17",
        "coordinates": [20.851790, 39.662923]
    },
    {
        "name" : "Akadimia",
        "Lines": "16,17",
        "coordinates": [20.851315, 39.661385] 
    },
    {
        "name" : "Stratologia",
        "Lines": "16,17",
        "coordinates": [20.850734, 39.658476]
    },
    {
        "name" : "Kliniki mitera",
        "Lines": "16,17",
        "coordinates": [20.850320, 39.656983]
    },
    {
        "name" : "Dompoli",
        "Lines": "16,17",
        "coordinates": [20.849009, 39.654737]
    },   
     {
        "name" : "Mitrokosta",
        "Lines": "17",
        "coordinates": [20.846656, 39.650931]
    },
    {
        "name" : "Ethniki Trapeza",
        "Lines": "16",
        "coordinates": [20.8464442, 39.6534417]
    },
    {
        "name" : "EPAL",
        "Lines": "16",
        "coordinates": [20.8453725,39.6492116]
    },
    {
        "name" : "PLATEIA SEISMOPLIKTWN",
        "Lines": "16",
        "coordinates": [20.8447964,39.6466972]
    },
    {
        "name" : "PERIDI",
        "Lines": "16",
        "coordinates": [20.8478129,39.6449588]
    },
    {
        "name" : "JUMBO",
        "Lines": "16",
        "coordinates": [20.8486482,39.6441634]
    },
    {
        "name" : "KWTSOVOLOS",
        "Lines": "16",
        "coordinates": [20.8486817,39.6423361]
    },
    {
        "name" : "SKLAVENITIS",
        "Lines": "16",
        "coordinates": [20.8484725,39.6321804]
    },
    {
        "name" : "DIETHNES",
        "Lines": "16",
        "coordinates": [20.848417,39.6271534]
    },
    {
        "name" : "KOMVOS G.P.N.I.",
        "Lines": "16",
        "coordinates": [20.8480062,39.622007]
    },
    {
        "name" : "PROKOS BOOK STORE",
        "Lines": "16",
        "coordinates": [20.846543,39.6154483]
    }, 
    {
        "name" : "METAVATIKO",
        "Lines": "16",
        "coordinates": [20.843535,39.6194843]
    } , 
    {
        "name" : "PANEPISTIMIAKO NOSOKOMEIO",
        "Lines": "16",
        "coordinates": [20.8412895,39.6201176]
    },   
    {
        "name" : "XIMIKO",
        "Lines": "16",
        "coordinates": [20.8412895,39.6201176]
    }  


]

class Mapp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            lng:  20.853746, //longitude
            lat: 39.665028, //latitude
            zoom: 14
            //SELECTED_BUS <-- KODIKOS LEWFOREIOU
        }
    }



    componentDidMount(){
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: "mapbox://styles/mapbox/streets-v11",
            center:[this.state.lng, this.state.lat],
            zoom: this.state.zoom
        })
        
        //for data(bus stops) create pop up icons
        data.forEach((location) => {
            console.log(location)
            var marker = new mapboxgl.Marker().setLngLat(location.coordinates).setPopup(new mapboxgl.Popup({offset: 30}).setHTML('<h4>'+ location.name+"<br>"+location.Lines + '</h4>')).addTo(map);
        }
        
        
        )

        map.on('load', () => {
            map.addLayer({
                id: 'route',
                type: 'line',
                source: {
                  'type': 'geojson',
                  'data': {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                      'type': 'LineString',
                      'coordinates': [
                        [20.851790, 39.662923],
                        [20.851315, 39.661385],
                        [20.850734, 39.658476],
                        [20.850320, 39.656983],
                        [20.849009, 39.654737],
                        [20.8464442, 39.6534417],
                        [20.8453725,39.6492116],
                        [20.8447964,39.6466972],
                        [20.8478129,39.6449588],
                        [20.8486482,39.6441634],
                        [20.8486817,39.6423361],
                        [20.8484725,39.6321804],
                        [20.848417,39.6271534],
                        [20.8480062,39.622007],
                        [20.846543,39.6154483],
                        [20.843535,39.6194843],
                        [20.8412895,39.6201176],
                        [20.8412895,39.6201176]
                      ],
                    },
                  }
                },
                layout: {
                  'line-join': 'round',
                  'line-cap': 'round'
                },
                paint: {
                  'line-color': '#505',
                  'line-width': 8
                }
            })

        });
        

        //add routes and colors 222222222222
        map.on('load', () => {
            map.addLayer({
                id :'route2',
                type :'line',
                source: {
                  'type': 'geojson',
                  'data': {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                      'type' :'LineString',
                      'coordinates' :[
                        [20.851790, 39.662923],
                        [20.851315, 39.661385],
                        [20.850734, 39.658476],
                        [20.850320, 39.656983],
                        [20.849009, 39.654737],
                        [20.846656, 39.650931]],
                        },
                    }
                },
                layout: {
                  'line-join': 'round',
                  'line-cap' :'round'
                },
                paint :{
                  'line-color' :'#697',
                  'line-width': 6
                }
            })
    
        });
       
    }

   

    //ref->to access the dom elements
    render(){
        return(
            <div>
                <div className='SideBar'>
                </div>
                <div ref={el =>this.mapContainer= el} style={{width: '100%',height:'100vh'}} />

            </div>
        )
    }




}
export default Mapp;