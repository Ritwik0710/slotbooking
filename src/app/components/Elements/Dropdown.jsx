'use client'
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select,{ SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
function Dropdown(array, placeholder, id,val) {
  
  const menuitems = [];
  array?.map((element) => {
    menuitems.push(<MenuItem key={element} value={element}>
      {element}
    </MenuItem>)})
  // const handleChange = (event) => {
  //   setval(event.target.value);
  // };
  return (
    <div >
    <FormControl fullWidth>
      <InputLabel >{placeholder}</InputLabel>
      <Select 
     style={{
      
      
       "width": "200px"
      // "height": "40px"
    }}
        labelId="demo-simple-select-label"
        id={id}
        value={val}
        label={placeholder}
        displayEmpty = {true}
        //onChange={handleChange}
        
      >
       {menuitems}
      </Select>
    </FormControl>
    </div>
  );
}

export default Dropdown;
