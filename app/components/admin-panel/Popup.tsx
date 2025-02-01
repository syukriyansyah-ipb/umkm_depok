import React, { Dispatch, SetStateAction, useState, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IoIosCloseCircleOutline } from "react-icons/io";
import axios from "axios"; 
import { setLoading } from "@/redux/features/loadingSlice"; 
import { makeToast } from "@/utils/helper"; 

interface PropsType {
  setOpenPopup: Dispatch<SetStateAction<boolean>>;
  setUpdateTable: Dispatch<SetStateAction<boolean>>;
}

const Popup = ({ setOpenPopup, setUpdateTable }: PropsType) => {
  const productData = useAppSelector((state) => state.product);

  const initialInputData = {
    name: productData?.name || "",
    category: productData?.category || "",
    price: productData?.price || 0,
  };

  const [inputData, setInputData] = useState(initialInputData);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!inputData.name || !inputData.category || inputData.price <= 0) {
        console.error("Invalid input data:", inputData);
        alert("Please fill all fields correctly.");
        return;
    }

    if (!productData?._id) {
        console.error("Product data or ID is missing:", productData);
        alert("Product ID is missing.");
        return;
    }

    dispatch(setLoading(true));

    console.log("Submitting data:", inputData);
    console.log("Endpoint:", `/api/edit_product/${productData._id}`);

    axios
        .put(`/api/edit_product/${productData._id}`, inputData)
        .then((res) => {
            console.log("API Response:", res.data); 
            makeToast("Product updated successfully!"); 
            setUpdateTable((prevState) => !prevState); 
        })
        .catch((err) => {
            if (err.response) {
                console.error("API Error:", err.response.data);
                alert(`Error: ${err.response.data.message || "Failed to update product."}`);
            } else if (err.request) {
                console.error("No response from server:", err.request);
                alert("No response from the server. Please try again.");
            } else {
                console.error("Request setup error:", err.message);
                alert("An error occurred while setting up the request.");
            }
        })
        .finally(() => {
            dispatch(setLoading(false));
            setOpenPopup(false);
        });
};


  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[#00000070] grid place-items-center">
      <div className="bg-white w-[700px] py-8 rounded-lg text-center relative">
        <IoIosCloseCircleOutline
          className="absolute text-2xl right-0 top-0 m-4 cursor-pointer hover:text-red-600"
          onClick={() => setOpenPopup(false)}
        />

        <h2 className="text-2xl -mt-3">Edit Product</h2>

        <form
          className="mt-6 w-fit space-y-4 mx-auto"
          onSubmit={handleSubmit}
        >
          <input
            className="border block border-gray-500 outline-none px-4 py-2 rounded-lg w-fit"
            type="text"
            placeholder="Name"
            value={inputData.name}
            onChange={(e) =>
              setInputData({ ...inputData, name: e.target.value })
            }
            required
          />
          <input
            className="border block border-gray-500 outline-none px-4 py-2 rounded-lg w-fit"
            type="text"
            placeholder="Category"
            value={inputData.category}
            onChange={(e) =>
              setInputData({ ...inputData, category: e.target.value })
            }
            required
          />
          <input
            className="border block border-gray-500 outline-none px-4 py-2 rounded-lg w-fit"
            type="number" 
            placeholder="Price"
            value={inputData.price}
            onChange={(e) =>
              setInputData({
                ...inputData,
                price: parseFloat(e.target.value) || 0,
              })
            }
            required
          />
          <div className="flex justify-end">
            <button className="bg-accent block text-white px-8 py-2 rounded-lg self-center">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;
