import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useState } from "react";
import LoginButton from "./Components/LoginButton";
import CircularIndeterminate from "./Components/Progress";
import { createTheme, ThemeProvider } from "@mui/system";
import { ThemeContext } from "@emotion/react";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useFormControl } from '@mui/material/FormControl';
import { Input } from "@mui/material";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [guid, setGuid] = useState();
  const [visible,setVisible] = useState(false)
  

  const URL = "https://localhost:7241/api/User";
  const URLCLOUD = "test";
  const URLGETCRED = "tet"

  function startLisenBack() {
    const hubConnection = new HubConnectionBuilder()
    .withUrl(URLCLOUD)
    .build()

    sendData(hubConnection)
    hubConnection.on("Responce", (result) =>{

    })

  } 

  function sendData (hubConnection) 
  {
     axios.post(URLGETCRED,{
      guid,
      connectionId : hubConnection.connectionId
     })
     getData(hubConnection)
  }

  function getData(hubConnection){
    hubConnection.on("Response", (result) => {
      setVisible(result) });
      
  }


  function test() {
    setIsLoading(true);
    axios.get(URL).then((resp) => {
      setGuid(resp.data);
      setIsLoading(false);
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
