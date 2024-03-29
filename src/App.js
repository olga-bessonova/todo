import React, {useEffect, useState} from 'react'
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';
import './App.css';

function App() {
  const [isCompletedScreen, setIsCompletedScreen] = useState(false)
  const [allTodos, setAllTodos] = useState([])
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [allCompleted, setAllCompleted] = useState([])

  const handleAdd = () => {
    let newItem = {
      title: newTitle,
      description: newDescription
    }

    let updatedTodoArr = [...allTodos]
    updatedTodoArr.push(newItem)
    setAllTodos(updatedTodoArr)

    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr))

    setNewTitle("")
    setNewDescription("")
  } 

  const handleDelete = (index) => {
    let reducedTodoArr = [...allTodos]
    reducedTodoArr.splice(index,1)
    setAllTodos(reducedTodoArr)

    localStorage.setItem('todolist', JSON.stringify(reducedTodoArr))
  }

  const handleCheck = (index) => {
    const date = new Date ();
    var dd = date.getDate ();
    var mm = date.getMonth () + 1;
    var yyyy = date.getFullYear ();
    var hh = date.getHours ();
    var minutes = date.getMinutes ();
    var ss = date.getSeconds ();
    var finalDate = dd + '-' + mm + '-' + yyyy + ' at ' + hh + ':' + minutes + ':' + ss;

    let newCompleted = {
      ...allTodos[index],
      completedOn: finalDate
    }

    let updatedAllCompletedArr = [...allCompleted]
    updatedAllCompletedArr.push(newCompleted)
    setAllCompleted(updatedAllCompletedArr)
    localStorage.setItem('completedlist', JSON.stringify(allCompleted))

    handleDelete(index)
  }

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'))
    let savedCompleted = JSON.parse(localStorage.getItem('completedlist'))
    if (savedTodo){
      setAllTodos(savedTodo)
    }

    if (savedCompleted){
      setAllCompleted(savedCompleted)
    }
  },[])

  return (
    <div className="App">
        <h1>TODOS</h1>

        <div>
          <div>
            <label>Title</label>
            <input type="text" placeholder="to do..." value={newTitle} onChange={(e) =>setNewTitle(e.target.value)}/>
          </div>

          <div>
            <label>Description</label>
            <input type="text" placeholder="Description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)}/>
          </div>

          <div>
            <button type="button" className="primaryBtn" onClick={handleAdd}>Add</button>
          </div>
        </div>

          <div>
            <button onClick={() => setIsCompletedScreen(false)}>Todo</button>
            <button onClick={() => setIsCompletedScreen(true)}>Completed</button>
          </div>

          <div className="todo-list">

            {!isCompletedScreen && allTodos.map((item, index) => {
              return(
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div>
                        <AiOutlineDelete
                          title="Delete?"
                          className="icon"
                          onClick={()=>{handleDelete(index)}}
                        />
                        <BsCheckLg
                          title="Completed?"
                          className=" check-icon"
                          onClick={() => {handleCheck(index)}}
                        />
                  </div>
              </div>
              )
            })}


          </div>

          <div className="completed-list">

            {isCompletedScreen && allCompleted.map((item, index) => {
              return(
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>{item.completedOn}</p>
                  </div>
                  <div>
                        <AiOutlineDelete
                          title="Delete?"
                          className="icon"
                          onClick={()=>{handleDelete(index)}}
                        />
                        <BsCheckLg
                          title="Completed?"
                          className=" check-icon"
                          onClick={() => {handleCheck(index)}}
                        />
                  </div>
              </div>
              )
            })}


          </div>
    </div>
  );
}

export default App;
