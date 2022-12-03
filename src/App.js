
import "./App.css";
import axios from "axios";
import { useState } from "react";
import LoginButton from "./Components/LoginButton";
import CircularIndeterminate from "./Components/Progress";
import { v4 as uuidv4 } from 'uuid';
import { HttpTransportType, HubConnection, HubConnectionBuilder } from "@microsoft/signalr";


function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [guid, setGuid] = useState();
  const [visible,setVisible] = useState(false)
  var ourGuid = uuidv4();
  
  const URL = "https://localhost:7241/api/User";
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
   
    setIsLoading(true);
    axios.post(URL,
      {id:ourGuid}
    )
    signalR();
  }

  
  

  return (
    <div className="App">
      <LoginButton onClick={Start}>fdsfds</LoginButton>
      {isLoading ? <CircularIndeterminate /> : <p>{guid}</p>}
      {visible? <p>Welcome</p>: null}
    </div>
  );
}

export default App;
