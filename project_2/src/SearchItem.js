import React from 'react'
import colorNames from 'colornames'

const SearchItem = ({colorValue,setColorValue,setHexValue,isDarkText,setIsDarkText}) => {
  return (
    <form className='addItem' onSubmit={(e)=>  e.preventDefault()}>
        <label >Add colour name</label>
        <input
        autofocus
        type="text"
        placeholder='Type the Colour here'
        required
        value={colorValue}
        onChange={(e)=> {            
            setColorValue(e.target.value);
            setHexValue(colorNames(e.target.value));
        }}
        />
        <button 
        type="button"
        onClick={()=> setIsDarkText(!isDarkText)}
        >
            Toggle Text Colour
        </button>

    </form>
  )
}

export default SearchItem