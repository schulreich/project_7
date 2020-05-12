import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function StarRating(props) {
  
  return (
    <div>
       <Box component="fieldset" mb={2} borderColor="transparent"
        style={{position:"absolute", left:175,margin:0,padding:0,top:15}}
       >
        <Typography component="legend"></Typography>
        <Rating name="read-only" size="small" value={props.rating} readOnly />
      </Box>
      </div>
     );
    }