import React, { useState } from 'react';


import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StarRating from "./StarRating"
import RestaurantReviewItem from "../RestaurantComponents/RestaurantReviewItem"
import TextField from "@material-ui/core/TextField"
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 275,
    height: 490,
    zindex: 1,
    position: "absolute",
    top:"12%",
    opacity:"0.9",
    margin:10,
    overflow:"scroll",
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
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



export default function RestaurantDetails(props) {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = (evt) => {
      evt.preventDefault();
      //console.log("call handleSubmit")
      //console.log(name)
      //console.log(address)
      props.addRestaurant({name: name, address: address})
  }

  const handleReviewSubmit = (evt) => {
    evt.preventDefault();
    //console.log("call handleSubmit")
    //console.log(name)
    //console.log(address)
    props.addReview({review: review, rating: rating})
}

  
  //const [restaurantName, setRestaurantName] = useState(props.restaurant.name)
  //if(props && props.restaurant){
    //console.log(props.restaurant)
    //console.log(props.marker.restaurant.photos[0])
  //}

  const showCurrentRestaurant = (props, details) => {
    //console.log("showCurrentRestaurant")
    //console.log(details)
    return (
      <Card className={classes.root}>
        <CardContent>

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
            <input type="submit" value="Submit" />
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
    /*
    <CardActions>
          <Button size="small">Button</Button>
        </CardActions>
        */
  };

  const showNoSelectedRestaurant = () => {
    //console.log(showNoSelectedRestaurant)
    /*
     <TextField
          required
          id="filled-required"
          label="Required"
          defaultValue="Restaurant Name"
          variant="filled"
        />
        
       
     */
    return (
      <Card className={classes.root}>
        <CardContent>
        <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
      <div style={{position: "absolute",top: -25}}>
        <h4>Add new Restaurant</h4>
      <TextField
          style= {{margin:5}}
          required
          id="filled-required"
          label="Restaurant Name"
          placeholder="Restaurant Name"
          value={name}
          variant="outlined"
          onChange={e => setName(e.target.value)}
        />
         <TextField
          style= {{margin:5}}
          required
          id="filled-required"
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
            color="Primary"> 
            Submit  
        </Button>
      </div>
      
    </form>
        </CardContent>
      </Card>
    );
    /*
    <CardActions>
          <Button size="small">Add new restaurant</Button>
        </CardActions>
        */
  };

  if(props && props.restaurant){
    return showCurrentRestaurant(props.restaurant, props.details);
  }else{
    return showNoSelectedRestaurant();
  }
}