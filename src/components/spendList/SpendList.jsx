import Parag from '../parag/Parag'
import ListItem from '../listItem/ListItem'

//  map yaparken key vermek zorundayiz react'te, key uniq herhangi bir deger olabilir, burada key'i id yaptik. context oncesinde item'i da alt componentte props olarak yakalayabilsin diye buraya parametre olarak ekledik: 
function SpendList() {
  return (
    <div>
      <Parag title={"Your list:"} />
      <ul>
        {/* {harcaListe.map((item) => (
          <ListItem key={item.id} item={item} />
        ))} */}
        {/* context api oncesi */}
        {/* <ListItem harcaListe={harcaListe} /> */}
        <ListItem />
      </ul>
    </div>
  )
}

export default SpendList