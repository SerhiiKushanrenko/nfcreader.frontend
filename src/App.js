import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useState } from "react";
import LoginButton from "./Components/LoginButton";
import CircularIndeterminate from "./Components/Progress";
import { createTheme, ThemeProvider } from "@mui/system";
import { ThemeContext } from "@emotion/react";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useFormControl } from '@mui/material/FormControl';
import { Input } from "@mui/material";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [guid, setGuid] = useState();
  const [visible,setVisible] = useState(false)
  

  const URL = "https://localhost:7241/api/User";
  const URLCLOUD = "https://localhost:7079/checkHub";
  const URLPOSTCRED = "https://localhost:7079/api/AddGuid"
   

  function test12 (){ 
    axios.get("https://localhost:7079/api/UserInfo").then((resp) => {
    console.log(resp);
  });}
  

  function startLisenBack() {
    const hubConnection = new HubConnectionBuilder()
    .withUrl(URLCLOUD)
    .build()
   
    hubConnection.start()
    console.log(hubConnection);
    sendData(hubConnection)

    hubConnection.on("CheckHubAsync", (result) =>{
      console.log(result);
       setVisible(result)
    })
    hubConnection.stop()
  } 

  function sendData (hubConnection) 
  {
    
     axios.post(URLPOSTCRED,{
      guid : guid,
      connectionId : hubConnection.connectionId
     })
     
  }



  function test() {
    setIsLoading(true);
    axios.get(URL).then((resp) => {
      setGuid(resp.data);
      setIsLoading(false);
      //test12();
      startLisenBack();
      
    });
  }


  return (
    <div className="App">
      <LoginButton onClick={test}>fdsfds</LoginButton>
      {isLoading ? <CircularIndeterminate /> : <p>{guid}</p>}
      {visible? <p>Welcome</p>: null}
    </div>
  );
}

export default App;
