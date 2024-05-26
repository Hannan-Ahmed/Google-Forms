import { useContext } from "react";
import { FormContext } from "../context/form-context";

const Success = () => {
  const { formname } = useContext(FormContext);

  return (
    <div className="w-full flex justify-center bg-purple-200 h-screen">
      <div className="relative my-5 w-1/2 shadow-lg h-fit rounded-md bg-white border-t-8 border-purple-600">
        <div className="text-3xl w-11/12 mx-5 py-3 m-4 mb-0">{formname}</div>
        <div className="text-lg w-11/12 mx-5 py-3 m-4 my-0">Your response has been recorded</div>
        <div className="text-lg w-11/12 mx-5 py-3 m-4 mt-0 underline text-blue-800">Submit another response </div>
      </div>
    </div>
  );
};

export default Success;
