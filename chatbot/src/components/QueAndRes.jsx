import React from 'react'
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
function QueAndRes() {

  const theme = useTheme();

  return (
      <>
          <Box m="10px" w="45%">
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
            />
            <Button variant="text">
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
              <Typography>
                1.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
              <Typography>
                2.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>{" "}
              <Typography>
                3,Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box m="10px" w="45%">
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
                1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                eget.
              </Typography>
              <Typography>
                2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                eget.
              </Typography>
              <Typography>
                3. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
       
      </ >
  )
}

export default QueAndRes