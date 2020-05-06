import React, { useState } from 'react';


import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  root: {
    width: 275,
    minHeight:500,
    zindex: 1,
    position: "absolute",
    top:"12%",
    opacity:"0.9",
    
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

  const handleSubmit = (evt) => {
      evt.preventDefault();
      console.log("call handleSubmit")
      console.log(name)
      console.log(address)
      props.addTempMarker({name: name, address: address})
  }

  //const [restaurantName, setRestaurantName] = useState(props.restaurant.name)
  if(props && props.restaurant){
    console.log(props.restaurant)
    //console.log(props.marker.restaurant.photos[0])
  }

  const showCurrentRestaurant = (props) => {
    console.log("showCurrentRestaurant")
    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {props.vicinity}
          </Typography>
          <Typography variant="body2" component="p">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small"></Button>
        </CardActions>
      </Card>
    );
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
        
        <TextField
          required
          id="filled-required"
          label="Required"
          defaultValue="Restaurant Addresse"
          variant="filled"
        /> 
     */
    return (
      <Card className={classes.root}>
        <CardContent>
        <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
      <div style={{position: "absolute",top: 50}}>
      <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
      </div>
      <input type="submit" value="Submit" />
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
    return showCurrentRestaurant(props.restaurant);
  }else{
    return showNoSelectedRestaurant();
  }
}