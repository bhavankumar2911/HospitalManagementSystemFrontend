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
import { QueryClient, QueryClientProvider } from "react-query";
import Login from "./pages/auth/staff/login";
import AppContextProvider from "./context/AppContextProvider";
import ReceptionHome from "./pages/reception/home";
import DoctorAppointments from "./pages/doctor";

// axios config
axios.defaults.baseURL = Config.API_BASE_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";

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
    path: "/reception",
    element: <ReceptionHome />,
  },
  {
    path: "/doctor",
    element: <DoctorAppointments />,
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
]);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <RouterProvider router={router} />
      </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
