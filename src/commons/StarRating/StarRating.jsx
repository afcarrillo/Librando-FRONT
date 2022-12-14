import React, { useState } from 'react'
import "./StarRating.css"
import {FaStar} from "react-icons/fa"







const StarRating = ({count, value, edit, newRating}) => {
  const [hover,setHover]= useState ()
  const [click,setClick]= useState ()
  const [val,setVal]= useState ()


// //Para que arranque mostrando algunas estrellas
//   useEffect (()=>{
//     setVal (value)
//     setClick (value)
//   },[value])




  const handleHover = (rate) =>{
    if (edit){
    setHover (rate);
    setVal (0)}
  }

  const handleClick = (rate) =>{
    if (edit){
    setVal (rate)
    setClick (rate)}
  }
  
  const handleUnHover = () =>{
    if (edit){
    setHover (0);
    setVal (click)}
  }

  return (
    <div>
      
      {new Array (count).fill (undefined).map((element,idx)=>(
      <FaStar key={idx}
      onMouseEnter={()=>{handleHover (idx +1)}}
      onMouseLeave={()=>{handleUnHover()}}
      onClick={()=>{
        handleClick (idx +1);
        edit && newRating (idx + 1);
      }}
      className={
        idx+1 <= hover || idx +1 <= val 
        ? edit 
           ? "yellow pointer"
           : "yellow"
        : edit 
           ? "star pointer"
           : "star"
      
      }
      />
      ))}
    </div>
  );
}

export default StarRating