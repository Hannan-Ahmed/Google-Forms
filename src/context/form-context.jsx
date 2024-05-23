// import React, { createContext, useState } from 'react';

// export const FormContext = createContext();

// // eslint-disable-next-line react/prop-types
// export const FormProvider = ({ children }) => {
//   const [formname, setFormname] = useState('');
//   const [inputsets, setInputsets] = useState([]);

//   return (
//     <FormContext.Provider value={{ formname, setFormname, inputsets, setInputsets }}>
//       {children}
//     </FormContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from 'react';

const FormContext = createContext();

const FormProvider = ({ children }) => {
  const [formname, setFormname] = useState(() => {
    return localStorage.getItem('formname') || '';
  });
  const [inputsets, setInputsets] = useState(() => {
    const savedInputSets = localStorage.getItem('inputsets');
    return savedInputSets ? JSON.parse(savedInputSets) : [[{ type: 'text', id: Math.random().toString(36).substring(2, 15), title: '', label: '', required: false, showRequiredLabel: false }]];
  });

  useEffect(() => {
    localStorage.setItem('formname', formname);
  }, [formname]);

  useEffect(() => {
    localStorage.setItem('inputsets', JSON.stringify(inputsets));
  }, [inputsets]);

  return (
    <FormContext.Provider value={{ formname, setFormname, inputsets, setInputsets }}>
      {children}
    </FormContext.Provider>
  );
};

export { FormContext, FormProvider };
