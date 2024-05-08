import './App.css';
import { useContext, useState, useEffect } from 'react';
import SpendList from './components/spendList/SpendList';
import SpendAdd from './components/spendAdd/SpendAdd';
import Parag from './components/parag/Parag';
import GeneralContext from './context/GeneralContext';



function App() {
  // asagidaki liste ogelerini barindiran bir data olusturalim. array[] haline getirelim ki her bir liste ogesi item olarak map'lenebilsin:
  // const [harca, setHarca] = useState([
  //   {id: 1, name: "cicek", amount: 100},
  //   {id: 2, name: "kitap", amount: 200},
  //   {id: 3, name: "kalem", amount: 20},
  //   {id: 4, name: "tablet", amount: 500},
    // <li>Cicek: 100 tl</li>
    // <li>Kitap: 200 tl</li>
    // <li>Kalem: 20 tl</li>
  // ]);

    // HarcaEkle componenti ile ilgili tnaimlamalar:

  // const [harcaName, setHarcaName] = useState("");
  // const [harcaTutar, setHarcaTutar] = useState("");

  // const handleNameChange = (e) => {
  //   const value = e.target.value;
  //   setHarcaName(value);
  // }
  // const handleAmountChange = (e) => {
  //   const value = e.target.value;
  //   setHarcaTutar(value);
  // }

  // const handleClick =() => {
  //   setHarcaName("");
  //   setHarcaTutar("");
  // }; 


  // burada harcayi HarcaListe'ye harcaListe adinda yukarda tanimlaigimiz harca'yi gonderiyoruz ki orada yakalayalim-context api sonrasi gerek kalmadi 

  // harca array'ini mapledik, cunku tek tek itemlari degil de map'in return'unde ortaya cikacak olan array'in butununu kullanacagiz-bu artik kendi componenti icinde:
  // {harca.map((item) => (
  //   <li key={item.id}>
  //     {item.name}: {item.amount} tl
  //   </li>
  // ))} 

  
  // const [tutar, setTutar] = useState(320);
  const { spend, userName, setUserName } = useContext(GeneralContext);
  const [userInput, setUserInput] = useState("");
  // harcanan degiseni takip ettigimiz icin (degisen degiskeni takip etmedik) useState kullanmadik:
  let price = 0;
  // her bir item'ini integer'a cevir ve toplayarak git
  spend.forEach((item) => {
    price += parseInt(item.amount);
  });

  const handleUserNameUpdate = () => {
    // user'dan gelen name'i userInput icine atiyoruz:
    setUserName(userInput);
    // setUserName(userInput) callback function'i sonuclanmadan asagidaki yapilmayacagi icin, prev state'ini aldik.
    window.localStorage.setItem("userName", userInput);
    // localstorage'dan getitem yapmak icin useEffect kullaniyoruz.
  };

  //useEffect oldugunda su fonksiyonu calistir, mount
  //useEffect kullanimi=setTimeOut'a benzer ( () => {}, [] )
  //eger [] kismi bossa, dokuman yalnizca mount oldugunda 1 kere calisir (cagirildiginda). ama [] doluysa, setUserName calistiginda calisir. sectigin degisken onemli yoksa kisir bir donguye sokabilir! yani icinde bir state varsa, state degistikce calisir.
  // 2 tane parametre alir, biri fonksiyon digeri []
  //ilk fonksiyon icinde return varsa, buradaki return; component unmount oldugunda calisir!amaci: component ekrandan ciktiginda(unmount oldugunda) return calistiginda, icindeki fonksiyon calisir!
  // 1-component mount oldugunda, 2-state degistiginda, 3-component unmount oldugunda olmak uzere 3sekilde calisir useEffect
  useEffect(() => {
    // calistiginda git localstorage'dan userName'i bul
    const userName = window.localStorage.getItem("userName");
    // eger userName varsa, setUserName'e yaz:
    if (userName) {
      setUserName(userName);
    }
    //asagidaki state degistiginde useEffect calisiyor, ve component unmount oldugunda return icine yazdigimiz fonksiyon calisir.
    // return () => {
    //   console.log("componentWillUnmount")
    // }

  }, []);

  const handleDeleteUser = () => {
    setUserName("");
    window.localStorage.removeItem("userName");
  };

  if (userName === "") {
    return (
      <div>
        <h1>Please enter your username</h1>
        <input 
          type='text' 
          placeholder='Enter your name.' 
          // target'in value'sunu alip userName'e gonderdik
          onChange={(e) => setUserInput(e.target.value)} 
          value={userInput}
        />
        <button onClick={handleUserNameUpdate}>
          Login
        </button>
      </div>
    );
  }

  return (
    <>
      <h1 style={{color:"tomato"}}>Hello {userName} </h1>
      <Parag title="Welcome to React Expense Tracking Application." />

      <h3>Total Price: {price} $ </h3>

      <SpendList />

      <SpendAdd  />

      <button onClick={handleDeleteUser}>
        Delete user.
      </button>
    </>
  )
}

export default App;
