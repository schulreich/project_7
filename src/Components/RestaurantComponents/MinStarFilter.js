import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function MinStarFilter(props) {
  const [minValue, setMinValue] = React.useState(props.selectedValue);

  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent"
        style={{
          position: "absolute",
          left: "80%",
          top:5,
          backgroundColor:"white"
    }}
      >
        <Typography component="legend">Min</Typography>
        <Rating
          name="filter-min-rating" defaultValue={1} size="small" 
          value={minValue}
          onChange={(event, newValue) => {
            setMinValue(newValue);
            props.updateMinRating(newValue);
          }}
        />
      </Box>
    </div>
  );
}