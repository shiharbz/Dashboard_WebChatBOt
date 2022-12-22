import { Box, Button, Checkbox, useTheme } from "@mui/material";
// import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { useContext, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import UserContext from "../context/UserContext";

const drawerWidth = 100;

const FAQ = () => {
  const theme = useTheme();
  const { userData, setUserData } = useContext(UserContext);
    const [errorMessage, setErrorMessage] = useState(null);


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
          <TextField
            margin="normal"
            required
            fullWidth
            id="intent"
            label="Add an intent"
            name="intent"
            autoFocus
          />

          <Divider />
          <ListItem disablePadding sx={{ display: "block", padding: "4px" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                px: 2.5,
              }}
            >
              <ListItemText primary="Default message" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block", padding: "4px" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                px: 2.5,
              }}
            >
              <ListItemText primary="Welcome message" />
            </ListItemButton>
          </ListItem>
        </Box>

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
      </Box>
      <Button variant="contained">
        <SaveIcon />
        Save
      </Button>
    </>
  );
};

export default FAQ;
