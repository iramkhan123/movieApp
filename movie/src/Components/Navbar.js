import React, { Component } from 'react'
import { Link } from "react-router-dom";
export default class 
 extends Component {
  render() {
    return (
        <div
        style={{
          display: "flex",
          color:"blue",
          padding: "1rem",
   
        }}
      > 
      <Link to="/" style={{textDecoration:"none"}}>
        <h3 className="decor">Movie App</h3>
      </Link>
      <Link to="/fav" style={{textDecoration:"none"}}>
        <h3 style={{ marginLeft: "2rem" }} className="decor">Favourites</h3>
        </Link>
      </div>
    )
  }
}
