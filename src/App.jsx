import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [range, setRange] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState('');
  // const [copied, SetCopied] = useState(false);
  const passref = useRef(null);
  
  const passwordGenrator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOQUVXYZabcdefghigklmnopuvwxyz";

    if(number){
      str  = str + '0123456789'
    }
    if(character){
      str = str + '!@#$%^&*()'
    }

    for (let i = 1; i <= range; i++) {
      let char = Math.floor(Math.random()*str.length + 1);
      pass = pass + str.charAt(char);
      
    }
    setPassword(pass)


  },[range,number, character, setPassword]);

  const clipboard = useCallback(()=>{
    passref.current?.select()
    window.navigator.clipboard.writeText(password);
  },[password]);

  useEffect(()=>{
    passwordGenrator();
  },[range, number, character, passwordGenrator])


  return (
    <>
    <div className="container h-screen flex items-center justify-center mx-auto">
      <div className="generator bg-teal-500 shadow  w-[90%] max-w-md p-3 rounded  text-center">
        <div className='flex items-center justify-center flex-col gap-1 py-5'>
          <h1 className='text-2xl text-white   mb-5'>Password Generator</h1>
          <input type="text" value={password} readOnly className='w-full p-1 rounded mx-auto' ref={passref} />
          <br />
          <label>Length {range}</label>
          <input type="range" min={8} max={36} name="" value={range} id="" className='w-[80%] ' onChange={(e)=>{
            setRange(e.target.value);
          }} />
          <br />

          <div className='flex gap-5 items-center justify-center mb-7'>
          <div className='flex gap-1'>
          <label>Numbers</label>
          <input type="checkbox" defaultChecked={number} onChange={()=>{
            setNumber((prev)=> !prev);
          }} name="" id="" />
          </div>
          <div className='flex gap-1'>
          <label>Characters</label>
          <input type="checkbox" name="" id="" defaultChecked={character} onChange={()=>{
            setCharacter((prev)=> !prev);
          }} />
          </div>
          </div>
          

          <button className='px-4 py-2 bg-blue-800 text-white rounded-lg' onClick={clipboard}>Copy</button>
          
          

        </div>
      </div>
    </div>
    </>
  )
}

export default App
