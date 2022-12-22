import { Box, Button, useTheme } from "@mui/material";
// import Header from "../../components/Header";

import TextField from "@mui/material/TextField";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { useContext, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import UserContext from "../context/UserContext";
import AddIcon from "@mui/icons-material/Add";
import API from "../axiosConfig";
import { Alert } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import QueAndRes from "./QueAndRes";

const drawerWidth = 100;

const FAQ = () => {
  const theme = useTheme();
  const { userData } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [intent, setIntent] = useState("");
  const [intentDatas, setIntentDatas] = useState([]);
  const user = userData.user;
  const token = userData.token;
  async function addIntent(e) {
    e.preventDefault();
    const intentData = {
      title: intent,
    };

    try {
      const Response = await API.post(
        `/intent/addTitle/${userData.user.id}`,
        intentData
      );

      localStorage.getItem("auth-token", Response.data.token);
    } catch (err) {
      if (err.response) {
        if (err.response.data.errorMessage) {
          setErrorMessage(err.response.data.errorMessage);
        }
      }
      return;
    }
    alert("added successfully");
    window.location.reload(false);
  }
  async function getIntentDatas() {
    const intentsRes = await API.get("/intent/all", {
      headers: { "x-auth-token": token },
    });
    setIntentDatas(intentsRes.data);
  }
  useEffect(() => {
    if (token) {
      getIntentDatas();
    } else {
      setIntentDatas([]);
    }
  }, [user]);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box
          m="10px"
          w="30%"
          sx={{
            marginLeft: "-40px",
            p: 4,
            border: "1px grey",
            background: "#FFF",
          }}
        >
          {" "}
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <Box component="form" onSubmit={addIntent} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="intent"
              label="Add an intent"
              name="intent"
              value={intent}
              onChange={(e) => setIntent(e.target.value)}
              autoFocus
            />
            <Button variant="text" type="submit">
              <AddIcon />
            </Button>
          </Box>
          <Divider />
          <ListItem disablePadding sx={{ display: "block", padding: "4px" }}>
            {intentDatas.map((data, i) => (
              <ListItemButton
                sx={{
                  minHeight: 48,
                  px: 2.5,
                }}
              >
                <ListItemText primary={data.title} />{" "}
              </ListItemButton>
            ))}
          </ListItem>
        </Box>
        <QueAndRes/>
      </Box>
      {/* <Button variant="contained">
        <SaveIcon />
        Save
      </Button> */}
    </>
  );
};

export default FAQ;
