import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

/**
 * Component MinStarFilter displays a current minimum rating filter.
 * Following parameters are used:
 * - selectedValue (current minimum rating filter)
 * - updateMinRating (parent method to update current minimum rating filter)
 */
export default function MinStarFilter(props) {
  const [minValue, setMinValue] = React.useState(props.selectedValue);

  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent"
        style={{
          position: "absolute",
          left: "80%",
          top:7,
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