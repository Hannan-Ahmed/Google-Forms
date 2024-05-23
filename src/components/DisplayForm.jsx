import React, { useContext } from "react";
import { FormContext } from "../context/form-context";

const DisplayForm = () => {
  const { inputsets } = useContext(FormContext);

  // Function to render each input field based on its type and label
  const renderInputField = (input) => {
    switch (input.type) {
      case "text":
        return <input type="text" placeholder={input.label} />;
      case "checkbox":
        return (
          <div>
            <input type="checkbox" id={input.id} />
            <label htmlFor={input.id}>{input.label}</label>
          </div>
        );
      case "radio":
        return (
          <div>
            {input.optionLabels.map((label, index) => (
              <div key={index}>
                <input type="radio" id={`${input.id}-${index}`} name={input.id} />
                <label htmlFor={`${input.id}-${index}`}>{label}</label>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h2>Form Data</h2>
      {inputsets.map((inputSet, index) => (
        <div key={index}>
          <h3>Input Set {index + 1}</h3>
          {inputSet.map((input) => (
            <div key={input.id}>
              {renderInputField(input)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DisplayForm;
