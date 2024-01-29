import { useState } from "react";
import {FaTrash,FaRegCheckCircle} from "react-icons/fa"
import {ImRadioUnchecked} from "react-icons/im"

function Home() {

  const [name,setName]=useState();
  const [req,setReq]=useState(false)
  const [items,setItems]=useState(JSON.parse(localStorage.getItem('data')) || []);
  

  const handleSubmit=(e)=>{
    e.preventDefault();
    const d=JSON.parse(localStorage.getItem('data')) || []
    const currentData={"title":name,"required":req}
    d.push(currentData)
    localStorage.setItem('data',JSON.stringify(d))
    window.location.reload()
  }

  const handleDelete=(i)=>{
    items.splice(i,1);
    localStorage.setItem('data',JSON.stringify(items))
    window.location.reload()
  }

  const handleChange=(i)=>{
    const rd=JSON.parse(localStorage.getItem('data'))
    rd[i].required=!rd[i].required
    localStorage.setItem('data',JSON.stringify(rd))
    window.location.reload()
  }

  return (
    <>
      <div className="">
  
        <h1 className="text-2xl font-semibold text-center mb-10 text-[#43077d]">TO DO LIST</h1>
        <div className=" flex justify-center">
          <input 
            className="p-1 border-black border-2 shadow-lg"
            type="text" 
            placeholder="name" 
            value={name} 
            onChange={(e)=>{setName(e.target.value)}}/>
          <button 
            onClick={handleSubmit} 
            className="p-1 bg-green-600 border-green-600 border-2 shadow-lg focus:border-blue-400">
            submit</button>
        </div>
        
        <div className="w-screen flex flex-col items-center justify-center mt-10">{items.map((item,i)=>
        {
            return <div className="p-2 bg-neutral-300 flex justify-between w-3/5 mb-1" key={i}>
            <button 
                onClick={()=>{handleChange(i)}}>{item.required?<div className=" text-green-600 text-xl"><FaRegCheckCircle/></div>:<div className="text-xl"><ImRadioUnchecked/></div>}</button>
                        <span className=" text-black font-bold">{
                            item.required ? <span className=" line-through">{item.title}</span>:item.title}</span>
                        <button 
                            className="hover:text-red-500"
                            onClick={()=>{
                                handleDelete(i)
                                }}>
                        <FaTrash/></button>
                    </div>
        }
      )}</div>
      </div>
    </>
  )
}

export default Home
