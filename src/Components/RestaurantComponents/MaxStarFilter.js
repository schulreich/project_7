import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function MaxStarFilter(props) {
  const [maxValue, setMaxValue] = React.useState(props.selectedValue);

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
        <Typography component="legend">Max</Typography>
        <Rating
            name="filter-max-rating" defaultValue={5} size="small" 
            value={maxValue}
            onChange={(event, newValue) => {
            setMaxValue(newValue);
            props.updateMaxRating(newValue);
          }}
        />
      </Box>
    </div>
  );
}