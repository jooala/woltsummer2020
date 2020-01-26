import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("https://raw.githubusercontent.com/woltapp/summer2020/master/restaurants.json").then(response => {
      console.log("promise fulfilled");
      setRestaurants(response.data);
    });
  }, []);

  const Restaurants = props => {
    return (
      <div>
        {props.restaurants.map(restaurant => (
          <li>
          <Infobox restaurant={restaurant}/>;
          </li>
        ))}
      </div>
    );
  };

const Infobox = ({ restaurant }) => {
  return (
    <div>
      <p>{restaurant.name}</p>
    </div>
  );
};
return (
  <div>
    <p>ravintolat</p>
    <Restaurants restaurants={restaurants} />
  </div>
)
}

export default App;
