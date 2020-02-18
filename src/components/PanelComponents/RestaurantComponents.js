import React from "react"

function RestaurantComponents(props){
    console.log("test")
    console.log(props)
    return(
        <div>
            <h3>{props.restaurant.restaurantName}</h3>
            <p>{props.restaurant.adress}</p>
            <p>{props.restaurant.lat}</p>
            <p>{props.restaurant.long}</p>
        </div>
    )
}

export default RestaurantComponents