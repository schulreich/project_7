import React from "react"

import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '36ch',
      nWidth: 275,
      height: 470,
      zindex: 1,
      position: "absolute",
      top:"12%",
      left: "70%",
      overflow:"scroll",
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }));

/**
 * Component RestaurantListItem displays one restaurant inside RestaurantList.
 * Following parameters are used:
 * - onClickListItem (parent method to open the corresponding restaurant)
 * - restaurant (restaurant data)
 */
export default function RestaurantListItem(props){
    const classes = useStyles();


    return (
        
          <ListItem 
            alignItems="flex-start"
            onClick={() => props.onClickListItem(props)}
            >
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"
              style={{backgroundColor:"orange"}}/>
            </ListItemAvatar>
            <ListItemText
              primary={props.restaurant.name}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                    style={{fontSize:"small"}}
                  >
                     {props.restaurant.vicinity}
                  </Typography>
                 
                </React.Fragment>
              }
            />
          </ListItem>
          
      );
  }
