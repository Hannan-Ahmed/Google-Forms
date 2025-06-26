import React, { useContext } from "react";
import { FormContext } from "../context/form-context";

const DisplayForm = () => {
  const { inputsets } = useContext(FormContext);

  const renderInputField = (input) => {
    switch (input.type) {
      case "text":
        return (
          <input
            type="text"
            placeholder={input.label}
            id={input.id}
            style={styles.input}
          />
        );

      case "checkbox":
        return (
          <div style={styles.inputGroup}>
            <input type="checkbox" id={input.id} />
            <label htmlFor={input.id} style={styles.label}>
              {input.label}
            </label>
          </div>
        );

      case "radio":
        return (
          <div style={styles.inputGroup}>
            {input.optionLabels.map((label, index) => (
              <div key={index} style={styles.radioOption}>
                <input
                  type="radio"
                  id={`${input.id}-${index}`}
                  name={input.id}
                />
                <label htmlFor={`${input.id}-${index}`} style={styles.label}>
                  {label}
                </label>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Form Data</h2>
      {inputsets.map((inputSet, index) => (
        <div key={index} style={styles.inputSet}>
          <h3 style={styles.subHeading}>Input Set {index + 1}</h3>
          {inputSet.map((input) => (
            <div key={input.id} style={styles.fieldWrapper}>
              {renderInputField(input)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    maxWidth: "600px",
    margin: "auto",
  },
  heading: {
    marginBottom: "16px",
    color: "#333",
  },
  subHeading: {
    marginTop: "20px",
    marginBottom: "12px",
    color: "#555",
  },
  inputSet: {
    marginBottom: "20px",
    padding: "15px",
    backgroundColor: "#fff",
    borderRadius: "6px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  inputGroup: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "10px",
  },
  label: {
    fontSize: "14px",
    color: "#333",
  },
  input: {
    padding: "8px",
    fontSize: "14px",
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: "10px",
  },
  fieldWrapper: {
    marginBottom: "12px",
  },
  radioOption: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
};

export default DisplayForm;
