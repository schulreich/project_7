import React from "react"

import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import StarRating from "../AsideComponents/StarRating";
import Divider from "@material-ui/core/Divider";


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '36ch',
      nWidth: 275,
      height: 470,
      zindex: 1,
      position: "absolute",
      top:"30%",
      overflow:"scroll",
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }));

export default function RestaurantReviewItem(props){
    const classes = useStyles();


    return (
        <div>
          <ListItem className="myListItem" key={Date.now()+Math.floor(Math.random()*100)}>
            <StarRating rating={props.review.rating} />
            <ListItemText
              primary={props.review.author_name}
              secondary={props.review.text}
              />
          </ListItem>
          <Divider/>
        </div>
      );
  }
