"use client";
import Admin from "../page";
import classes from "../forms.module.css";
import Search from "../../../Elements/Search";
import Dropdown from "../../../Elements/Dropdown";
import Button from "../../../Elements/Button";
import Table from "@/app/components/Elements/Table";
import { getQuery } from "@/app/Firebase";
import { useEffect, useState } from "react";
function Bookings() {
  const Actions = ["delete", "change"];
  const arrRow = [["username", "coursename", "machinename"]];
  const arrCol = ["USER", "Course", "Machine"];
  let rows = [];
  const [arr,setarr] = useState([[]]);
  useEffect(()=>{
    getQuery("slots", "coursename", "!=", NaN).then((value) => {
      value.map((i) => {rows.push( [i.email,i.coursename,i.time,i.date]);});
      console.log(rows);
      setarr(rows)
    })},arr);
  // courses
  //   .map((i) => {
  //     arr.push(getData("course/" + i + "/booked_slots"));
  //     console.log(arr);
  //   })
  return (
    <div>
      <Admin />
      <div className={classes.forms}>
        <h1>Select booking to change</h1>
        {/* <input type="text" placeholder="Search" /> */}
        <br></br>
        {Search("", "Search")}

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {Dropdown(Actions, "Action")}
          {Button("Go", "")}
        </div>
        <br></br>

        {Table(arr, arrCol)
        }
        {/* <table>Table headers and rows go here</table> */}
      </div>
    </div>
  );
}

export default Bookings;
