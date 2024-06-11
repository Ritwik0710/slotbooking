"use client";
import classes from "./dashboard.module.css";
import Layout from "../../Layout/Layout";
import Button from "../../Elements/Button";
import Dropdown from "../../Elements/Dropdown";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { useEffect, useState } from "react";
import {
  addAuto,
  addData,
  getData,
  getQuery,
  realtimeQuery,
  userDetails,
} from "@/app/Firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const generateSlots = (slotlength) => {
  let slotList = [];
  let startTime = new Date().setHours(10, 0, 0, 0); // Start time is 10:00 AM
  const endTime = new Date().setHours(18, 0, 0, 0); // End time is 6:00 PM
  const slotLengthInMilliseconds = slotlength * 60 * 60 * 1000; // Convert slot length from hours to milliseconds

  while (startTime + slotLengthInMilliseconds <= endTime) {
    const startTimeFormatted = new Date(startTime).toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    const endTimeFormatted = new Date(
      startTime + slotLengthInMilliseconds
    ).toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    slotList.push(`${startTimeFormatted} - ${endTimeFormatted}`);
    startTime += slotLengthInMilliseconds;
  }

  return slotList;
};

function Dashboard() {
  const [slots, setSlots] = useState([]);
  const today = dayjs();
  const [course, setCourse] = useState({ courseName: "", bool: true });
  const [day, setDay] = useState("");
  const [selectedslot, setbook] = useState({ slot: "", book: true });

  const [courses, setCourseList] = useState([]);
  useEffect(() => {
    getQuery("course", "coursename", "!=", NaN).then((value) => {
      setCourseList(value.map((i) => i.coursename));
    });
  },courses );
  let hmap = new Map();
  const [slotdata, setslotdata] = useState([]);
  let resetSlots = async (booked) => {
    setslotdata(booked);
    console.log(day);
    let available = [];
    await getData("course/" + course.courseName).then((value) => {
      let slotList = generateSlots(value.slotlength);
      slotList.map((i) => hmap.set(i, true));
      booked.map((i) => hmap.set(i, false));

      slotList.forEach((i) => {
        if (hmap.get(i) == true) available.push(i);
      });
      console.log(available);
      console.log(booked);
      setSlots(available);
    });
  };

  let unsubscribe;

  const onNextSlotResponse = (querySnapshot) => {
    const booked = [];
    querySnapshot.forEach((doc) => {
      booked.push(doc.data().time);
    });
    console.log(booked);
    resetSlots(booked);
  };

  useEffect(() => {
    if (!day) return;
    let path =
      // "course/" +
      // course.courseName +
      // "/booked_slots/" +
      // `${day.$D}${day.$M + 1}${day.$y}` +
      // "/" +
      "slots/";
    console.log("sub", path);
    unsubscribe?.();
    unsubscribe = realtimeQuery(
      path,
      "coursename",
      "==",
      course.courseName,
      "date",
      "==",
      `${day.$D}${day.$M + 1}${day.$y}`,
      onNextSlotResponse
    );
    return unsubscribe;
  }, [day]);
  let val = "";
  let onbook = () => {
    let userdetail = getAuth().currentUser;
    console.log(userdetail);
    let data = { Slot: selectedslot.slot, email: userdetail.email };
    let data1 = {
      coursename: course.courseName,
      date: `${day.$D}${day.$M + 1}${day.$y}`,
      email: userdetail.email,
      time: selectedslot.slot,
    };
    // let path =
    //   "course/" +
    //   course.courseName +
    //   "/booked_slots/" +
    //   `${day.$D}${day.$M + 1}${day.$y}` +
    //   "/" +
    //   "slots/";
    // console.log("booking", path);
    // addData(data, path, selectedslot.slot);
    addAuto(data1, "slots/", data1.email);
  };
  return (
    <Layout>
      <h1 className={classes.heading}>Remote Lab Booking</h1>
      <div className={classes.drop}>
        <div
          onClick={(event) => {
            console.log(event.target.childNodes[0].textContent);
            setCourse({
              courseName: event.target.childNodes[0].textContent,
              bool: false,
            });

            //get slots data from course
            //update slots array
          }}
        >
          {Dropdown(courses, "Select Course", "course", course.courseName)}
        </div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              sx={{ "& .MuiOutlinedInput-input": { padding: "16px " } }}
              label="Date"
              disabled={course.bool}
              defaultValue={today}
              minDate={today}
              maxDate={dayjs().add(7, "day")}
              value={day}
              onChange={(date) => setDay(date)}
            />
          </LocalizationProvider>
        </div>
        <div
          onClick={(event) => {
            setbook({
              slot: event.target.childNodes[0].textContent,
              book: false,
            });
          }}
        >
          {Dropdown(slots, "Select Slot", "slot", selectedslot.slot)}
        </div>

        <div style={{ top: "10px", position: "relative" }}>
          {Button("Book Slot", " ", selectedslot.book, onbook)}
        </div>
      </div>
      <table style={{ top: "300px", left: "200px", position: "fixed" }}>
        {slotdata.map((i) => (
          <ul>
            {i.email}&emsp;&emsp;&emsp;&emsp;{i.Slot}
          </ul>
        ))}
      </table>

      <div></div>
    </Layout>
  );
}

export default Dashboard;
