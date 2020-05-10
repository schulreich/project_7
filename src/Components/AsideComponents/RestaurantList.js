import React from 'react';

import RestaurantListItem from "./RestaurantListItem"
import MinStarFilter from "../RestaurantComponents/MinStarFilter"
import MaxStarFilter from "../RestaurantComponents/MaxStarFilter"

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 275,
    height: 490,
    zindex: 1,
    position: "absolute",
    top:"12%",
    left: "70%",
    overflow:"scroll",
    opacity:"0.9",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));


export default function RestaurantList(props) {
  const classes = useStyles();

  //console.log('(RestaurantList) Min :: '+props.filterMinRating+' :: Max :: '+props.filterMaxRating)

  return (
    <div>
      <MinStarFilter
        selectedValue={props.filterMinRating}
        updateMinRating={props.updateMinRating}
        />
      <MaxStarFilter
        selectedValue={props.filterMaxRating}
        updateMaxRating={props.updateMaxRating}
        />
    
      <List className={classes.root}>
        {Object.keys(props.restaurantArray).map(restaurant_id => {
          if(props.restaurantArray[restaurant_id].rating >= props.filterMinRating && props.restaurantArray[restaurant_id].rating <= props.filterMaxRating){
            return (
              <RestaurantListItem 
                key={restaurant_id}
                restaurant={props.restaurantArray[restaurant_id]}
                onClickListItem={props.onClickListItem}
            />)
      }else{
        return null;
      }
      })}
      </List>
    </div>
      )
}
