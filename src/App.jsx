import React from 'react'
import TextField from './components/TextField'
import { FormProvider } from './context/form-context'
import Responses from './components/Responses'
import DisplayForm from './components/DisplayForm'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {
  return ( 
    <>
    <FormProvider>
    {/* <TextField/>
    <Responses/>
    <hr />
    <h2>FORM</h2>
    <DisplayForm/> */}
    
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TextField />}/>
          <Route path="form" element={<DisplayForm />} />
      </Routes>
    </BrowserRouter>
    
    
    </FormProvider>
    </>
  )
}

export default App
