import { useState, useContext }  from 'react';
import GeneralContext from "../../context/GeneralContext";
import Parag from '../parag/Parag';
import Alert from '../alert/Alert';

// 1.INPUTA GIRILEN VERIYI APLIKASYONUMUZA TASIDIK - onchange ile) ve <Parag title={harcaName} /> burada gosterdik : event'i alacak bunku target'da bi sey degistiginde onun value'sunu almali:yani oraya bir sey girildiginde girilen degeri almak istiyoruz. // inputa girilen degeri value diye olustur, sonra bu yeni degeri value degiskenine setle/degistir. yani baslangicta harcaName diye yazdigimiz seyi, artik value'ya setleyecek.


  // handleClick calistiginda, setHarcaName ve setHarcaTutar bos hale gelsin: bir onceki 3 elemanli array'i oldugu gibi al ...prev ile, sonra yeni eleman ekle bu arraya, son hali olarak eleman eklenmis array'i set ediyoruz:

  // kullanici dostu haline getirmek icin icindeki bilgiyi bosalt:

  //   yukardaki bilgiyi alabilmek icin input ekliyoruz:
    // onchange: // 1-BURASI KULLANICIDAN GELENI APLIKASYONA TASIYOR: degisen seyi takip etmek icin onChange kullaniriz - onchange oldugunda, handlenamechange fonksiyonunu calistirsin:
    // value: // 2.APLIKASYON TARAFINDAN INPUTU DEGISTIRMEK-!CONTROLLER INPUT: yukarda kullanicidan gelen veriyi setleyerek kendimize almistik ama buraya da gondermek icin esitlememiz lazim:

function SpendAdd() {
  const { spend, setSpend } = useContext(GeneralContext);

  // const [harcaName, setHarcaName] = useState("");
  // const [harcaAmount, setHarcaAmount] = useState("");
  //burada key-value iliskisini koyduk ki asagida input'ta kullanacagiz!
  const [expense, setExpense] = useState({
    name: "",
    amount:""
  });

  // baslangicta false
  const [alert, setAlert] = useState(0);

  let price = 0;
  spend.forEach((item) => {
    price += parseInt(item.amount)
  });


  // DEGISKENI CONTROLLER HALE GETIRMEK-input'u -obje icinde- bu sekilde yonetmek daha makuldur. tek bir fonksiyonda hepsini yonetmis olduk
  const handleOnChange = (e) => {
    const { name, value} = e.target;
    setExpense((prev) => ({
      ...prev,
      // burada name'i [] icinde kullanmazsak, js bunun yeni tanimlanan bir key oldugunu dusunur ve burada const icindeki name'i yakalayamaz.. oysa biz yukardaki useState'te tanimladik.
      [name]: value,
    }));
  }

  const handleClick = () => {
    // harcadigimiz toplam tutarla yeni girdigimiz tutarin toplami 1000 tl'yi asarsa alert gelsin: degilse fonksiyon calissin:
    if (price + parseInt(expense.amount) > 1000) {
      setAlert(1);
      // 3 sn sonra alerti false'a dondursun:
      setTimeout(() => {
        setAlert(0);}, 3000);
      return;
    } else {
      setAlert(2);
      setTimeout(() => {
        setAlert(0);
      }, 3000);
      setSpend((prev) => [
        ...prev, 
        {
            id: prev.length + 1,
            ...expense
            // name: harcama.name,
            // amount: harcama.amount,
        },
      ]);
    }

    setExpense({ name: "", amount:"" });

  }; 

  // 1000 tl olursa eklemesin, alert versin:
  return (
    <div>
        <hr style={{borderTop:"2px solid lightsalmon"}}/>
        {/* <Parag title="add expense" /> */}

        <input 
          type="text" 
          placeholder='expense name' 
          // yukarda tanimladigimiz key'leri burada name'in degeri olarak verdik:
          name= "name"

          // onchange'de harcamanin prev state'ini alip yeni bir array haline getiriyoruz ardindan name'i girilen value ile denkliyoruz
          // onChange={(e) => setHarcama(
          //   {
          //     ...harcama, 
          //     name: e.target.value
          //   }
          // )}
          onChange= {handleOnChange}
          value= {expense.name}
        />

        <input 
          type="number" 
          placeholder='spending amount' 
          // yukarda tanimladigimiz key'leri burada name'in degeri olarak verdik:
          name= "amount"
          // onChange={(e) => setHarcama({
          //   ...harcama,
          //   name: e.target.value
          // })}
          onChange={handleOnChange}
          value={expense.amount}
        />


        <button onClick={handleClick}>
          Add
        </button>

        <hr style={{borderTop:"2px solid lightsalmon"}}/>

        {/* yazim teknigi: alert && 0'dan farkli bir deger = bu teknikle, &&'nin alert varsa ve sagindaki deger true ise, sagdaki degeri return olarak verir, alert false olursa hicbir sey return etmez.!   */}
        {/* {alert && <p>Toplam harcama 1000 tl'yi asamaz</p> } */}
        {/* aslinda sununla ayni = {alert ? <p>Toplam harcama 1000 tl'yi asamaz</p> : null } */}
        {alert === 1 ? (
          <Alert color="red" message="Total expenditure cannot exceed 1000 TL!" />
        ) : alert ===2 ? (
          <Alert color="green" message="Added successfully." />
        ) : null}
      </div>
  )
}

export default SpendAdd;