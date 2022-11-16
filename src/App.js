import './App.css';
import React from 'react';

import Mapp from './Map';
import Mylocation from './Location';
import TopNav from './TopNavigator';
import Sidebar from './components/Sidebar';

function App() {
  
  return (
    <div className="App">
      <TopNav/>
      <Sidebar/>
      <Mapp/>  
      <Mylocation/>
      <h1> STATISTICS</h1> 
      
    </div>
  );
}


export default App;