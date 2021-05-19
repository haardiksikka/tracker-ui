import logo from './logo.svg';
import './App.css';
import GoogleMapReact from 'google-map-react';
import React, {useEffect, useReducer} from "react";
import axios from 'axios';
import {useInterval} from "./util";

const App = () => {


  const state = {
    latitude: 0,
    longitude: 0,
    userName:""
  }

 
  const reducer = (state, action) => {
    switch(action.type){
      case "updateLocation":
        return {...state, longitude:action.payload.longitude, latitude: action.payload.latitude}
      case "setUserName":
        return {...state, userName:action.payload}  
    }
    return state;
  }


  const [mapState, dispatch] = useReducer(reducer, state);

  const mapStyles = {
    width: '100%',
    height: '100%'
  }
  
  const markerStyle = {
    height: '50px',
    width: '50px',
    marginTop: '-50px'
  }
  
  const imgStyle = {
    height: '100%'
  }

  const Marker = ({ title }) => (
    <div style={markerStyle}>
      <img style={imgStyle} src="https://res.cloudinary.com/og-tech/image/upload/s--OpSJXuvZ--/v1545236805/map-marker_hfipes.png" alt={title} />
      <h3>{title}</h3>
    </div>
  );

  useInterval(() => {
    if(mapState.userName && mapState.userName.length>=3 ){
    axios.get(`https://live-location-process.herokuapp.com/user/locations/live/${mapState.userName}`).then(res => {
      console.log(res.data);
      if(mapState.latitude != res.data.latitude && mapState.longitude!=res.data.longitude){
        dispatch({type:"updateLocation", payload:res.data})
      }
    })
  }
  }, 1000 * 10);

  function setUserName(event){
    var user = event.target.value;
    console.log(user);
    if(user.length>=3){
      dispatch({type:"setUserName", payload:user})
    }  
  }
  // style = {{backgroundImage:url("https://thumbs.dreamstime.com/b/abstract-line-connection-night-city-background-117738973.jpg"),
  // backgroundRepeat:'no-repeat', backgroundPosition:'center', backgroundSize:'cover' }}
    return (
      <div >
        <form>
        
        <input style={{width:"100%", padding:"12px 10px", boxSizing:'border-box', margin:"10px", fontSize:"16px" }} type = "text" id = "userName" name = "userName" onChange = {setUserName}placeholder= "Enter User Name"></input> <br/>  
      
        </form>
        <div class="googmap" style = {{height:"500px", width:"100%", justifyContent:'center', display:'flex', flexFlow:'row nowrap'}}>
        <GoogleMapReact
          style={mapStyles}
          bootstrapURLKeys={{ key: 'AIzaSyAtr5NR45NQjiQbTNT6OHW8QlR3bX459YU' }}
          center={{ lat: mapState.latitude, lng: mapState.longitude }}
          zoom={20}
          resetBoundsOnResize={true}
        >
          <Marker
          title={'Current Location'}
          lat={mapState.latitude}
          lng={mapState.longitude}
        >
          </Marker>
        </GoogleMapReact>
        </div>
      </div>
    )
}

export default App;
