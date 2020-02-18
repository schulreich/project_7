import React from "react"

const restaurant =[
    {
        id: "1",
        restaurantName:"Bronco",
        address:"39 Rue des Petites Écuries, 75010 Paris",
        lat:6.762329,
        long:51.434406,
        image:"https://images.unsplash.com/photo-1567336967319-2500ab3ce9dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200",
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
    {
        id:"2",
        restaurantName:"Babalou",
        address:"4 Rue Lamarck, 75018 Paris",
        lat:6.764519,
        long:51.428500,
        ratings:[
          { 
            stars:5,
            comment:"Tiny pizzeria next to Sacre Coeur!"
          },
          { 
            stars:3,
            comment:"Meh, it was fine."
          }
       ]
    }
 ]

export default restaurant