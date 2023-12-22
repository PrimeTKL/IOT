/* eslint-disable react/prop-types */

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import LightOutSide from "./components/LightOutSide";
import {
  apiUrl,
  apiUrlOld,
  deviceId,
  token,
  variableId,
  variableId_temp,
} from "./constant/const";
import convertToBinary from "./util/Helper";
import LightInside from "./components/LightInside";
import Fan from "./components/Fan";

//lay data tu ubidots va tra ve nhi phan
async function getVariableData(variableId_param, binary) {
  try {
    const response = await axios.get(
      `${apiUrl}devices/${deviceId}/variables/${variableId_param}`,
      {
        headers: {
          "X-Auth-Token": token,
        },
      }
    );
    // console.log(response.data);
    const value = response.data.lastValue.value;
    if (binary) return convertToBinary(value);
    else return value;
  } catch (error) {
    console.log("Error fetching variable data from Ubidots:", error.message);
  }
}

async function updateVariableValue(newValue, message_on, message_off, on) {
  try {
    const response = await axios.post(
      `${apiUrlOld}variables/${variableId}/values`,
      {
        value: newValue,
      },
      {
        headers: {
          "X-Auth-Token": token,
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(response);
    console.log("============================================");
    console.log("newValue: ", newValue);
    console.log("============================================");
    // Xử lý dữ liệu trả về ở đây nếu cần
    // console.log("Data edited: ", response.data);

    if (on == 1) {
      toast.success(message_on, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.warning(message_off, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  } catch (error) {
    console.log("Error fetching variable data from Ubidots:", error.message);
  }
}

function App() {
  const [value, setValue] = useState("00000000"); //LIGHT: fan, inside, outsilde
  const [temp, setTemp] = useState("00"); //nhiet do
  //
  // const [continueGet, setContinueGet] = useState(true);
  const continueGet = useRef(true);

  const passValue = {
    value,
    temp,
    updateVariableValue,
    continueGet,
  };

  useEffect(() => {
    const getLoop = setInterval(() => {
      console.log("continueGet: ", continueGet);
      async function get() {
        //LIGHT: fan, inside, outsilde
        const value_response = await getVariableData(variableId, true);
        // console.log("value nhận về: ", value_response);
        setValue(value_response);
        //nhiet do
        const temp_response = await getVariableData(variableId_temp, false);
        setTemp(temp_response);
      }
      // get();
      // console.log(continueGet.current);
      if (continueGet.current) get();
    }, 500);
    // if (continueGet) getLoop();
    // else clearInterval(getLoop);
    return () => {
      clearInterval(getLoop);
    };
  }, []);

  return (
    <>
      <BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        {/* {continueGet == true ? "TRUE" : "FALSE"} */}
        <div className="min-w-[1050px] mx-auto flex justify-between items-center my-[50px]">
          <div className="flex gap-4 items-center">
            <img src="/logo.svg" alt="" />
            <span className="font-body text-2xl font-bold text-primary text-white lg:block select-none">
              GROUP 15 IOT
            </span>
          </div>
          <ul className="flex flex-row gap-4 items-center justify-center text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0 select-none">
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "inline-flex items-center px-4 py-3 rounded-lg  w-full bg-[#1d4ed8] text-white"
                    : "inline-flex items-center px-4 py-3 rounded-lg  w-full bg-gray-800 hover:bg-gray-700 hover:text-white"
                }
                to="/"
              >
                <svg
                  className="w-5 h-5 me-2 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 30 30"
                >
                  <path d="M 15 2 A 1 1 0 0 0 14.300781 2.2851562 L 3.3925781 11.207031 A 1 1 0 0 0 3.3554688 11.236328 L 3.3183594 11.267578 L 3.3183594 11.269531 A 1 1 0 0 0 3 12 A 1 1 0 0 0 4 13 L 5 13 L 5 24 C 5 25.105 5.895 26 7 26 L 23 26 C 24.105 26 25 25.105 25 24 L 25 13 L 26 13 A 1 1 0 0 0 27 12 A 1 1 0 0 0 26.681641 11.267578 L 26.666016 11.255859 A 1 1 0 0 0 26.597656 11.199219 L 25 9.8925781 L 25 6 C 25 5.448 24.552 5 24 5 L 23 5 C 22.448 5 22 5.448 22 6 L 22 7.4394531 L 15.677734 2.2675781 A 1 1 0 0 0 15 2 z M 18 15 L 22 15 L 22 23 L 18 23 L 18 15 z"></path>
                </svg>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/fan"
                className={({ isActive }) =>
                  isActive
                    ? "inline-flex items-center px-4 py-3 rounded-lg  w-full bg-[#1d4ed8] text-white"
                    : "inline-flex items-center px-4 py-3 rounded-lg  w-full bg-gray-800 hover:bg-gray-700 hover:text-white"
                }
                aria-current="page"
              >
                <svg
                  className="w-6 h-6 me-2 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect width="24" height="24" fill="none" />
                  <path d="M12,11a1,1,0,1,0,1,1,1,1,0,0,0-1-1m.5-9C17,2,17.1,5.57,14.73,6.75a3.36,3.36,0,0,0-1.62,2.47,3.17,3.17,0,0,1,1.23.91C18,8.13,22,8.92,22,12.5c0,4.5-3.58,4.6-4.75,2.23a3.44,3.44,0,0,0-2.5-1.62,3.24,3.24,0,0,1-.91,1.23c2,3.69,1.2,7.66-2.38,7.66C7,22,6.89,18.42,9.26,17.24a3.46,3.46,0,0,0,1.62-2.45,3,3,0,0,1-1.25-.92C5.94,15.85,2,15.07,2,11.5,2,7,5.54,6.89,6.72,9.26A3.39,3.39,0,0,0,9.2,10.87a2.91,2.91,0,0,1,.92-1.22C8.13,6,8.92,2,12.48,2Z" />
                </svg>
                Fan
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/light-inside"
                className={({ isActive }) =>
                  isActive
                    ? "inline-flex items-center px-4 py-3 rounded-lg  w-full bg-[#1d4ed8] text-white"
                    : "inline-flex items-center px-4 py-3 rounded-lg  w-full bg-gray-800 hover:bg-gray-700 hover:text-white"
                }
              >
                <svg
                  className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                Light Inside
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/light-outside"
                className={({ isActive }) =>
                  isActive
                    ? "inline-flex items-center px-4 py-3 rounded-lg  w-full bg-[#1d4ed8] text-white"
                    : "inline-flex items-center px-4 py-3 rounded-lg  w-full bg-gray-800 hover:bg-gray-700 hover:text-white"
                }
              >
                <svg
                  className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
                </svg>
                Light Outside
              </NavLink>
            </li>
          </ul>
        </div>
        {/*  */}
        <Routes>
          <Route path="/" element={<Home {...passValue} />}></Route>
          <Route path="/fan" element={<Fan {...passValue} />}></Route>
          <Route
            path="/light-inside"
            element={<LightInside {...passValue} />}
          ></Route>
          <Route
            path="/light-outside"
            element={<LightOutSide {...passValue} />}
          ></Route>
          {/* <div className="md:flex h-[600px]">
            <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full"></div>
          </div> */}
        </Routes>

        {/* {tab === "tab1" ? <Tab1 /> : tab === "tab2" ? <Tab2 /> : <Tab3 />} */}
      </BrowserRouter>
    </>
  );
}

export default App;
