import { useContext, useEffect, useRef, useState } from "react";
import { CiCirclePlus, CiFileOn } from "react-icons/ci";
import { MdTextFields, MdDeleteOutline } from "react-icons/md";
import Switch from "@mui/material/Switch";
import { Button, Checkbox } from "@mui/material";
import { useTransition, animated } from "react-spring";
import { FormContext } from "../context/form-context";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";

const InputForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setFormname, setInputsets } = useContext(FormContext);
  const [formName, setFormName] = useState(""); 
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
  ]); 

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/form");
    }, 2000); 
  };

  useEffect(() => {
    localStorage.setItem("formname", formName);
  }, [formName]);

  const [formDescription, setFormDescription] = useState(() => {
    return localStorage.getItem("formDescription") || "";
  });
  useEffect(() => {
    localStorage.setItem("formDescription", formDescription);
  }, [formDescription]);

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
              optionLabels: type === "radio" ? ["", ""] : undefined, 
              required: false,
              showRequiredLabel: false,
            },
          ]
        : set
    );
    setInputSets(newInputSets);
    setInputsets(newInputSets); 
  };

  const handleRemoveInput = (index, id) => {
    const newInputSets = [...inputSets];
    newInputSets[index] = newInputSets[index].filter(
      (input) => input.id !== id
    );
    setInputSets(newInputSets);
    setInputsets(newInputSets); 
  };

  const handleLabelChange = (index, id, newLabel, optionIndex) => {
    const newInputSets = [...inputSets];
    newInputSets[index] = newInputSets[index].map((input) => {
      if (input.id === id) {
        if (input.type === "radio" && optionIndex !== undefined) {
          const updatedOptionLabels = input.optionLabels.map((label, i) =>
            i === optionIndex ? newLabel : label
          );
          return { ...input, optionLabels: updatedOptionLabels };
        } else {
          return { ...input, label: newLabel };
        }
      }
      return input;
    });
    setInputSets(newInputSets);
    setInputsets(newInputSets); 
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
    setInputsets(newInputSets); 
  };

  const handleFormNameChange = (e) => {
    setFormName(e.target.value);
    setFormname(e.target.value); 
  };

  const handleInputChange = (index, id, value) => {
    const newInputSets = [...inputSets];
    newInputSets[index] = newInputSets[index].map((input) =>
      input.id === id ? { ...input, label: value } : input
    );
    setInputSets(newInputSets);
    setInputsets(newInputSets); 
  };
  const renderInput = (index, input) => {
    switch (input.type) {
      case "text":
        return (
          <div key={input.id} className="relative -left-2 my-5">
            <input
              type="text"
              placeholder="Text Field"
              className="bg-gray-100 border-b-2 border-gray-900 outline-none w-full p-2 h-16"
              required={input.required}
              value={input.label}
              onChange={(e) =>
                handleInputChange(index, input.id, e.target.value)
              }
            />
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
                <Switch
                  onChange={() => handleRequiredChange(index, input.id)}
                />
              </div>
            </div>
          </div>
        );

      case "checkbox":
        return (
          <div key={input.id} className="relative -left-23">
            <label className="flex items-center relative right-3">
              <Checkbox defaultChecked required={input.required} />
              <input
                type="text"
                value={input.label}
                onChange={(e) =>
                  handleLabelChange(index, input.id, e.target.value)
                }
                placeholder="Checkbox label"
                className="w-1/2 border-b-2 border-black outline-none"
              />
            </label>
            {input.showRequiredLabel && (
              <span className="text-red-500">* Required</span>
            )}
            <div className="flex gap-32 items-end relative right-[0.39rem]">
              <button
                className="mt-8"
                onClick={() => handleRemoveInput(index, input.id)}
              >
                <MdDeleteOutline fontSize={28} />
              </button>
              <div className="relative top-1">
                <Switch
                  onChange={() => handleRequiredChange(index, input.id)}
                />
              </div>
            </div>
          </div>
        );
      case "radio":
        const name = `radio-group-${index}`;
        return (
          <div key={input.id} className="my-6">
            <div className=" flex flex-col gap-4">
              {input.optionLabels.map((optionLabel, optionIndex) => (
                <label
                  key={`${input.id}-${optionIndex}`}
                  htmlFor={`${input.id}-option${optionIndex + 1}`}
                >
                  <input type="radio" name={name} />
                  <span
                    contentEditable="true"
                    onBlur={(e) =>
                      handleLabelChange(
                        index,
                        input.id,
                        e.target.textContent,
                        optionIndex
                      )
                    }
                    className="w-1/5 px-10 border-b-2 border-black outline-none"
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
                <Switch
                  onChange={() => handleRequiredChange(index, input.id)}
                />
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
    e.target.value = "";
  };

  const transitions = useTransition(inputSets, {
    keys: inputSets.map((_, index) => index),
    from: { opacity: 0, transform: "translateY(-20px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, transform: "translateY(-20px)" },
    config: { duration: 500 },
  });

  const containerRef = useRef(null);
  useEffect(() => {
   
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [inputSets]);

  const handleFormDescriptionChange = (e) => {
    setFormDescription(e.target.value);
    setFormDescription(e.target.value); 
  };
  return (
    <div
      ref={containerRef}
      className="bg-purple-200 w-full flex flex-col items-center h-screen overflow-y-scroll"
    >
      <div className="w-full flex justify-center ">
        <div className="relative right-5 my-5 w-1/2 shadow-lg h-auto py-5 rounded-md bg-white border-t-8 border-purple-600 border-l-4 border-l-blue-500">
          <input
            type="text"
            value={formName}
            onChange={handleFormNameChange}
            placeholder="Some Random Survey"
            className="text-xl w-11/12 mx-5 py-3 m-4 border-b-2 border-gray-500 placeholder-text-lg placeholder-gray-500 focus:outline-none"
          />

            <input
              type="text"
              value={formDescription}
              onChange={handleFormDescriptionChange}
              placeholder="Form Description"
              className="text-lg w-11/12 mx-5  py-2 m-1 mb-4  border-b-2 border-gray-400 placeholder-gray-500 focus:outline-none"
            />

        </div>
        <div className="fixed py-5  top-6  right-80 -mr-2 h-auto w-10 bg-white rounded-md gap-2 flex justify-center flex-col items-center">
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
      {transitions((style, inputSet, _, index) => {
        const isLatest = index === inputSets.length - 1;
        const borderClass = isLatest ? "border-blue-400" : "border-none";

        return (
          <animated.div
            style={style}
            key={index}
            className={`${borderClass}  w-[49.9%] flex flex-row-reverse h-auto rounded-md bg-white border-l-4 my-4 relative -left-5`}
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
            <div className="p-5 w-5/6">
              {inputSet.map((input) => renderInput(index, input))}
            </div>
          </animated.div>
        );
      })}

      {!loading && (
        <Button
          variant="contained"
          onClick={handleClick}
          className="relative -left-[19.378rem] "
          sx={{ mb: "2rem" }}
        >
          Submit
        </Button>
      )}
      {loading && (
        <LoadingButton
          className="relative -left-[19.378rem] "
          sx={{
            backgroundColor: "blue", 
            "&:hover": {
              backgroundColor: "darkblue", 
            },
            "& .MuiCircularProgress-root": {
              color: "blue", 
            },
          }}
          color="secondary"
          onClick={handleClick}
          loading={loading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          <span className="text-blue-600">Save</span>
        </LoadingButton>
      )}
    </div>
  );
};

export default InputForm;