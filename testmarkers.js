/*
import React from "react"
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

 
export class MapContainer extends React.Component {
  constructor() {
    console.log("TEST :: Constructor")
    super()
    this.state = {
      loaded:false,
      restaurantList: {},
      restaurantMarkers: [],
    }
    this.storeMarker = this.storeMarker.bind(this);
  }

  clearMarkers(){
    console.log("TEST :: Clear Markers")
    this.setState({
      restaurantMarkers: []
    })
  }

  storeMarker(restaurantData){
    console.log("TEST :: Store Marker")
    const newMarker = {}
    newMarker.name = restaurantData.name
    newMarker.lat = restaurantData.geometry.location.lat
    newMarker.lng = restaurantData.geometry.location.lng
    this.state.restaurantMarkers.push(newMarker)
    this.setState({
      restaurantMarkers: this.state.restaurantMarkers
    })
  }

  extractMarkers(restaurantList){
    console.log("TEST :: Extract Markers")
    if(Array.isArray(restaurantList)){
      restaurantList.map(this.storeMarker);
    }
  }

  componentDidMount(){
    console.log("TEST :: Loading data")
    this.setState({loaded:false})
    fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=51.434406,6.762329&radius=1500&type=restaurant&key=AIzaSyC6iHzGGrNmtKZB-LDf2tCYMOQXKD6YPac")
      .then(response => response.json())
      .then(data => {
        //if(data && data.results && Array.isArray(data.results)){
        if(data){
          this.clearMarkers()
          this.extractMarkers(data.results)
          this.setState({
            loaded:true,
            restaurantList:data.results
          })
        }else{
          this.setState({
            loaded:false,
            restaurantList:[]
          })
        }
        //console.log(data)
        //console.log(this.state.restaurantMarkers)
      })
  }

  render() {
    console.log("TEST :: Render")
    const style = {
      width: '100%',
      height: '100%'
    }
    return (
      <Map google={this.props.google}
      style= {style}
      initialCenter= {{
        lat:51.3929,
        lng:6.7982,
        test:this.restaurantMarker
      }}
      zoom={14}
      >
        <Marker onClick={this.onMarkerClick}
                name={"Current location"} />
 
        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              
            </div>
        </InfoWindow>

        {
          this.state.restaurantMarkers.map((restaurantMarker => {
            //console.log(restaurantMarker)
            return(
              <Marker
                name={restaurantMarker.name}
                lat={restaurantMarker.lat}
                lng={restaurantMarker.lng}
              />
            )
          }))
        }

{
  console.log("TEST END")
}
{
  console.log(this.state.restaurantMarkers)
}

      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ("AIzaSyC6iHzGGrNmtKZB-LDf2tCYMOQXKD6YPac"),
  libraries: ["places"]
})(MapContainer)
*/








/*
import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  constructor() {
    super()
  this.state = {
   showingInfoWindow: false,  //Hides or the shows the infoWindow
   activeMarker: {},          //Shows the active marker upon click
   selectedPlace: {},         //Shows the infoWindow to the selected place upon a marker
   loading: false,
   restaurantMarker: {}
 }
}

 onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  });

onClose = props => {
  if (this.state.showingInfoWindow) {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
  }

};

componentDidMount(){
  console.log("TEST :: Loading data")
  this.setState({loaded:false})
  fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=51.434406,6.762329&radius=1500&type=restaurant&key=AIzaSyC6iHzGGrNmtKZB-LDf2tCYMOQXKD6YPac")
    .then(response => response.json())
    .then(data => {
      this.setState({
        restaurantMarker: data
    })
    console.log(data)
    console.log(this.state.restaurantMarkers)
  })
}


render() {

  const style = {
    width: '100%',
    height: '100%'
  }
  return (
    <Map google={this.props.google}
    style= {style}
    initialCenter= {{
      lat:51.3929,
      lng:6.7982,
    }}
    zoom={14}
    >
      <Marker onClick={this.onMarkerClick}
              name={"Current location"} />

<InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
    </Map>
  );
}
}


export default GoogleApiWrapper({
  apiKey: ("AIzaSyC6iHzGGrNmtKZB-LDf2tCYMOQXKD6YPac"),
  libraries: ["places"]
})(MapContainer)

*/