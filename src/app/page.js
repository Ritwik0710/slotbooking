"use client"
import { getData } from './Firebase';
import Login from './Login/page'
import Button from './components/Elements/Button';
export default function Page() {
  
  return (
    <div>
      <Login/>
      <div onClick={() =>getData("course","AM_lab1",)}>
      {Button("get Data","")}
      </div>
      
    </div>
  );
}
