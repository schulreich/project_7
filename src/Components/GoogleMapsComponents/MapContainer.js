import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow,} from 'google-maps-react';

import MapConfig from "./MapConfig"
import RestaurantDetails from '../AsideComponents/RestaurantDetails';
import RestaurantList from "../AsideComponents/RestaurantList"

/**
 * Component MapContainter displays the Map/Markers/InfoWindow/RestaurantDetails/RestaurantList on the page.
 */
function MapContainer(props) {
  const [zoomLevel, setZoomLevel] = useState(MapConfig.zoomLevel)
  const [lat] = useState(MapConfig.lat || 51.4344);
  const [lng] = useState(MapConfig.lng || 6.7623);
  const [hasErrors,setErrors] = useState(false);
  const [restaurantArray, setRestaurantArray] = useState([]);
  const [restaurantDetailsList, setRestaurantDetailsList] = useState([]);
  
  const mapObject = new window.google.maps.Map(document.createElement('div'));
  const googlePlacesService = new window.google.maps.places.PlacesService(mapObject);

  /**
   * Fetch data from GoogleApi which will be saved in the restaurantArray.
   */
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://cors.io/?https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=51.434406,6.762329&radius=1500&type=restaurant&key=AIzaSyC6iHzGGrNmtKZB-LDf2tCYMOQXKD6YPac");
      res
        .json()
        .then(res => storeRestaurantArrayResults(res))
        .catch(err => setErrors(err));
    }

    fetchData();

  }, [hasErrors]);
  
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
    filterMinRating:1,
    filterMaxRating:5,
  });
  
  /**
   * store and convert the fetch data into associative array (restaurant id as index for rating update purpose)
   */
  const storeRestaurantArrayResults = (props) => {
    if(props && props.results){
      let newRestaurantArray = [];
      props.results.map(restaurant => {
        if(restaurant && restaurant.id){
          newRestaurantArray[restaurant.id] = restaurant
        }
      });
      setRestaurantArray(newRestaurantArray);
    }
  };

  /**
   * Set the current marker as active.
   * Fetch and store restaurant details via googlePlacesService.
   * Displays restaurantDetails and InfoWindow.
   */
  const onMarkerClick = (props, marker) => {
    //check if restaurant has a place_id
    if(
      marker.restaurant 
      && marker.restaurant.place_id
    ){ //real restaurant
      //check if details are already fetched
      if(!restaurantDetailsList[marker.restaurant.id]){ // restaurant details not found, data will be fetched
        let request = {
          placeId: marker.restaurant.place_id
        };

        googlePlacesService.getDetails(request, (placeResult, status) => {
          let tempRestaurantDetailsList = restaurantDetailsList;
          tempRestaurantDetailsList[marker.restaurant.id] = placeResult;
          setRestaurantDetailsList(tempRestaurantDetailsList);
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
      }else{ //restaurant details found
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
    }else{ //user created restaurant
      //check if details are already created
      if(
        marker
        && marker.restaurant
        && marker.restaurant.id
        && restaurantDetailsList[marker.restaurant.id]
      ){ //already existing
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
      }else{ //no details existing
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
    }

  };

  const onInfoWindowClose = () => {
    setState({
      ...state,
      activeMarker: null,
      showingInfoWindow: false,
    });
  }

  const addRestaurant = (props) =>{
    if(state.tempMarkerLocation){
      const newMarker={
        "geometry": {
          "location":{
            "lat":state.tempMarkerLocation.lat,
            "lng":state.tempMarkerLocation.lng
          }
        },
          "name":props.name,
          "id":Date.now()+Math.floor(Math.random()*100),
          "rating":1,
          "vicinity":props.address,
          "tempMarker":true
      };
      let newRestaurantArray=restaurantArray;
      newRestaurantArray[newMarker.id] = newMarker;
      setRestaurantArray(newRestaurantArray)
      setState({
        ...state,
        tempMarker:true,
        tempMarkerLocation:{},
        createRestaurantForm:false
      })
    }
  }

  const addReview=(props) =>{
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
        tempRestaurantDetailsList[state.activeRestaurant.id] = {
          reviews: []
        }
      }
      tempRestaurantDetailsList[state.activeRestaurant.id].reviews.push({
        text: review,
        rating: rating,
        author_name:"Developer"
      });
      let cnt_rating = 0;
      let sum_rating = 0;
      tempRestaurantDetailsList[state.activeRestaurant.id].reviews.map(restaurantReview => {
        if(restaurantReview.rating){
          cnt_rating++;
          sum_rating+=restaurantReview.rating;
        }
      });
      let avg_rating = sum_rating / cnt_rating;
      let tempRestaurantArray = restaurantArray;
      tempRestaurantArray[state.activeRestaurant.id].rating = avg_rating;
      setRestaurantDetailsList(tempRestaurantDetailsList);
      setRestaurantArray(tempRestaurantArray);
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
  };
  const onMapClick = (props,map,event) => {
      setState({
        ...state,
        showingInfoWindow:false,
        activeMarker:null,
        activeRestaurant:null,
        showingRestaurantDetailsWindow:false,
        tempMarkerLocation:{lat:event.latLng.lat(),lng:event.latLng.lng()},
        createRestaurantForm:!state.createRestaurantForm
      })
  }

  const updateMinRating = (value) => {
    if(!value || value < 1 || value > 5){
      value = 1;
    }
    setState({
      ...state,
      filterMinRating: value,
    });
  }

  const updateMaxRating = (value) => {
    if(!value || value < 1 || value > 5){
      value = 5;
    }
    setState({
      ...state,
      filterMaxRating: value,
    });
  }

  const onRestaurantListItemClick = (props) => {
    if(
      props.restaurant 
      && props.restaurant.place_id
    ){
      if(!restaurantDetailsList[props.restaurant.id]){
        let request = {
          placeId: props.restaurant.place_id
        };
        googlePlacesService.getDetails(request, (placeResult, status) => {
          let tempRestaurantDetailsList = restaurantDetailsList;
          tempRestaurantDetailsList[props.restaurant.id] = placeResult;
          setRestaurantDetailsList(tempRestaurantDetailsList);
          setState({
            ...state,
            activeMarker: null,
            showingInfoWindow: false,
            activeRestaurantDetails: placeResult,
            activeRestaurant: props.restaurant,
            showingRestaurantDetailsWindow: true,
            createRestaurantForm:false
          });
        });
      }else{
        setState({
          ...state,
          activeMarker: null,
          showingInfoWindow: false,
          activeRestaurantDetails: restaurantDetailsList[props.restaurant.id],
          activeRestaurant: props.restaurant,
          showingRestaurantDetailsWindow: true,
          createRestaurantForm:false
        });
      }
    }else{
      if(
        props
        && props.restaurant
        && props.restaurant.id
        && restaurantDetailsList[props.restaurant.id]
      ){
        setState({
          ...state,
          activeMarker: null,
          showingInfoWindow: false,
          activeRestaurantDetails: restaurantDetailsList[props.restaurant.id],
          activeRestaurant: props.restaurant,
          showingRestaurantDetailsWindow: true,
          createRestaurantForm:false
        });
      }else{
        setState({
          ...state,
          activeMarker: null,
          showingInfoWindow: false,
          activeRestaurantDetails: {},
          activeRestaurant: props.restaurant,
          showingRestaurantDetailsWindow: true,
          createRestaurantForm:false
        });
      }
    }
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
        {restaurantArray && Object.keys(restaurantArray).map(restaurant_id => {
          if(restaurantArray[restaurant_id].rating >= state.filterMinRating && restaurantArray[restaurant_id].rating <= state.filterMaxRating){
            return (
            <Marker
              onClick={onMarkerClick}
              key={restaurant_id}
              text= {restaurantArray[restaurant_id].name} 
              position={{ lat: restaurantArray[restaurant_id].geometry.location.lat, lng: restaurantArray[restaurant_id].geometry.location.lng}}
              restaurant={restaurantArray[restaurant_id]}
            />
            )
          }else{
            return null;
          }
        })}
        <Marker
          onClick={onMarkerClick}
          text='Current Position'
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

        {restaurantArray
          ?
          <RestaurantList
            restaurantArray={restaurantArray}
            onClickListItem={onRestaurantListItemClick}
            updateMinRating={updateMinRating}
            updateMaxRating={updateMaxRating}
            filterMinRating={state.filterMinRating}
            filterMaxRating={state.filterMaxRating}
          />
          : null
        }

        {state.createRestaurantForm
          ?
          <RestaurantDetails
            addRestaurant={addRestaurant}
          />
          : null
        }
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({ apiKey: MapConfig.apiKey })(MapContainer);