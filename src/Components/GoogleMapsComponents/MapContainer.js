import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow,} from 'google-maps-react';

import MapConfig from "./MapConfig"
import RestaurantDetails from '../AsideComponents/RestaurantDetails';
import RestaurantList from "../AsideComponents/RestaurantList"

function MapContainer(props) {
  const [zoomLevel, setZoomLevel] = useState(MapConfig.zoomLevel)
  const [lat] = useState(MapConfig.lat || 51.4344);
  const [lng] = useState(MapConfig.lng || 6.7623);
  const [hasErrors,setErrors] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantDetailsList, setRestaurantDetailsList] = useState([]);
  

  //get called multiple times solution ?? where best to call 
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=51.434406,6.762329&radius=1500&type=restaurant&key=AIzaSyC6iHzGGrNmtKZB-LDf2tCYMOQXKD6YPac");
      res
        .json()
        .then(res => setRestaurants(res))
        .catch(err => setErrors(err));
    }

    fetchData();

  }, [hasErrors]); //better fix needed

  
  const [state, setState] = useState({
    activeMarker: {},
    activeRestaurant: {},
    activeRestaurantDetails: {},
    showingInfoWindow: false,
    showingRestaurantDetailsWindow: false,
    text: '',
    tempMarker:false,
    createRestaurantForm: false,
    tempMarkerLocation:{},
  });

  const onMarkerClick = (props, marker) => {
    console.log('onMarkerClick');
    //console.log(props);
    //console.log(marker);
    if(
      marker.restaurant 
      && marker.restaurant.place_id
    ){
      if(!restaurantDetailsList[marker.restaurant.id]){
        let request = {
          placeId: marker.restaurant.place_id
        };
        //fields: ['name', 'formatted_address', 'geometry', 'rating','website', 'photos']

        let map = new window.google.maps.Map(document.createElement('div'));
        let service = new window.google.maps.places.PlacesService(map);
      
        service.getDetails(request, (placeResult, status) => {
          let tempRestaurantDetailsList = restaurantDetailsList;
          tempRestaurantDetailsList[marker.restaurant.id] = placeResult;
          setRestaurantDetailsList(tempRestaurantDetailsList);
          console.log(restaurantDetailsList)
          console.log('Service :: getDetails')
          //console.log(placeResult)
          //console.log(marker)
          //console.log(status)
          setState({
            ...state,
            activeMarker: marker,
            activeRestaurant: marker.restaurant,
            activeRestaurantDetails: placeResult,
            showingInfoWindow: true,
            showingRestaurantDetailsWindow: true,
            createRestaurantForm:false,
            text: marker.text || ''
          });
        });
      }else{
        setState({
          ...state,
          activeMarker: marker,
          activeRestaurant: marker.restaurant,
          activeRestaurantDetails: restaurantDetailsList[marker.restaurant.id],
          showingInfoWindow: true,
          showingRestaurantDetailsWindow: true,
          createRestaurantForm:false,
          text: marker.text || ''
        });
      }
    }else{  
      setState({
        ...state,
        activeMarker: marker,
        activeRestaurant: marker.restaurant,
        activeRestaurantDetails: {},
        showingInfoWindow: true,
        showingRestaurantDetailsWindow: true,
        createRestaurantForm:false,
        text: marker.text || ''
      });
    }

  };

  const onInfoWindowClose = () => {
    setState({
      ...state,
      activeMarker: null,
      showingInfoWindow: false,
    });
  }

  const clearTempMarker = () =>{
    //console.log(state.tempMarker)
    if(state.tempMarker===true){
      restaurants.results = restaurants.results
      restaurants.results.splice(-1,1)
      setState({
        ...state,
        restaurants:restaurants,
        tempMarker:false,
      })
    }
    //console.log("clearTempMarker")
  }


  const addTempMarker = (props) =>{

    //clearTempMarker()

    //console.log('TEST :: tempMarkerLocation');
    //console.log("props");
    //console.log(props);
    //console.log("state");
    //console.log(state);
    //console.log("state.tempMarkerLocation");
    //console.log(state.tempMarkerLocation);

    if(state.tempMarkerLocation){

      const newMarker={
        "geometry": {
          "location":{
            "lat":state.tempMarkerLocation.lat,
            "lng":state.tempMarkerLocation.lng
          }
        },
          "name":props.name,
          //"openingHours":props.openingHours,
          "id":Date.now()+Math.floor(Math.random()*100),
          "vicinity":props.address,
          "tempMarker":true
      };
      restaurants.results=restaurants.results.concat([newMarker])
      setState({
        ...state,
        tempMarker:true,
        restaurants:restaurants,
        tempMarkerLocation:{},
        createRestaurantForm:false
      })
      //console.log(restaurants)
    }
  }

  const addReview=(props) =>{
    console.log("TestAddReview")
    console.log(props)
    if(
      props 
      && (
        props.review
        || props.rating
      )
    ){
      let review = props.review;
      if(!review){
        review = '';
      }
      let rating = props.rating;
      if(!rating || rating < 1 || rating > 5){
        rating = 1;
      }
      let tempRestaurantDetailsList = restaurantDetailsList
      if(!tempRestaurantDetailsList[state.activeRestaurant.id]){
        console.log('new restaurantDetails created');
        //create new restaurantDetails if not existing
        tempRestaurantDetailsList[state.activeRestaurant.id] = {
          reviews: []
        }
      }

      tempRestaurantDetailsList[state.activeRestaurant.id].reviews.push({
        text: review,
        rating: rating
      });

      console.log(tempRestaurantDetailsList[state.activeRestaurant.id]);
      console.log(tempRestaurantDetailsList);

      setRestaurantDetailsList(tempRestaurantDetailsList)
    }
    setState({
      ...state,
      showingInfoWindow:false,
      activeMarker:null,
      activeRestaurant:null,
      showingRestaurantDetailsWindow:false,
      tempMarkerLocation:{},
      createRestaurantForm:false
    })
  }
  const onMapClick = (props,map,event) => {
      //console.log('TEST :: onMapClick');
      //console.log(myTempMarkerLocation);
      //console.log('before state');
      //console.log(state);
      setState({
        ...state,
        showingInfoWindow:false,
        activeMarker:null,
        activeRestaurant:null,
        showingRestaurantDetailsWindow:false,
        tempMarkerLocation:{lat:event.latLng.lat(),lng:event.latLng.lng()},
        createRestaurantForm:!state.createRestaurantForm
      })
      
      /*
      console.log('after state');
      console.log(state);
      addTempMarker(props)
      */
  }

  const onRestaurantListItemClick = (props) => {
    //console.log("RestaurantListItemClicked")
    setState({
      ...state,
      activeRestaurant: props.restaurant,
      showingRestaurantDetailsWindow: true,
      createRestaurantForm:false
    });
  }
  return (
    <div className='map' id="myMap">
      <Map
        google={props.google}
        onClick={onMapClick}
        zoom={zoomLevel}
        disableDefaultUI={MapConfig.useDefaultUI}
        initialCenter={{
          lat,
          lng
        }}
      >
        {restaurants && restaurants.results && restaurants.results.map(restaurant => (
          <Marker
          onClick={onMarkerClick}
          key= {restaurant.id}
          text= {restaurant.name} 
          position={{ lat: restaurant.geometry.location.lat, lng: restaurant.geometry.location.lng}}
          restaurant={restaurant}
          />
        ))}
        <Marker
          onClick={onMarkerClick}
          text='some text'
          />

        <InfoWindow
          marker={state.activeMarker}
          onClose={onInfoWindowClose}
          visible={state.showingInfoWindow}>
          <div>
            <p>{state.text}</p>
          </div>
        </InfoWindow>

        {state.activeRestaurant && state.showingRestaurantDetailsWindow
          ? 
          <RestaurantDetails 
            restaurant={state.activeRestaurant}
            details={state.activeRestaurantDetails}
            addReview={addReview}
          />
          : null
        }

        {restaurants && restaurants.results
          ?
          <RestaurantList
          restaurantList={restaurants.results}
          onClickListItem={onRestaurantListItemClick}
          />
          : null
        }

        {state.createRestaurantForm
          ?
          <RestaurantDetails
            addTempMarker={addTempMarker}
          />
          : null
        }
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({ apiKey: MapConfig.apiKey })(MapContainer);