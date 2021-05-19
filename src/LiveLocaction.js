import React, {useEffect, useReducer, useState} from 'react';
import axios from 'axios';

const LiveLocation = () => {

    const state = {
        latitude: 0,
        longitude: 0,
        userName:"",
        watchId:""
      }

      const [watchState, setWatchState] = useState(0);
      const reducer = (state, action) => {
        switch(action.type){
          case "setUserName":
            return {...state, userName:action.payload}  
        }
        return state;
      }
    
    
      const [userState, dispatch] = useReducer(reducer, state);
    
    // useEffect(() => {
     
    // }, [])


    function startTracking(){
      var options = {
        enableHighAccuracy: true
      };
          console.log("ene");
        if (navigator.geolocation) {
          //console.log(navigator.geolocation.)
          var id = navigator.geolocation.watchPosition(showPosition, onError, options);
          setWatchState(id);
        } else { 
          console.log("Geolocation is not supported by this browser.");
        }
    }

    function stopTracking(){
      navigator.geolocation.clearWatch(watchState);
    }
function onError(err){
    console.log("error encoutered",err)
} 

    function showPosition(position) {
        //var theDate = new Date(position.timestamp);
        //dateString = theDate.toGMTString();
        
        var currentdate = new Date(); 
        var datetime = currentdate.getFullYear()+"-"+
                        + (currentdate.getMonth()+1)  + "-" 
                        + (currentdate.getDate())+" "   
                        + currentdate.getHours() + ":"  
                        + currentdate.getMinutes() + ":" 
                        + currentdate.getSeconds();
        console.log("enetring..", position);
        var xhttp = new XMLHttpRequest();
         
          const loc = {"latitude":position.coords.latitude, "longitude":position.coords.longitude, "speed":position.coords.speed, "user":userState.userName, "timestamp":position.timestamp, "time":datetime}
          console.log("uername",userState.userName)
          
         // if(userState.userName.length>3){
          // xhttp.open("POST", "http://localhost:8080/producer", true);
          // xhttp.setRequestHeader("Content-type", "application/json");
        
          // xhttp.send(JSON.stringify(loc));
          axios.post("https://live-location-process.herokuapp.com/producer", loc).then(res => {
            console.log(res.data);
          })
        //  }
        }

    function setUserName(event){
        var user = event.target.value;
        console.log(user);
        if(user.length>=3){
          dispatch({type:"setUserName", payload:user})
        }  
      }
    return (
        <div>
        <form>
        
        <input style={{width:"100%", padding:"12px 10px", boxSizing:'border-box', margin:"10px", fontSize:"16px" }} type = "text" id = "userName" name = "userName" onChange = {setUserName} placeholder= "Enter User Name"></input> <br/>  
      
        </form>
        <button onClick={startTracking}>Share live location</button> <br/> <br/>
        <button onClick={stopTracking}>End Live location</button>
        </div>
    )
}

export default LiveLocation;