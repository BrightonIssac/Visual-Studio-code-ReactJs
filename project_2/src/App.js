
import { useState } from 'react';
import './App.css';
import SearchItem from './SearchItem';
import Square from './Square';

function App() {
  const [colorValue,setColorValue]=useState('')
  const [hexValue,setHexValue]=useState('')
  const [isDarkText,setIsDarkText]=useState('true')
  return (
    <div className="App">
      <Square 
      colorValue={colorValue}
      hexValue={hexValue}
      isDarkText={isDarkText}
      />
      <SearchItem 
      colorValue={colorValue}
      setColorValue={setColorValue}
      setHexValue={setHexValue}
      isDarkText={isDarkText}
      setIsDarkText={setIsDarkText}
      />
    </div>
  );
}

export default App;
