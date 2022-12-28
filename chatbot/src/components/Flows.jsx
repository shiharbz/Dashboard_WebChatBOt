import react, { useState, useEffect, useContext } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import API from "../axiosConfig";
import UserContext from "../context/UserContext";
import { Typography } from "@mui/material";

const Flows = () => {
  const [storyArray, setStoryArray] = useState([]);
  const [count, setCount] = useState(0);
  const [story, setStory] = useState([]);
  const { userData } = useContext(UserContext);
  const token = userData.token;
  const user = userData.user;
  const [intentDatas, setIntentDatas] = useState([]);

  console.log(userData);
  console.log(token);
  async function getCount() {
    const CountRes = await API.get("/stories/getIntentCount", {
      headers: { "x-auth-token": token },
    });
    setCount(CountRes.data);
  }
  async function getIntentDatas() {
    const intentsRes = await API.get("/intent/all", {
      headers: { "x-auth-token": token },
    });
    setIntentDatas(intentsRes.data);
  }
  useEffect(() => {
    if (token) {
      getCount();
      getIntentDatas();
    } else {
      setCount(0);
    }
  }, [user]);
  async function handleChange(e, i) {
    console.log(e.target.value, i);
    let newArr = [...storyArray];
    let item = newArr[i];
    item = { ...item, [e.target.name]: e.target.value };
    newArr[i] = item;

    setStoryArray(newArr);
  }

  return (
    <>
      <Typography variant="h2" component="h2" color="#0e0e0e">
        Create your Story
      </Typography>
      {/* {Array.from(Array(count), (e, i) => { */}
      {/* return ( */}
      {/* <> */}
        {" "}
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <strong>Connect From #1</strong>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={story[1]}
            onChange={setStory[1]}
            key={1}
            label="story"
          >
            
            {intentDatas.map((int, i) => (
              <MenuItem key={int._id} value={int._id}>
                {int.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <strong>Connect To #2</strong>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={story[2]}
            onChange={setStory[2]}
            key={2}
            label="story"
          >
          
          
            {intentDatas.map((int, i) => (
              <MenuItem key={int._id} value={int._id}>
                {int.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      {/* </> */}
      {/* ); */}
      {/* })} */}
     </>
  )
};

export default Flows;
