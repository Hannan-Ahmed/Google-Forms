
import React, { useContext, useState } from "react";
import { CiCirclePlus, CiFileOn } from "react-icons/ci";
import { MdTextFields } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import Switch from "@mui/material/Switch";
import { Button, Checkbox } from "@mui/material";
import { FormContext } from "../context/form-context";
import Responses from "./Responses";

const TextField = () => {
  const { formname, setFormname, inputsets, setInputsets } = useContext(FormContext);

  const [formName, setFormName] = useState(""); // State for form name
  const [inputSets, setInputSets] = useState([
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
  ]); // State for input sets


  const handleAddInput = (index, type) => {
    const newInputSets = inputSets.map((set, idx) =>
      idx === index
        ? [
            ...set,
            {
              type,
              id: Math.random().toString(36).substring(2, 15),
              title: "",
              label: "",
              optionLabels: type === "radio" ? ["", ""] : undefined, // Set optionLabels only for radio buttons
              required: false,
              showRequiredLabel: false,
            },
          ]
        : set
    );
    setInputSets(newInputSets);
    setInputsets(newInputSets); // Update context with the new input sets
  };
  
  // const handleAddInput = (index, type) => {
  //   const newInputSets = [...inputSets];
  //   newInputSets[index] = [
  //     ...newInputSets[index],
  //     {
  //       type,
  //       id: Math.random().toString(36).substring(2, 15),
  //       title: "",
  //       label: "",
  //       optionLabels: ["", ""], // Separate labels for each radio option
  //       required: false,
  //       showRequiredLabel: false,
  //     },
  //   ];
  //   setInputSets(newInputSets);
  //   setInputsets(newInputSets); // Update context with the new input sets
  // };

  const handleRemoveInput = (index, id) => {
    const newInputSets = [...inputSets];
    newInputSets[index] = newInputSets[index].filter(
      (input) => input.id !== id
    );
    setInputSets(newInputSets);
    setInputsets(newInputSets); // Update context with the new input sets
  };

  const handleLabelChange = (index, id, newLabel, optionIndex) => {
    const newInputSets = [...inputSets];
    newInputSets[index] = newInputSets[index].map((input) =>
      input.id === id
        ? {
            ...input,
            optionLabels: input.optionLabels.map((label, i) =>
              i === optionIndex ? newLabel : label
            ),
          }
        : input
    );
    setInputSets(newInputSets);
    setInputsets(newInputSets); // Update context with the new input sets
  };

  const handleRequiredChange = (index, id) => {
    const newInputSets = [...inputSets];
    newInputSets[index] = newInputSets[index].map((input) =>
      input.id === id
        ? {
            ...input,
            required: !input.required,
            showRequiredLabel: !input.required,
          }
        : input
    );
    setInputSets(newInputSets);
    setInputsets(newInputSets); // Update context with the new input sets
  };

  const handleFormNameChange = (e) => {
    setFormName(e.target.value);
  };

  const handleInputChange = (index, id, value) => {
    const newInputSets = [...inputSets];
    newInputSets[index] = newInputSets[index].map((input) =>
      input.id === id ? { ...input,label:value } : input
    );
    // setInputSets(newInputSets);
    setInputsets(newInputSets); // Update context with the new input sets
  };

  // const renderInput = (index, input) => {
  //   switch (input.type) {
  //     case "text":
  //       return (
  //         <div key={input.id} className="relative -left-2 ">
  //           <input
  //             type="text"
  //             placeholder="Text Field"
  //             className="bg-gray-100 border-b-2 border-gray-900 outline-none w-full p-2 h-16"
  //             required={input.required}
  //             value={input.value}
  //             onChange={(e) =>
  //               handleInputChange(index, input.id, e.target.value)
  //             }
  //           />
  //           {input.showRequiredLabel && (
  //             <span className="text-red-500">* Required</span>
  //           )}
  //           <input
  //             onChange={(e) =>
  //               handleLabelChange(index, input.id, e.target.value)
  //             }
  //             value={input.label}
  //             type="text"
  //             placeholder="Short answer text"
  //             className="border-b-2 border-gray-400 outline-none w-full pt-7 h-16"
  //             required={input.required}
  //           />
  //           <div className="flex gap-32 items-end">
  //             <button
  //               className="mt-8"
  //               onClick={() => handleRemoveInput(index, input.id)}
  //             >
  //               <MdDeleteOutline fontSize={28} />
  //             </button>

  //             <div className="relative top-1">
  //               <Switch
  //                 onChange={() => handleRequiredChange(index, input.id)}
  //               />
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     case "checkbox":
  //       return (
  //         <div key={input.id} className="relative -left-2 ">
  //           <label className="flex items-center">
  //             <Checkbox defaultChecked required={input.required} />
  //             <span
  //               contentEditable="true"
  //               onBlur={(e) =>
  //                 handleLabelChange(index, input.id, e.target.textContent)
  //               }
  //               className="w-1/2 border-b-2 border-black outline-none"
  //             >
  //               {input.label}
  //             </span>
  //           </label>
  //           {input.showRequiredLabel && (
  //             <span className="text-red-500">* Required</span>
  //           )}
  //           <div className="flex gap-32 items-end">
  //             <button
  //               className="mt-8"
  //               onClick={() => handleRemoveInput(index, input.id)}
  //             >
  //               <MdDeleteOutline fontSize={28} />
  //             </button>
  //             <div className="relative top-1">
  //               <Switch
  //                 onChange={() => handleRequiredChange(index, input.id)}
  //               />
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     case "radio":
  //       const name = `radio-group-${index}`;
  //       return (
  //         <div key={input.id} className="input-container">
  //           <div className=" flex flex-col gap-4">
  //             <label htmlFor={`${input.id}-option1`}>
  //               <input type="radio" id={`${input.id}-option1`} name={name} />
  //               <span
  //                 contentEditable="true"
  //                 onBlur={(e) =>
  //                   handleLabelChange(index, input.id, e.target.textContent, 0)
  //                 }
  //                 className="w-1/2 px-10 border-b-2 border-black outline-none"
  //               >
  //                 {input.optionLabels[0]}
  //               </span>
  //             </label>

  //             <label htmlFor={`${input.id}-option2`}>
  //               <input type="radio" id={`${input.id}-option2`} name={name} />
  //               <span
  //                 contentEditable="true"
  //                 onBlur={(e) =>
  //                   handleLabelChange(index, input.id, e.target.textContent, 1)
  //                 }
  //                 className="w-1/2 px-10 border-b-2 border-black outline-none"
  //               >
  //                 {input.optionLabels[1]}
  //               </span>
  //             </label>
  //             {input.showRequiredLabel && (
  //               <span className="text-red-500">* Required</span>
  //             )}
  //           </div>

  //           <div className="flex gap-32 items-end">
  //             <button
  //               className="mt-8"
  //               onClick={() => handleRemoveInput(index, input.id)}
  //             >
  //               <MdDeleteOutline fontSize={28} />
  //             </button>
  //             <div className="relative top-1">
  //               <Switch
  //                 onChange={() => handleRequiredChange(index, input.id)}
  //               />
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     default:
  //       return null;
    // }
  // };


  const renderInput = (index, input) => {
    switch (input.type) {
      case "text":
        return (
          <div key={input.id} className="relative -left-2">
            <input
              type="text"
              placeholder="Text Field"
              className="bg-gray-100 border-b-2 border-gray-900 outline-none w-full p-2 h-16"
              required={input.required}
              value={input.value}
              onChange={(e) => handleInputChange(index, input.id, e.target.value)}
            />
            {input.showRequiredLabel && (
              <span className="text-red-500">* Required</span>
            )}
            <input
              onChange={(e) => handleLabelChange(index, input.id, e.target.value)}
              value={input.label}
              type="text"
              placeholder="Short answer text"
              className="border-b-2 border-gray-400 outline-none w-full pt-7 h-16"
              required={input.required}
            />
            <div className="flex gap-32 items-end">
              <button
                className="mt-8"
                onClick={() => handleRemoveInput(index, input.id)}
              >
                <MdDeleteOutline fontSize={28} />
              </button>
              <div className="relative top-1">
                <Switch onChange={() => handleRequiredChange(index, input.id)} />
              </div>
            </div>
          </div>
        );
      case "checkbox":
        return (
          <div key={input.id} className="relative -left-2">
            <label className="flex items-center">
              <Checkbox defaultChecked required={input.required} />
              <span
                contentEditable="true"
                onBlur={(e) => handleLabelChange(index, input.id, e.target.textContent)}
                className="w-1/2 border-b-2 border-black outline-none"
              >
                {input.label}
              </span>
            </label>
            {input.showRequiredLabel && (
              <span className="text-red-500">* Required</span>
            )}
            <div className="flex gap-32 items-end">
              <button
                className="mt-8"
                onClick={() => handleRemoveInput(index, input.id)}
              >
                <MdDeleteOutline fontSize={28} />
              </button>
              <div className="relative top-1">
                <Switch onChange={() => handleRequiredChange(index, input.id)} />
              </div>
            </div>
          </div>
        );
      case "radio":
        const name = `radio-group-${index}`;
        return (
          <div key={input.id} className="input-container">
            <div className=" flex flex-col gap-4">
              {input.optionLabels.map((optionLabel, optionIndex) => (
                <label key={`${input.id}-${optionIndex}`} htmlFor={`${input.id}-option${optionIndex + 1}`}>
                  <input type="radio" id={`${input.id}-option${optionIndex + 1}`} name={name} />
                  <span
                    contentEditable="true"
                    onBlur={(e) =>
                      handleLabelChange(index, input.id, e.target.textContent, optionIndex)
                    }
                    className="w-1/2 px-10 border-b-2 border-black outline-none"
                  >
                    {optionLabel}
                  </span>
                </label>
              ))}
              {input.showRequiredLabel && (
                <span className="text-red-500">* Required</span>
              )}
            </div>
            <div className="flex gap-32 items-end">
              <button
                className="mt-8"
                onClick={() => handleRemoveInput(index, input.id)}
              >
                <MdDeleteOutline fontSize={28} />
              </button>
              <div className="relative top-1">
                <Switch onChange={() => handleRequiredChange(index, input.id)} />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const handleSelectChange = (index, e) => {
    const type = e.target.value;
    if (type) {
      handleAddInput(index, type);
    }
  };

  return (
<>
<div className="bg-purple-200 w-full flex justify-center flex-col items-center h-full min-h-screen overflow-y-scroll">

      {/* Header */}
      <div className="w-full flex justify-center  gap-2 fixed top-5   z-40">
        {/* Form name input */}
        <div className="w-1/2  shadow-lg  h-40 rounded-md bg-white border-t-8 border-purple-500 border-l-4 border-l-blue-500">
          <input
            type="text"
            value={formName}
            onChange={handleFormNameChange}
            placeholder="Some Random Survey"
            className="text-xl w-11/12 mx-5 py-3  m-4 border-b-2 border-gray-500 placeholder-text-lg placeholder-gray-800 focus:outline-none"
          />
        </div>
        {/* Plus icon and other options */}
        <div className="h-auto w-10 bg-white rounded-md gap-2 flex justify-center flex-col items-center">
          <span
            className="hover:cursor-pointer"
            onClick={() => {
              setInputSets([...inputSets, []]);
            }}
          >
            <CiCirclePlus fontSize={28} />
          </span>

          <span>
            <CiFileOn fontSize={28} />
          </span>

          <span>
            <MdTextFields fontSize={30} />
          </span>
        </div>
      </div>

      {/* Input options */}

      {inputSets.map((inputSet, index) => (
        <div
          key={index}
          className="w-[50.6%] flex mt-32 flex-row-reverse h-auto rounded-md bg-white border-l-4 my-4 relative -left-5 "
        >
          <div className="py-7 px-3">
            <select
              onChange={(e) => handleSelectChange(index, e)}
              defaultValue=""
              className="p-2 border-2 border-gray-500 rounded-md"
            >
              <option value="" disabled>
                Choose an option
              </option>
              <option value="text">Text Field</option>
              <option value="checkbox">Checkbox</option>
              <option value="radio">Radio Button(s)</option>
            </select>
          </div>
          <div className="p-5 w-5/6  ">
            {inputSet.map((input) => renderInput(index, input))}
          </div>
        </div>
      ))}

      <Button variant="contained" className="relative -left-[19.378rem]">
        Submit
      </Button>
    </div>
    </>

  );
};

export default TextField;
