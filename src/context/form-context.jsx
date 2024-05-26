import { createContext, useState, useEffect } from "react";

const FormContext = createContext();

const FormProvider = ({ children }) => {
  const [formname, setFormname] = useState(() => {
    return localStorage.getItem("formname") || "";
  });
  const [formDescription, setFormDescription] = useState(() => {
    return localStorage.getItem("formDescription") || "";
  });
  const [inputsets, setInputsets] = useState(() => {
    const savedInputSets = localStorage.getItem("inputsets");
    return savedInputSets
      ? JSON.parse(savedInputSets)
      : [
          [
            {
              type: "text",
              id: Math.random().toString(36).substring(2, 15),
              title: "",
              label: "",
              required: false,
              showRequiredLabel: false,
            },
          ],
        ];
  });

  useEffect(() => {
    localStorage.setItem("formname", formname);
  }, [formname]);

  useEffect(() => {
    localStorage.setItem("formDescription", formDescription);
  }, [formDescription]);

  useEffect(() => {
    localStorage.setItem("inputsets", JSON.stringify(inputsets));
  }, [inputsets]);

  return (
    <FormContext.Provider
      value={{
        formname,
        setFormname,
        formDescription,
        setFormDescription,
        inputsets,
        setInputsets,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export { FormContext, FormProvider };
