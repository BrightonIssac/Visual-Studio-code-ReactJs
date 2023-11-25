import React from 'react'

import {MdDelete} from "react-icons/md"

const Content = ({items,handleCheck,handleDelete}) => {
  
    
  return (
    <main>
    {(items.length) ? (
      <ul>
        {items.map((i) => (
        <li className= "item" key={i.id}>
          <input 
            type = "checkbox"
            onChange={ ()=> handleCheck(i.id)}
            checked = {i.checked}
          />
          <label>{i.item}</label>
          <MdDelete 
            role="button"
            onClick= {() => handleDelete(i.id)}
            tabIndex="0"
            />

        </li>
        ))}
      </ul>
      ) : (
        <p>Your list is empty</p>
      )
    }
      </main>
    )
}


export default Content