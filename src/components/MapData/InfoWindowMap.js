import React from "react"
import {Marker} from 'google-maps-react';

class InfoWindowMap extends React.Component {

    constructor(props){
        super(props);
    
        this.state = {
            isOpen: false
        }
    }
    
    render() {
        return (
            <Marker
                {...this.props}
                onClick={this.props.onClick}
                key={this.props.id}
                id={this.props.id}
                position={{ lat: this.props.lat, lng: this.props.lng}}
            />
        )
    }
}
  
    export default InfoWindowMap;