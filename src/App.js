import './App.css';

import React, { useState } from 'react'
import NavBar from './Components/NavBar';
import News from './Components/News';
import {
  Routes,
  Route,HashRouter
} from "react-router-dom";
import About from './Components/About';
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const apikey= process.env.REACT_APP_NEWS_API;
  
  const [progress, setProgress] = useState(0);
  const [mode, setMode] = useState('light');

  const toggleMode= ()=>{
    if(mode=== 'light')
    {
      setMode('dark');
      document.body.style.backgroundColor = '#042743';
    }
    else{
      setMode('light');
      document.body.style.backgroundColor = 'white';
    }
  }
  
    return (
      <div>
         <HashRouter>
       <NavBar mode={mode} toggleMode={toggleMode}/>
       <LoadingBar
        color='#f11946'
        progress={progress}  
      />
       <Routes>
      <Route exact path="/" element={<News setProgress={setProgress} mode={mode} apikey={apikey} key="general" pageSize={6} country='in' category='general'/>}/>
      <Route exact path="/general" element={<News setProgress={setProgress} apikey={apikey} key="general" pageSize={6} country='in' category='general'/>}/>
      <Route exact path="/science" element={<News setProgress={setProgress} apikey={apikey} key="science" pageSize={6} country='in' category='science'/>}/>
      <Route exact path="/business" element={<News setProgress={setProgress} apikey={apikey} key="business" pageSize={6} country='in' category='business'/>}/>
      <Route exact path="/entertainment" element={<News setProgress={setProgress} apikey={apikey} key="entertainment" pageSize={6} country='in' category='entertainment'/>}/>
      <Route exact path="/health" element={<News setProgress={setProgress} apikey={apikey} key="health" pageSize={6} country='in' category='health'/>}/>
      <Route exact path="/sports" element={<News setProgress={setProgress} apikey={apikey} key="sports" pageSize={6} country='in' category='sports'/>}/>
      <Route exact path="/technology" element={<News setProgress={setProgress} apikey={apikey} key="technology" pageSize={6} country='in' category='technology'/>}/>
      <Route exact path="/about" element={<About setProgress={setProgress} key="about"/>}/>
      </Routes>
      </HashRouter>
      </div>
    )
  }

  export default App;


