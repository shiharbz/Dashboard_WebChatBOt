import Login from './pages/Login';
import { Routes, Route } from "react-router-dom";
import SignUp from './pages/SignUp';
import {  ThemeProvider } from "@material-ui/core";
import UserDashboard from './pages/UserDashboard';
import {  Container } from '@mui/system';
import CssBaseline from "@mui/material/CssBaseline";

import theme from './theme'
import { GlobalStyles } from '@mui/material';
import UserContext from "./context/UserContext";
import API from "./axiosConfig";

import { useEffect, useState } from 'react';
import axios from 'axios';
function App() {
    const [userData, setUserData] = useState({
      token: undefined,
      user: undefined
    });

    useEffect(() => {
      const checkLoggedIn = async () => {
        let token = localStorage.getItem("auth-token");
        if (token === null) {
          localStorage.setItem("auth-token", "");
          token = "";
        }
       const tokenResponse = await axios.post(
         "http://localhost:5000/authUser/tokenIsValid",
         null,
         { headers: { "x-auth-token": token } }
       );
       if (tokenResponse.data) {
         const userRes = await axios.get("http://localhost:5000/authUser/", {
           headers: { "x-auth-token": token },
         });
         setUserData({
           token,
           user: userRes.data,
         });
       }
      }

      checkLoggedIn();
    }, []);
  

  return (
    <div>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={{ userData, setUserData }}>
          <CssBaseline />
          <Container>
            <GlobalStyles
              styles={{
                body: {
                  background:
                    // "linear-gradient(to right,#0f2027,#203a43, #2c5364);",
                    "linear-gradient(to right,#8360c3,#2ebf91);",
                  width: "100%",
                  height: "100%",
                  margin: 0,
                  padding: 0,
                },
              }}
            />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/dashboard" element={<UserDashboard />} />
            </Routes>
          </Container>
        </UserContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
