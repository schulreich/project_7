import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function StarRating(props) {
  const [value, setValue] = React.useState(2);

  return (
    <div>
       <Box component="fieldset" mb={2} borderColor="transparent"
        //style={{position:"absolute",top:20}}
       >
        <Typography component="legend"></Typography>
        <Rating name="read-only" value={props.rating} readOnly />
      </Box>
      </div>
     );
    }