import React, { useState } from "react"

export default function RestaurantList() {
    const [restaurants, updateResttaurants] = useState([])

    React.useEffect(function effectFunction() {
        fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=51.434406,6.762329&radius=1500&type=restaurant&key=AIzaSyC6iHzGGrNmtKZB-LDf2tCYMOQXKD6YPac")
            .then(response => response.json())
            .then(({ data: restaurants }) => {
                updateRestaurants(restaurants);
            });
            console.log("testB")
    }, []);
}