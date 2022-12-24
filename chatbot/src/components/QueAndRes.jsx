import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import { Box, Button, useTheme } from "@mui/material";

import { useContext, useState } from "react";

import UserContext from "../context/UserContext";
import AddIcon from "@mui/icons-material/Add";
import API from "../axiosConfig";
import { Alert } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
function QueAndRes({ intentIdd, token }) {
  const theme = useTheme();
  const [errorMessage, setErrorMessage] = useState(null);

  const [questions, setQuestions] = useState([]);
  const [intentQuestion, setIntentQues] = useState([]);

  const [responses, setResponses] = useState([]);
  const [responseData, setResponseData] = useState([]);

  async function getQuesDatas() {
    const QuesRes = await API.get(`/intent/allQue/${intentIdd}`, {
      headers: { "x-auth-token": token },
    });
    setIntentQues(QuesRes.data);
    console.log(QuesRes.data);
  }

  async function getRespDatas() {
    const RespRes = await API.get(`/intent/allRes/${intentIdd}`, {
      headers: { "x-auth-token": token },
    });
    setResponseData(RespRes.data);
    console.log("//////////////////"+RespRes.data);
  }

  useEffect(
    (intentIdd) => {
      if (token) {
        getQuesDatas();
        getRespDatas();
      } else {
        setIntentQues([]);
        setResponseData([]);
      }
    },
    [intentIdd]
  );

  async function addQuestion(e) {

    e.preventDefault();

    const queData = {
      quest: questions,
    };

    try {
      const Response = await API.post(
        `/intent/addQuestions/${intentIdd}`,
        queData,
        {
          headers: { "x-auth-token": token },
        }
      );
      console.log("intentid++++++++++" + intentIdd);

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

    getQuesDatas();
  }

  async function addResponse(e) {
    e.preventDefault();

    const resData = {
      responses: responses,
    };

    try {
      const Response = await API.post(
        `/intent/addResponses/${intentIdd}`,
        resData,
        {
          headers: { "x-auth-token": token },
        }
      );
   
      
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


  return (
    <>
      <Box
        component="form"
        onSubmit={addQuestion}
        m="5px"
        sx={{ minWidth: "30%" }}
      >
       
        <Accordion defaultExpanded>
          <TextField
            sx={{ padding: "12px" }}
            margin="normal"
            required
            fullWidth
            id="questions"
            label="Add a training phrase"
            name="questions"
            autoFocus
            value={questions}
            onChange={(e) => setQuestions(e.target.value)}
          />
          <Button variant="text" type="submit">
            {" "}
            <AddIcon />
          </Button>

          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {" "}
            <Typography color={theme.palette.grey[500]} variant="h5">
              Training Phrases
            </Typography>
          </AccordionSummary>
         
            {intentQuestion.map((data, i) => (
             <AccordionDetails>
                <Typography key={i}>
                  {i}.&nbsp;{data.quest}
                </Typography>
                <br />
             </AccordionDetails>
            ))}
          
        </Accordion>
      </Box>
      <Box
        m="5px"
        component="form"
        onSubmit={addResponse}
        sx={{ minWidth: "30%" }}
      >
        <Accordion defaultExpanded>
          <TextField
            sx={{ padding: "12px" }}
            margin="normal"
            required
            fullWidth
            id="responses"
            label="Responses"
            name="responses"
            autoFocus
            value={responses}
            onChange={(e) => setResponses(e.target.value)}
          />
          <Button variant="text" type="submit">
            {" "}
            <AddIcon />
          </Button>

          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={theme.palette.grey[500]} variant="h5">
              Responses
            </Typography>
          </AccordionSummary>
          {responseData.map((data, i) => (
            <AccordionDetails key={i}>
              <Typography >
                {i}.&nbsp;{data.responses}
              </Typography>
            </AccordionDetails>
          ))}
      
        </Accordion>
      </Box>
    </>
  );
}

export default QueAndRes;
