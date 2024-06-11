"use client";
import Admin from "../page";
import React, { useRef, useState } from "react";
import classes from "./addcourse.module.css";
import Button from "../../../Elements/Button";
import Form from "../../../Elements/Form";
import { addData } from "@/app/Firebase";

function AddCourse() {
  
  const coursenameRef = useRef(null);
  const startdateRef = useRef(null);
  const enddateRef = useRef(null);
  const slotlengthRef = useRef(null);
  const slotsperweekRef = useRef(null);
 
  const [coursename, setCoursename] = useState("");
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [slotlength, setSlotlength] = useState("");
  const [slotsperweek, setSlotsperweek] = useState("");

  const addCourseHandlerFS = async () =>{
    let course = {
      coursename: coursename,
      startdate: startdate,
      enddate: enddate,
      slotlength: slotlength,
      slotsperweek: slotsperweek,
    };
    addData(course,"course/",course.coursename)
  }
  
  const addCourseHandlerRtdb = async () => {
  
  // Check if slotlength and slotsperweek are not negative
  if (slotlength < 0 || slotsperweek < 0) {
    window.alert("Slot length and Slots per week cannot be negative.");
    return;
  }
   
    let course = {
      coursename: coursename,
      startdate: startdate,
      enddate: enddate,
      slotlength: slotlength,
      slotsperweek: slotsperweek,
    };

    fetch(
      "https://slotbooking-5baa4-default-rtdb.firebaseio.com/courses.json",
      {
        method: "POST",
        body: JSON.stringify(course),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => {
      window.alert("Form Submitted Successfully");
      window.location.href = '/components/Pages/Home';
    })
  };

  return (
    <div>
      <Admin />
      <div>
        <form id="course" className={classes.form}>
          <h3>ADD COURSE</h3>
          <Form
            formName="Course "
            type="text"
            inputRef={coursenameRef}
            value={coursename}
            setValue={()=>{
              console.log(coursename)
            setCoursename(coursenameRef.current.value)}}
          />
          <Form
            formName="Start Date"
            type="date"
            inputRef={startdateRef}
            value={startdate}
            setValue={setStartdate}
          />
          <Form
            formName="End Date"
            type="date"
            inputRef={enddateRef}
            value={enddate}
            setValue={setEnddate}
          />
          <Form
            formName="Slot length"
            type="number"
            inputRef={slotlengthRef}
            value={slotlength}
            setValue={setSlotlength}
          />
          <Form
            formName="Slots per Week"
            type="number"
            inputRef={slotsperweekRef}
            value={slotsperweek}
            setValue={setSlotsperweek}
          />
          <div onClick={addCourseHandlerFS} className={classes.buttons}>
            {Button("SUBMIT", "")}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCourse;
