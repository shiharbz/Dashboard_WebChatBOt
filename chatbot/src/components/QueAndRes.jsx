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
function QueAndRes({intentIdd,token}) {
  const theme = useTheme();
  const [errorMessage, setErrorMessage] = useState(null);

  const [questions, setQuestions] = useState([]);
  const [intentQuestion, setIntentQues] = useState([]);

  const [responses, setResponses] = useState([]);

    
     async function getQuesDatas() {
       const QuesRes = await API.get(`/intent/allQue/${intentIdd}`, {
         headers: { "x-auth-token": token },
       });
       setIntentQues(QuesRes.data);
       console.log(QuesRes.data);
     }
     useEffect(
       (intentIdd) => {
         if (token) {
           getQuesDatas();
         } else {
           setIntentQues([]);
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
        queData,{
         headers: { "x-auth-token": token },
       });
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

  return (
    <>
      <Box
        component="form"
        onSubmit={addQuestion}
        m="5px"
        sx={{ minWidth: "30%" }}
      >
        {/* <Header title="FAQ" subtitle="Frequently Asked Questions Page" /> */}

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
          <AccordionDetails>
            {intentQuestion.map((data, i) => (<>
              <Typography key={i}>
                {i}.&nbsp;{data.quest}  
              
              </Typography><br/></>
        
            ))}
            
            
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box m="5px" sx={{ minWidth: "30%" }}>
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
          <Button variant="text">
            {" "}
            <AddIcon />
          </Button>

          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={theme.palette.grey[500]} variant="h5">
              Responses
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
}

export default QueAndRes;
