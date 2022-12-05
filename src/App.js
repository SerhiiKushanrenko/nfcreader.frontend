
import "./App.css";
import axios from "axios";
import { useState } from "react";
import LoginButton from "./Components/LoginButton";
import CircularIndeterminate from "./Components/Progress";
import { v4 as uuidv4 } from 'uuid';
import { HttpTransportType, HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import classes from "./Components/StyleCss/P.Module.Css"



function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [guid, setGuid] = useState();
  const [visible,setVisible] = useState(false)
  const [name,setName] = useState("Login");
  const [isLogined,setIsLogined] = useState(false);
  var ourGuid = uuidv4();
  
  const URL = "http://localhost:8080/api/User";
  const URLCLOUD = "http://3.10.151.65:8080/checkHub";
  const URLPOSTCRED = "http://3.10.151.65:8080/api/AddGuid"
  


  const signalR = () => {
    const connection = new HubConnectionBuilder()
      .withUrl(URLCLOUD)
      .build();

      connection.start().then( () => { sendData(connection.connection.connectionId);})

      console.log(connection);

      connection.on("Notify", (result) =>{
        console.log(result);
         setVisible(result)
         setIsLoading(false)
         
        if (result) {
          setName("Exit")
          setIsLogined(true)
        }
        
      })
      
  };

  function sendData (connectionId) 
  {
    console.log(guid);
     axios.post(URLPOSTCRED,{
      id : ourGuid,
      connectionId : connectionId
     })
     
  }



  function Start() {
    if (isLogined) {
      setName("Login")
      setVisible(false)
      setIsLogined(false)
      return;
    }
    setIsLoading(true);
    axios.post(URL,
      {id:ourGuid}
    )
    signalR();
    
  }

  
  

  return (
    <div className="App">
       <LoginButton onClick={Start} name={name}></LoginButton> 
      {isLoading ? <CircularIndeterminate /> : <p className={classes.important}>{guid}</p>}
      {visible? <p className={classes.important}>Welcome</p>: null}
    </div>
  );
}

export default App;
