import React from 'react';
import TextField from './components/TextField';
import { FormProvider } from './context/form-context';
import Responses from './components/Responses';
import DisplayForm from './components/DisplayForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div style={styles.appContainer}>
      <FormProvider>
        <div style={styles.header}>
          <h1 style={styles.title}>Red Themed Form App</h1>
        </div>

        <div style={styles.card}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<TextField />} />
              <Route path="form" element={<DisplayForm />} />
            </Routes>
          </BrowserRouter>
        </div>
      </FormProvider>
    </div>
  );
};

export default App;

const styles = {
  appContainer: {
    background: 'linear-gradient(to right, #ff4b2b, #ff416c)',
    minHeight: '100vh',
    padding: '2rem',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    color: '#fff',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '16px',
    boxShadow: '0 8px 20px rgba(255, 0, 0, 0.3)',
    padding: '2rem',
    maxWidth: '900px',
    margin: '0 auto',
    color: '#333',
  },
};
