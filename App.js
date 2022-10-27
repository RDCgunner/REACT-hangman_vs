
import './App.css';
import { useState, useRef } from 'react';

function Buton (props) {
  return (
  <button>{props.guessed.includes(props.litera)? props.litera.toUpperCase():'*'}</button>
)
}

function Buton2(props){
  const [style2,changeStyle]= useState({color : "blue"})
  return <button style={style2} onClick={()=>{props.addLetter(props.lettr); changeStyle({color : "red"})}}>{props.lettr.toUpperCase()}</button>
}

function Keyboard (props) {

  const tastatura1 = ['q','w','e','r','t','y','u','i','o','p']
  const tastatura2 = ['a','s','d','f','g','h','j','k','l']
  const tastatura3 = ['z','x','c','v','b','n','m']
  const tries=useRef(10)
  const [lit,setLitera]=useState(0)
  const litereGhicite=useRef(0)

const addLetter =(litera) =>{

 tries.current=tries.current-1
 if (tries.current===0) {
  props.letsStart(4)
 }
 if (props.guessed.includes(litera)) {setLitera(!lit)}
 if (!props.guessed.includes(litera)) {
    props.guessed.push(litera)
     if (props.cuvant.includes(litera)) {
      litereGhicite.current=litereGhicite.current+1
      if (litereGhicite.current===Array.from(new Set(props.cuvant)).length) {
        props.letsStart(2)
        }
      setLitera(!lit)
      
    }
    if (!props.cuvant.includes(litera)) {setLitera(!lit)}
 }
}

if (props.start===0) return (<h1>Alege un cuvant</h1>)
if (props.start===1) return (
    <>
    <br/>
      {props.cuvant.split("").map((litera,index) => {return <Buton key={index} guessed={props.guessed} litera={litera}/>})}
    <br/>
    <br/>
    <br/>
    
    <br/>
    {tastatura1.map((litera1,index1)=>{return <Buton2 lettr={litera1} addLetter={addLetter}/>})}
    <br/>
    {tastatura2.map((litera2,index1)=>{return <Buton2 lettr={litera2} addLetter={addLetter}/>})}
    <br/>
    {tastatura3.map((litera3,index1)=>{return <Buton2 lettr={litera3} addLetter={addLetter}/>})}
    <br/>
    <h1>Incercari ramase {tries.current}</h1>
    </>
    )

if (props.start===2) return (
  <><h1>Ai castigat jocul</h1>
  <br/>
  <>Pentru a juca din nou apasa butonul de Start!</>
  </>)
if (props.start===3) return (<><h1>Nu ai castigat jocul :(</h1>
<br/>
<h1>Cuvantul era <u>{props.cuvant}</u></h1>
<>Pentru a juca din nou apasa butonul de Start!</>
</>)
if (props.start===4) return (<><>Ai folosit toate incercarile</>
<br/>
<>Poti incerca sa ghicesti direct cuvantul</>
<br/>
<>Pentru a juca din nou apasa butonul de Start!</>
</>)

}


function App() {
  const [cuvant, schimbaCuvant]= useState('');
  const [start,letsStart]=useState(0)
  const [cuvantGhicit,ghicesteCuvantul]=useState('')
  const guessed=[]
  
  const reseteazaJocul =()=>{
      letsStart(0)
      schimbaCuvant('')
      ghicesteCuvantul('')
  }

  const rezolvaPuzzle=(word) =>{
    if (word===cuvant) return <>{letsStart(2)}</>
    else return <>{letsStart(3)}</>
  }

  if (start===0) return(
    <>
    <input placeholder='Alege cuvantul' value={cuvant} onChange={(e)=> {schimbaCuvant(e.target.value)}} required/>
    <br/>
    <button onClick={()=>{letsStart(1)}}>Am ales!</button>
    <Keyboard guessed={guessed} letsStart={letsStart} className='Keyboard' cuvant={cuvant} start={start}/>
    <br/>
    </>
  )

  if (start===1 ) return (

    <>
    <Keyboard guessed={guessed} letsStart={letsStart} className='Keyboard' cuvant={cuvant} start={start}/>
    <br/>
    <input placeholder='Stii cuvantul? scrie aici' value={cuvantGhicit} onChange={(e)=>{ghicesteCuvantul(e.target.value)}}/>
    <br/>
    <button onClick={()=>rezolvaPuzzle(cuvantGhicit)}>Rezolva</button>
    <br/>
    <button onClick={()=>{reseteazaJocul()}}>Reporneste Jocul!</button>
    </>
  );
  if (start===2 || start===3 ) return (
    <>
    <Keyboard guessed={guessed} letsStart={letsStart} className='Keyboard' cuvant={cuvant} start={start}/>
    <br/>
    <button onClick={()=>{reseteazaJocul()}}>Reporneste Jocul!</button>
    </>
  )
  if (start===4 ) return (

    <>
    <Keyboard guessed={guessed} letsStart={letsStart} className='Keyboard' cuvant={cuvant} start={start}/>
    <br/>
    <input placeholder='Stii cuvantul? scrie aici' value={cuvantGhicit} onChange={(e)=>{ghicesteCuvantul(e.target.value)}}/>
    <br/>
    <button onClick={()=>rezolvaPuzzle(cuvantGhicit)}>Rezolva</button>
    <br/>
    <button onClick={()=>{reseteazaJocul()}}>Reporneste Jocul!</button>
    </>)
}


export default App;
