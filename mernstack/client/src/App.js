import React,{useEffect,useState} from 'react'
import axios from 'axios';
import './App.css';

const App = () => {
  const [item,setItem] = useState([]);
  const [newtask,setNewtask] = useState('');
  useEffect(() =>{
    axios.get('http://localhost:50000/gettask').then(
      arr => setItem(arr.data)
    )
  },[])

  const submitHandler = e =>{
    e.preventDefault();
    axios.post('http://localhost:50000/addtask',{todo:newtask}).then(
      arr => setItem(arr.data)
    )
    alert('New task assigned🥱🥱👊🤘lets rock it😉')
  }

  const deleteHandler = id =>{
    axios.delete(`http://localhost:50000/delete/${id}`).then(
      arr => setItem(arr.data)
    )
    alert('HURRAY.....!😍 🎉🎉🎉🎊🎊🎊🎉🤯you have completed the task.')
  }

  const handleEdit = id => {
    // const filteredItems = this.state.filter(item => item.id !== id);
    const selectedItem = this.state.items.find(item => item.id === id);
    console.log(selectedItem);
  };
  
  return (
    <div className="wrapper">
    <div>
      <center>
        <fieldset>
        <h1>🙃TASK MANAGEMENT APPLICATION🙃</h1>
        <form onSubmit={submitHandler}>
           <label>Task : <input type="text"  className="txtbgcolor" placeholder="Enter task..." value={newtask} 
           onChange={(e)=>setNewtask(e.target.value)}/></label>
           <input type="submit" value="Submit" /><br/> 
           <legend><h2><u>List of Tasks to completed</u></h2></legend>
        </form><br />

        <div class="container">
        <ul class="myUL">
          {item.map(task => 
        <div key={task._id}>
          {/* <input type="checkbox" className="checkbox-edit" id="chbx"  name="task completed" value="Yes!" /> */}
          
          <h3>{task.todo}  </h3>&nbsp;&nbsp;&nbsp;
          <button  className="button-edit" onClick={()=>handleEdit(task._id)} >Edit</button>
           &nbsp;&nbsp;<button  className="button-delete" onClick={()=>deleteHandler(task._id)}>Delete</button>
        </div>)}
        </ul>
        </div>
        </fieldset>
      </center>
    </div>
    </div>
  )
  }
export default App