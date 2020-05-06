import React from 'react';

import RestaurantListItem from "./RestaurantListItem"

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

  return (
        <List className={classes.root}>
        {props.restaurantList.map(restaurant => (
      <RestaurantListItem 
        key={restaurant.id}
        restaurant={restaurant}
        onClickListItem={props.onClickListItem}
      />
      ))}
      </List>
      )
}
