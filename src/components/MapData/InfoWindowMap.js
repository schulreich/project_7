import React from "react"
import {InfoWindow, Marker} from 'google-maps-react';

class InfoWindowMap extends React.Component {

    constructor(props){
        super(props);
    
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
        }
        this.onMarkerClick = this.onMarkerClick.bind(this)
        this.onMapClicked = this.onMapClicked.bind(this)
    }
    
    onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
 
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };


    
    render() {
        //console.log("TEST :: InfoWindowMap :: Render");
        //console.log(this.props);
        return [
            <Marker
                {...this.props}
                onClick={this.onMarkerClick}
                key={this.props.id}
                position={{ lat: this.props.lat, lng: this.props.lng}}
            />
             ,
        
            <InfoWindow
                key={this.props.name}
        >
            <div>
                <h3>{this.props.name}</h3>
            </div>
        </InfoWindow>
        ]
    }
}
    /*
    
                /*<InfoWindowMap 
                key={restaurantMarker.id}
                id={restaurantMarker.id}
                name={restaurantMarker.name}
                position = {{lat:restaurantMarker.lat, lng:restaurantMarker.lng}}
						    lat={restaurantMarker.lat}
						    lng={restaurantMarker.lng}
                />

------------------------------------------------------------------------------------
                <InfoWindow
            {...this.props}
            key={Date.now()}
            onClose={() => this.handleToggleClose()}
            id={this.props.id}
            name={this.props.name}
            
        >
            <div>
                <h3>{this.props.name}</h3>
            </div>
        </InfoWindow>
              */
    
    export default InfoWindowMap;