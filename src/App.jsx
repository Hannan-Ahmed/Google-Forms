import React from 'react';
import TextField from './components/TextField';
import { FormProvider } from './context/form-context';
import Responses from './components/Responses';
import DisplayForm from './components/DisplayForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SinglePageApp from './components/Hotel';

const App = () => {
  return (
   <SinglePageApp/>
  );
};

export default App;
