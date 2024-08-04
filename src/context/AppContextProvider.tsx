import axios from "axios";
import { createContext, ReactNode, useContext, useState } from "react";
import { useQuery } from "react-query";

const AppContext = createContext<{
  isAuthenticated: boolean;
  id: string;
  role: string;
  authenticatingUser: boolean;
}>({
  isAuthenticated: false,
  id: "",
  role: "",
  authenticatingUser: true,
});

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState({
    isAuthenticated: false,
    id: "",
    role: "",
  });

  const authorizeUser = async () => {
    const response = await axios.get("/authenticate", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data.data;
  };

  const { isLoading: authenticatingUser } = useQuery(
    "authQuery",
    authorizeUser,
    {
      onSuccess: (data) => {
        setUserInfo({
          ...userInfo,
          id: data.id,
          role: data.role,
          isAuthenticated: true,
        });
      },
      onError: () => {
        setUserInfo({ ...userInfo, isAuthenticated: false, role: "", id: "" });
      },
    }
  );

  return (
    <AppContext.Provider value={{ ...userInfo, authenticatingUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppContextProvider;
