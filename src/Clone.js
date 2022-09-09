import React, { useState } from 'react'
const Clone = () => {
    const getItem=() =>{
       let data = localStorage.getItem("lists1");
       if(data)
         return JSON.parse(data);
        return [];
    }
    const [inputData,setInputdata] = useState("");
    const [textData,setTextData]  = useState("");
    const [item,setItem] = useState(getItem());
    const [state,setState] = useState(false);
    const [newEditId,setNewEditId] = useState(null);
    const addItem=()=>{
        if(inputData==""||textData=="")
          alert("empty item can't be added");
        else if(!state){
            setItem(
                item.map((elem)=>{
                    if(elem.id==newEditId)
                      return {
                         ...elem,
                         title:inputData,
                         detail:textData
                      }
                      return elem;
                })
            )
            setState(true);
         setNewEditId(null);
         setInputdata("");
         setTextData("");

        }
        else{
            const AllItem = {
            id:new Date().getTime().toString(),
            title:inputData,
            detail:textData
        }
        setInputdata("");
        setTextData("")
        setItem([...item,AllItem])
        }
    }
    const DeleteId=(id)=>{
        const updateItem = item.filter((elem)=>{
            return id!=elem.id
        })
        setItem(updateItem);
    }
    const EditId =(id)=>{
         let updateItem = item.filter((elem)=>{
             return id===elem.id;
         })
         console.log(updateItem)
         setState(false);
         setNewEditId(updateItem[0].id);
         setInputdata(updateItem[0].title);
         setTextData(updateItem[0].detail);
    }
    localStorage.setItem("lists1",JSON.stringify(item));
  return (
    <div className='container'>
    <div className='row'>
        <div className=' col input_field border-none'>
         <div>
           <input type="text" value={inputData} onChange={(e)=>setInputdata(e.target.value)} placeholder="enter title"/>
         </div>
         <div>
          <textarea col="10" rows="3" value={textData} onChange={(e)=>setTextData(e.target.value)} placeholder='enter text'></textarea>
         </div>
         <button className='btn btn-info' onClick={addItem}>{state ?"Add Item":"Set Item"}</button>
       </div>
    </div>
       
       <div className='row'>
      {
        item.map((elem)=>{
                const {id,title,detail} = elem;
            return(
                
               <div className='col col-3 text-center' key={id}>
                   <div><h2 className='text-danger' >{title}</h2></div>
                   <div><b>{detail}</b></div>
                   <i className=" fa-solid fa-pen-to-square" style={{color:"pink"}} onClick={()=>EditId(id)} ></i>
                   <i  style={{color:"yellow"}}className="fa-solid fa-square-minus" onClick={()=>DeleteId(id)} ></i>
               </div>
            ) 
        })
      }
      </div>
    </div>
  )
}

export default Clone