import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Admin from "./pages/admin/index";
import axios from "axios";
import Config from "./config";
import Appointment from "./pages/reception/appointment";
import Patient from "./pages/reception/patient";
import PatientLogin from "./pages/patient";
import { QueryClient, QueryClientProvider } from "react-query";
import Login from "./pages/auth/staff/login";
import AppContextProvider from "./context/AppContextProvider";
import DoctorAppointments from "./pages/doctor";
import Prescribe from "./pages/doctor/prescribe";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import dayjs from "dayjs";
import { ConfigProvider } from "antd";

dayjs.extend(utc);
dayjs.extend(timezone);

// axios config
axios.defaults.baseURL = Config.API_BASE_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
  "token"
)}`;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/doctor",
    element: <DoctorAppointments />,
  },
  {
    path: "/patient",
    element: <PatientLogin />,
  },
  {
    path: "/reception/patient",
    element: <Patient />,
  },
  {
    path: "/reception/appointment",
    element: <Appointment />,
  },
  {
    path: "/auth/staff/login",
    element: <Login />,
  },
  {
    path: "/doctor/prescribe/:patientId/:appointmentId",
    element: <Prescribe />,
  },
]);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              darkItemSelectedBg: "#001529",
            },
          },
        }}
      >
        <AppContextProvider>
          <RouterProvider router={router} />
        </AppContextProvider>
      </ConfigProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
