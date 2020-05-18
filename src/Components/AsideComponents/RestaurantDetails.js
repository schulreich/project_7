import React, { useState } from 'react';

import GoogleStreetView from "../GoogleMapsComponents/GoogleStreetView"

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import TextField from "@material-ui/core/TextField"


import RestaurantReviewItem from "../RestaurantComponents/RestaurantReviewItem"


const useStyles = makeStyles((theme) => ({
  root: {
    width: 320,
    height: 700,
    zindex: 1,
    position: "absolute",
    top:"12%",
    opacity:"0.9",
    margin:10,
    overflow:"scroll",
    listStyle:"none"
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
      top:50,
      position: "absolute",
    },
    
  },
}));


/**
 * Component RestaurantDetails displays active restaurant Information or the form to create a new restaurant.
 * It contains restaurantReviewItem.
 * Following parameters are used:
 * - addRestaurant (parent method to add a restaurant)
 * - addReview (parent method to add a review)
 * - restaurant (current selected restaurant)
 * - details (current selected restaurant details (reviews and photos))
 */
export default function RestaurantDetails(props) {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = (evt) => {
      evt.preventDefault();
      props.addRestaurant({name: name, address: address})
  }

  const handleReviewSubmit = (evt) => {
    evt.preventDefault();
    props.addReview({review: review, rating: rating})
}

  const showCurrentRestaurant = (props, details) => {
    return (
      <Card className={classes.root}>
        <CardContent>
          <CardMedia>
            {
              details && details.photos && details.photos[0]
              ?
              <img src={details.photos[0].getUrl()} style={{height:200, width:275}}/>

              :
              (<GoogleStreetView
                restaurant={props}
              />)
            }
            
          </CardMedia>  
          <Typography variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {props.vicinity}
          </Typography>
        
          <form onSubmit={handleReviewSubmit}>
          <TextField
              style= {{
              width:240,
              height:55,
          }}
            id="outlined-multiline-static"
            label="Review"
            multiline
            rows={4}
            defaultValue=""
            variant="outlined"
            onChange={e => setReview(e.target.value)}
        />
        <br /><br /><br /><br />

        <Rating 
            name="size-small"
            defaultValue={1} size="small"
            onChange={e => setRating(parseInt(e.target.value))} />

            <input type="submit" value="Submit"
              style={{position: "absolute",
              left: "60%"
              }} />
          </form>
      
          {
            details.reviews
            ?
            details.reviews.map(review => (
              <RestaurantReviewItem
                key={Date.now()+Math.floor(Math.random()*100)}
                review={review}>
              </RestaurantReviewItem>
           
            ))
            
            :
            null
          }
          
        </CardContent>
      </Card>
    );
  };
  
  const showCreateRestaurantForm = () => {
  
    return (
      <Card className={classes.root}>
        <CardContent>
       
        <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off" style={{left: -27}}>
      <div style={{position: "absolute",top: -25, left: 40}}>
        <h4>Add new Restaurant</h4>
      <TextField
          style= {{margin:5}}
          required
          id="filledRequiredName"
          label="Restaurant Name"
          placeholder="Restaurant Name"
          value={name}
          variant="outlined"
          onChange={e => setName(e.target.value)}
        />
         <TextField
          style= {{margin:5}}
          required
          id="filledRequiredAdresse"
          label="Restaurant Adresse"
          placeholder="Restaurant Addresse"
          value={address}
          variant="outlined"
          onChange={e => setAddress(e.target.value)}
        /> 

        <Button
            style = {{
              width:50,
              height:30,
              margin:2,
              position: "absolute",
              top: 230,
              left: 140,
          }}
            variant="contained"
            color="primary"
            type="submit"
            value="Submit"
            > 
            Submit  
        </Button>
      </div>
      
    </form>
        </CardContent>
      </Card>
    );
  };

  if(props && props.restaurant){
    return showCurrentRestaurant(props.restaurant, props.details);
  }else{
    return showCreateRestaurantForm();
  }
}