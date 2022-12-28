import {
  AccordionSummary,
  Box,
  Button,
  Typography,
  useTheme,
} from "@mui/material";
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
  const [intentIdd, setIntentId] = useState("");
  const [form, setForm] = useState(false);

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
  async function handleAddQues(intentId) {
    console.log("**************", intentId);
    setIntentId(intentId);
    console.log(intentIdd);
    setForm(true);
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
      <Typography variant="h1" component="h2" color="#0e0e0e">
        FAQ
      </Typography>
      <Box sx={{ display: "flex", margin: 0, padding: 0 }}>
        <Box
          m="5px"
          sx={{
            marginLeft: "-90px",
            p: 4,
            border: "1px grey",

            color: "#228096",

            minWidth: "20%",
            alignContent: "center",
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
              sx={{ background: "#FFF" }}
              autoFocus
            />
            <Button variant="text" type="submit">
              <AddIcon />
            </Button>
          </Box>
          <Divider color="#ffcc4f" />
          <AccordionSummary>
            {" "}
            <Typography variant="h5" color="#f37164">
              Intent
            </Typography>
          </AccordionSummary>
          {intentDatas.map((data, i) => (
            <ListItem
              key={data._id}
              disablePadding
              sx={{
                display: "block",
                padding: "4px",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  alignItems: "center",
                  alignContent: "center",
                  // px: 2.5,
                }}
                type="submit"
                onClick={() => handleAddQues(data._id)}
              >
                <ListItemText
                  primary={data.title}
                  sx={{
                    "&:hover": {
                      color: "#ffcc4f",
                    },
                  }}
                />{" "}
              </ListItemButton>{" "}
            </ListItem>
          ))}
        </Box>
        {form &&(<QueAndRes intentIdd={intentIdd} token={token} />)}
      </Box>
    </>
  );
};

export default FAQ;
