import React from 'react'
import axios from "axios"
import { useState, useEffect } from "react";

function Data() {
  const [data, setData] = useState();
  useEffect(()=>{
    axios.get('http://localhost:3005/carsname')
    .then(res => {setData(res.data)})
    .catch((err)=>console.log("Error in fetching data"))
    },[])
  
  return (
    <>
      <div>{data && data.map((item)=>{
        return(
          <div key={item._id}>
            <h2 >company :{item.Company}</h2>
            <h2> model:{item.model}</h2>
            <h2>year:{item.year}</h2>
          </div>
        )
      })}</div>
    </>

  )
}

export default Data;
