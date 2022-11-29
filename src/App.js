import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState } from 'react';


function App() {
  let guid = 0
  const [test1,setTest] = useState(20);
 const URL = 'https://localhost:7241/api/User';
 
  function test(){
    axios.get(URL).then((resp) => setTest(resp.data))
  }
  return (
    <div className="App">
      <button onClick={test}>fdsfds</button>
      <p>{test1}</p>
    </div>
  );
}

export default App;
