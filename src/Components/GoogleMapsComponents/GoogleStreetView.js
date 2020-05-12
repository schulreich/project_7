import React from 'react';
import ReactStreetview from 'react-streetview';

export default function GoogleStreetView(props) {
	//console.log(props)
		// see https://developers.google.com/maps/documentation/javascript
		const googleMapsApiKey = 'AIzaSyC6iHzGGrNmtKZB-LDf2tCYMOQXKD6YPac'

		// see https://developers.google.com/maps/documentation/javascript/3.exp/reference#StreetViewPanoramaOptions
		const streetViewPanoramaOptions = {
			position: {lat: props.restaurant.geometry.location.lat, lng:props.restaurant.geometry.location.lng},
			pov: {heading: 100, pitch: 0},
			zoom: 1
		};
		
		return (
			<div style={{
				width: '275px',
				height: '250px',
				backgroundColor: '#eeeeee'
			}}>
				<ReactStreetview
					apiKey={googleMapsApiKey}
					streetViewPanoramaOptions={streetViewPanoramaOptions}
				/>
			</div>
		);
	
}
