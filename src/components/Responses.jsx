import React, { useContext } from 'react'
import { FormContext } from '../context/form-context';

const Responses = () => {
  const { formname, inputsets } = useContext(FormContext);
console.log('its  acijntext dtaa',formname, inputsets)
  return (
    <div>
    
  </div>
  )
}

export default Responses
