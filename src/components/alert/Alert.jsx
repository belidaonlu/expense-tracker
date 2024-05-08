import { useEffect } from "react";
import "./Alert.css";

function Alert({ color, message }) {

  // alert ekrana ciktiginda mount olacak, ekrandan kalktiginda unmount olacak:
  useEffect(()=>{
    console.log("Alert Component div mount");
    return () => {
      console.log("Alert Component will unmount");
    }
  }, [])

  return (
    <p className={ color === "red" ? "red" : "green"}> {message} </p>
  )
}

export default Alert