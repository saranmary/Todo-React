import React , {useState,useEffect} from 'react';
import {FaEdit,FaTrash } from 'react-icons/fa';


function App(){
 
  const[text,settext]=useState('');
  const[list,setlist]=useState(()=>{
    const Data = localStorage.getItem('list');
    return Data ? JSON.parse(Data) : [];
  });
  const[edit,setedit]=useState(false);
  const[editid,seteditid]=useState(null);
  const[alert,setalert]=useState({show:'true',msg:'',type:''});

  useEffect(()=>{
    localStorage.setItem("list",JSON.stringify(list));
  },[list]);
  useEffect(()=>{const time= setInterval(() => {
    setalert(!alert.show)
  },2000);return()=>{clearInterval(time);};},[]);

  const handleSubmit=(e)=>{
    e.preventDefault();
    if (!text) {
      setalert({show:'true',msg:'please enter value',type:'danger'})
    }

    else if (text && edit) {
      setlist(
        list.map((item) => {
          if (item.id === editid) {
            return { ...item, text };
          }
          else{
            return item;
          }
        })
      );
      settext('');
      seteditid(null);
      setedit(false);
      setalert({show:'true',msg:'value changed',type:'success'});
    }
    else{
      const newlist={id:new Date().getTime().toString(),text};
      setlist([...list,newlist]);
      settext('');
      setalert({show:'true',msg:'item added to the list',type:'success'});
    }
  }

  const clearitem=()=>{
    setlist([]);
    setalert({show:'true',msg:'empty list',type:'danger'});
  }
  const edititem=(id)=>{
    const newedit = list.find((item) => item.id === id);
    setedit(true);
    seteditid(id);
    settext(newedit.input);
    
  }
  const removeitem=(id)=>{
    setlist(list.filter((item) => item.id !== id))
    setalert({show:'true',msg:'item removed',type:'danger'})
  }

  return(
    <section className='section'>
    <form className='form'>
    {alert.show && <p className={'${alert.type}'}>{alert.msg}</p>}
    <h1>TODO APP</h1>
    <div className='input' >
      <input 
      type="text" 
      className='text' 
      placeholder='e.g eggs' 
      value={text} 
      onChange={(e)=> settext(e.target.value)} />
      <button 
      type='submit' 
      className='btn' 
      onClick={handleSubmit}>
        {edit?'edit':'submit'}
      </button>
    </div>
    {list.map((item) => {
      const { id, text } = item;
      return(
        <div className='Change' key={id}>
          <div class='p'>{text}</div>
          <button type='button'className='edit-btn' onClick={()=>edititem(id)}><FaEdit /></button>
          <button type='button'className='delete-btn' onClick={()=>removeitem(id)}><FaTrash /></button>
        </div>
      
      );
    }
    )
    }
    {list.length>0 && (
    <div className='clear'>
    
      <button  
      className='clear-btn'
      onClick={clearitem}>
        Clear Items
      </button>
    </div>
    )}
    </form>
    </section>
  );

}

export default App;


