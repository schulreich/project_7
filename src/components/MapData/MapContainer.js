
import React from "react"
import {Map,GoogleApiWrapper, Marker,InfoWindow} from 'google-maps-react';
import InfoWindowMap from "./InfoWindowMap"


 
class MapContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      loaded:false,
      restaurantList: {},
      restaurantMarkers: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
    this.clearMarkers = this.clearMarkers.bind(this);
    this.storeMarker = this.storeMarker.bind(this);
    this.extractMarkers = this.extractMarkers.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }

  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  onMarkerClick = (props, marker) =>
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true
    });

  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });

  clearMarkers(){
    this.setState({
      restaurantMarkers: []
    })
  }

  storeMarker(restaurantData){
    //console.log(restaurantData)
    const newMarker = {}
    newMarker.id = restaurantData.id
    newMarker.name = restaurantData.name
    newMarker.lat = restaurantData.geometry.location.lat
    newMarker.lng = restaurantData.geometry.location.lng
    newMarker.address = restaurantData.vicinity
    let restaurantMarkers = this.state.restaurantMarkers
    restaurantMarkers=restaurantMarkers.concat([newMarker])
    this.setState({
      restaurantMarkers: restaurantMarkers
    })
  }

  extractMarkers(restaurantList){
    if(Array.isArray(restaurantList)){
      restaurantList.map(this.storeMarker);
    }
  }

  componentDidMount(){
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
      })
  }

  renderMarkers(){
    return this.state.restaurantMarkers.map((restaurantMarker => {
      return(
        <InfoWindowMap 
                onClick={this.onMarkerClick}
                key={restaurantMarker.id}
                id={restaurantMarker.id}
                name={restaurantMarker.name}
                lat={restaurantMarker.lat}
                lng={restaurantMarker.lng}
                address={restaurantMarker.address}
                />
      )
    }))
  }

  render() {
    const style = {
      width: '100%',
      height: '100%'
    }
    
    return (
      <Map google={this.props.google}
        onClick= {this.onMapClick}
        style= {style}
        initialCenter= {{
          lat:51.3929,
          lng:6.7982,
        }}
        zoom={14}
      >
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} 
                />
                
        {this.renderMarkers()}
        
        <InfoWindow
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
            <p>{this.state.selectedPlace.address}</p>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyC6iHzGGrNmtKZB-LDf2tCYMOQXKD6YPac"),
})(MapContainer)
