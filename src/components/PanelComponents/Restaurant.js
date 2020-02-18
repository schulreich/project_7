import React from "react"
import restaurantData from "../../restaurantData"
import RestaurantComponents from "./RestaurantComponents"
import "./style.css"



/*function Restaurant(){
    const restaurantInformation = restaurantData.map(item => <RestaurantComponents key= {item.id} restaurant= {item} />)

    return(
        <div className="divStyle">
            {restaurantInformation}
        </div>
    )
    }*/


    
export default class Restaurant extends React.Component{
    constructor(){
        super()
        this.state= {
            restaurantInfo: restaurantData,
        }

    }
    render(){
        return(
            <div className="divStyle">
                <h1></h1>
                {
                    this.state.restaurantInfo.map((item)=> 
                    <div>
                    <h3>{item.restaurantName}</h3>
                    <img src={item.image}/>
                    <p>{item.address}</p>
                    <p>{item.long}/ {item.lat}</p>
                    <ul>
                        {item.ratings.map((sub)=>
                        <li>
                            {sub.stars} {sub.comment}
                        </li>
                        )}
                    </ul>
                    </div>
                    )
                }
            </div>
        )
    }
    
}



/*
export default class Restaurant extends React.Component{
    constructor(){
        super()
        this.state= {
            restaurant: [
                {   
                    id: "1",
                    restaurantName:"Bronco",
                    address:"39 Rue des Petites Écuries, 75010 Paris",
                    lat:48.8737815,
                    long:2.3501649,
                    ratings:[
                      {
                        stars:4,
                        comment:"Great! But not many veggie options."
                      },
                      {
                         stars:5,
                         comment:"My favorite restaurant!"
                      }
                   ]
                },
             ]
        }

    }
    render(){
        return(
            <div>
                <h1>Test1</h1>
                {
                    this.state.restaurant.map((item)=> 
                    <div>
                    <h3 key={item}>{item.restaurantName}</h3>
                    <ul>
                        {item.ratings.map((sub)=>
                        <li>
                            {sub.stars}
                            {sub.comment}
                        </li>
                        )}
                    </ul>
                    </div>
                    )
                }
            </div>
        )
    }  
}
*/
