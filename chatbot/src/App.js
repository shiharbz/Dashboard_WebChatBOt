import Login from './pages/Login';
import { Routes, Route } from "react-router-dom";
import SignUp from './pages/SignUp';
import {  ThemeProvider } from "@material-ui/core";
import UserDashboard from './pages/UserDashboard';
import { Box, Container } from '@mui/system';
import CssBaseline from "@mui/material/CssBaseline";

import theme from './theme'
import { GlobalStyles } from '@mui/material';


function App() {

  return (
    <div>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </div>
  );
}

export default App;
