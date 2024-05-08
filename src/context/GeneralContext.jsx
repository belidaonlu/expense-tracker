import { createContext, useState } from "react";

const GeneralContext = createContext();

export default GeneralContext;

export function GeneralProvider({ children }){

    const [userName, setUserName] = useState("");

    const [spend, setSpend] = useState([
        {id: 1, name: "Flower", amount: 100},
        {id: 2, name: "Book", amount: 200},
        {id: 3, name: "Pencil", amount: 20},
        {id: 4, name: "Tablet", amount: 500},
    ]);

    const data = {spend, setSpend, userName, setUserName }
    // data olusturup generalcontextprovider icine value olarak gonderdik.Bunun icine datayla gonderdigimiz her seye tum aplikasyonda erisebiliriz artik.
    return <GeneralContext.Provider value={data}>
        {children}
    </GeneralContext.Provider>
}