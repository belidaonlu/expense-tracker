import React from "react";
import { useContext } from "react"
import GeneralContext from "../../context/GeneralContext.jsx"
import "./ListItem.css"

function ListItem() {
  const { spend } = useContext(GeneralContext);
    // burada props olarak ust componentten(HarcaListe) item gelmeli ki li icindeki ilgili yerlerde item'i kullanabilsin:
  return (
    <div>
        {spend.map((item) => (
          <li className="list" key={item.id}> 
            {item.name}: {item.amount} $
          </li>
        ))}
    </div>
  )
}

export default ListItem