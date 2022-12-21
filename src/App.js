
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
  const [device,setDevice] = useState();
  const [userName,setUserName] = useState();
  const [errorUsbDevice,setErrorUsbDevice] = useState(false) 
  var ourGuid = uuidv4();
  
  const URL = "https://localhost:7241/api/User"; 
  const URLCLOUD = "https://localhost:7079/checkHub"; //https://localhost:7079/checkHub    https://cloudnfc.tk/checkHub
  const URLPOSTCRED = "https://localhost:7079/api/AddGuid" // https://localhost:7079/api/AddGuid   https://cloudnfc.tk/api/AddGuid
  const EXIT = "Exit"
  const LOGIN = "Login"


  const signalR = () => {
    const connection = new HubConnectionBuilder()
      .withUrl(URLCLOUD)
      .build();

      connection.start().then( () => { sendData(connection.connection.connectionId);})

      console.log(connection);

      connection.on("Notify", (result,deviceId,name) =>{
        console.log(result);
         setVisible(result)
         setDevice(deviceId)
         setUserName(name)
         setIsLoading(false)
         
        if (result) {
          setName(EXIT)
          setIsLogined(true)
        }
        if (!result) {
          setErrorUsbDevice(true)
          setName(EXIT)
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
      setName(LOGIN)
      setVisible(false)
      setIsLogined(false)
      setErrorUsbDevice(false)
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
      <div class="header"><h1>NFCReader.v1</h1> </div>
       <LoginButton onClick={Start} name={name}></LoginButton> 
      {isLoading ? <CircularIndeterminate /> : <p className={classes.important}>{guid}</p>}
      {visible? <p className={classes.important}>Welcome</p>: null}
      {errorUsbDevice? <p className={classes.important}>Error, Check Usb Device and try again</p>: null}
      {visible? <p className={classes.important}>User: {userName}</p>: null}
      {visible? <p className={classes.important}>DeviceId: {device}</p>: null}
    </div>
  );
}

export default App;
