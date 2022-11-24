import React, { useState, useEffect } from "react";
import Card from "./Card";
import Header from "./Header";
import Search from "./Search";

function App() {
  const[total,setTotal]=useState(0);

  const[items,setItems]=useState([]);
 
  const[keyword,setKeyword]=useState("");
  function addKeyword(text){
    setKeyword(text)
  }
  function addItems() {
    let index = 0
    do {
      index = Math.floor(Math.random() * 800)
    } while (items.map(item => item.id).includes(index))
    
    fetch("https://pokeapi.co/api/v2/pokemon/" + index)
      .then(res => res.json())
      .then(data => setItems([...items, data]))
      .catch(error => console.error(error));
  }

  function deleteItems(id){
    setItems((prevValue)=>{
      return(prevValue.filter((item)=>{
        return(item.id!==id)
      }))
    })
  }

  useEffect(() => {
    let randomize = Math.floor(Math.random() * 100)
    fetch("https://pokeapi.co/api/v2/pokemon/?offset=" + randomize)
        .then(res => res.json())
        .then(data => {
          for(let i = 0; i < 12; i++){
            fetch(data.results[i].url)
            .then(ress => ress.json())
            .then(dataa => {
              setItems((prevEvents) => [...prevEvents, dataa])
            })
          }
          setTotal(data.count);
        })
        .catch(error => console.error(error));
}, []);

  return (
    <div className="container">
        <Header title="Pokemon" />
          <h2>Characters</h2>
          <Search onSetKey={addKeyword} />
          <button onClick={()=>{addItems()}}>Add Card</button>
          <div className="row">
            {items.filter(i=>!keyword || i.name.toLowerCase().indexOf(keyword.toLowerCase())>=0)
            .map((item)=>{
              let abilitiesString = "";
              for(let i = 0; i < item.abilities.length; i++){
                abilitiesString += item.abilities[i].ability.name.charAt(0).toUpperCase() + item.abilities[i].ability.name.slice(1) + ", ";
                abilitiesString = abilitiesString.replace("-", " ");
              }
              return(
                <Card
                  key={item.id.toString()}
                  id={item.id}
                  name={item.name}
                  img={item.sprites.front_default}
                  abilities={abilitiesString}
                  onDelete={deleteItems}
                />
              )
            })}
            </div>
    </div>
  );
}
export default App;
