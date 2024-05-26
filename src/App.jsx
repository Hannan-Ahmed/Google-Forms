import React from "react";
import InputForm from "./components/InputForm";
import { FormProvider } from "./context/form-context";
import DisplayForm from "./components/DisplayForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Success from "./components/Success";

const App = () => {
  return (
    <>
      <FormProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<InputForm />} />
            <Route path="form" element={<DisplayForm />} />
            <Route path="success" element={<Success />} />
          </Routes>
        </BrowserRouter>
      </FormProvider>
    </>
  );
};

export default App;
