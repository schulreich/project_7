import React from 'react';


import "../GoogleMapsComponents/MapContainer"
import "../AsideComponents/RestaurantDetails"

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MapContainer from '../GoogleMapsComponents/MapContainer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

/**
 * Component MainGrid displays the MapContainer.
 */
export default function MainGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <MapContainer className={classes.paper}>xs=12 sm=6</MapContainer>
        </Grid>
      </Grid>
    </div>
  );
}
