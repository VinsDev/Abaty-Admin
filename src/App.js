import './App.css'
import Content from './components/Contents/Contents';
import MainDash from './components/NavItems/Dashboard/MainDash';
import RightSide from './components/RigtSide/RightSide';
import Sidebar from './components/Sidebar';
import React, { useState } from 'react';


function App() {

  const [selectedItem, setSelectedItem] = useState(<MainDash />);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar onItemClick={handleItemClick}/>
        <Content selectedItem={selectedItem}/>
        <RightSide />
      </div>
    </div>
  );
}

export default App;
