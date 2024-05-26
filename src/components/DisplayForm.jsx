
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FormContext } from "../context/form-context";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

const sanitizeLabel = (label) => label.replace(/\s+/g, "_").toLowerCase();

const DisplayForm = () => {
  const { inputsets, formname, formDescription } = useContext(FormContext);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const renderInputField = (input) => {
    const sanitizedLabel = sanitizeLabel(input.label);
    const isRequired = input.required ? "* required" : "";

    switch (input.type) {
      case "text":
        return (
          <div className="bg-white p-4 py-7 rounded-md shadow-md mb-4">
            <label className="block">
              {input.label} {isRequired}
            </label>
            <input
              type="text"
              className="block w-full p-2 pt-0 placeholder-gray-800 outline-none border-b-2 border-gray-500"
              {...register(sanitizedLabel, { required: input.required })}
            />
          </div>
        );
      case "checkbox":
        return (
          <div className="bg-white p-4 py-7 rounded-md shadow-md mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id={input.id}
                className="mr-2"
                {...register(sanitizedLabel, { required: input.required })}
              />
              <label htmlFor={input.id}>
                {input.label} {isRequired}
              </label>
            </div>
          </div>
        );
      case "radio":
        return (
          <div className="bg-white p-4 py-7 rounded-md shadow-md mb-4">
            <label className="block mb-2">
              {input.label} {isRequired}
            </label>
            {input.optionLabels.map((label, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="radio"
                  id={`${input.id}-${index}`}
                  name={sanitizedLabel}
                  className="mr-2"
                  value={label}
                  {...register(sanitizedLabel, { required: input.required })}
                />
                <label htmlFor={`${input.id}-${index}`}>{label}</label>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const onSubmit = (data) => {
    const dataArray = Object.entries(data);

    const worksheet = XLSX.utils.aoa_to_sheet([["Field", "Value"], ...dataArray]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Form Data");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "form_data.xlsx";
    link.click();

    navigate("/success");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-purple-200 w-full flex py-5 flex-col items-center h-full min-h-screen"
    >
      <div className="w-full flex justify-center">
        <div className="relative my-5 w-1/2 shadow-lg h-auto pb-3 rounded-md bg-white border-t-8 border-purple-600">
          <div className="font-semibold text-3xl w-11/12 mx-5 py-3 m-4 mb-0 outline-none">
            {formname}
          </div>
          <p className="text-lg w-11/12 mx-5 pb-3 outline-none ">
            {formDescription}
          </p>
        </div>
      </div>
      <div className="w-1/2">
        {inputsets.map((inputSet, index) => (
          <div key={index} className="mb-8">
            <h3 className="text-md font-semibold mb-2">{inputSet.label}</h3>
            {inputSet.map((input) => (
              <div key={input.id}>{renderInputField(input)}</div>
            ))}
          </div>
        ))}
      </div>
      <Button
        type="submit"
        variant="contained"
        className="relative -left-[18.378rem]"
      >
        Submit
      </Button>
    </form>
  );
};

export default DisplayForm;
