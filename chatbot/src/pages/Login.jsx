import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate, useParams } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import theme from "../theme";
import API from "../axiosConfig";
import { Alert } from "@mui/material";
import UserContext from "../context/UserContext";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Login = () => {
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
    const { setUserData } = useContext(UserContext);


  async function handleSubmit(e) {
    e.preventDefault();
    const loginData = {
      email: formEmail,
      password: formPassword,
    };

    try {
      const loginResponse = await API.post("/authUser/login", loginData);
       setUserData({
         token: loginResponse.data.token,
         user: loginResponse.data.user,
       });
            localStorage.setItem("auth-token", loginResponse.data.token);

    } catch (err) {
      if (err.response) {
        if (err.response.data.errorMessage) {
          setErrorMessage(err.response.data.errorMessage);
        }
      }
      return;
    }
    alert("Login successful");
    navigate("/dashboard");
  }

  return (
    <>
      <Container
        component="main"
        maxWidth="xs"
        sx={{ color: theme.palette.primary.main }}
      >
        <Typography
          component="h1"
          variant="h2"
          sx={{
            display: "flex",
            justifyContent: "center",

            flexDirection: "row",

            mt: 4,
            mb: -4,
          }}
        >
        </Typography>

        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            // noValidate
            sx={{ mt: 1 }}
          >
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <TextField
              margin="normal"
              // required
              value={formEmail}
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e) => setFormEmail(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              // required
              fullWidth
              value={formPassword}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setFormPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  );
};

export default Login;
