import React from 'react'
import Data from "./components/data"
import axios from "axios"
import { useState, useEffect } from "react";
function App() {
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
            <h2 >{item.Company}</h2> <hr />
            <h2>{item.model}</h2>
            <h2>{item.year}</h2>
          </div>
        )
      })}</div>
    </>

  )
}

export default App