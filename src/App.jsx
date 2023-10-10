import { useEffect, useState } from 'react'
import './App.css'
import 'react-phone-number-input/style.css'
import LoginModal from './Components/LoginModal';

function App() {

  let initTodo;
  if (localStorage.getItem("Data") === null) {
    initTodo = [];
  }
  else {
    initTodo = JSON.parse(localStorage.getItem("Data"));
  }


  const [data, setData] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("Data", JSON.stringify(data));
  }, [data])


  const [name, setName] = useState('')
  const [todo, setTodo] = useState('')

  const onSubmit = (e) => {
    e.preventDefault();
    addTodo(name, todo)
    setName('')
    setTodo('')
  }

  const addTodo = (name, todo) => {
    const id = data.length === 0 ? 0 : data[data.length - 1].id + 1;
    const myTodo = {
      id: id,
      name: name,
      todo: todo,
    };
    const newData = [...data, myTodo];
    setData(newData);
    console.log("data ===", newData);
  }


  const deleteTodo = (id, index) => {
    const newData = data.filter((e, eindex) => eindex !== index)
    setData(newData)
  }


  const [editIndex, setEditIndex] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  const editTodo = (index) => {
    setEditIndex(index);
    setName(data[index].name);
    setTodo(data[index].todo);
  };

  const updateTodo = () => {
    if (editIndex !== null) {
      const updatedData = [...data];
      updatedData[editIndex] = {
        id: data[editIndex].id,
        name: name,
        todo: todo,
      };
      setData(updatedData);
      setEditIndex(null);
      setName('');
      setTodo('');
    }
  };

  return (
    <>
      <header>
        <nav className='container'>
          <li>user</li>
          <button onClick={() => setModalShow(true)} className='btn-primary btn'> Login</button>
        </nav>
        <LoginModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          
        />
      </header>
      <h1 className='text-center mt-5'>Todo</h1>
      <div className="todoWrapper container">
        <form typeof='submit'>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
            <input type="text" className="form-control" id="exampleInputText" aria-describedby="emailHelp" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Todo</label>
            <input type="text" className="form-control" id="exampleInputTodo" value={todo} onChange={(e) => setTodo(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary" onClick={(e) => onSubmit(e)}>Submit</button>
        </form>
      </div>

      <div className="todoList container">
        <h1 className='text-center mt-5'>Todo List</h1>
        {
          data.map((e, index) => {
            return <div className='todos' key={index}>
              {e.name && e.todo ? <div className='todoContent'>
                <div>
                  <h3>Name:- {e.name}</h3>
                  <h3>Todo:- {e.todo}</h3>
                </div>
                <div className='btnsDiv'>
                  <div><button onClick={() => deleteTodo(e.id, index)}>Delete</button></div>
                  <div><button onClick={() => editTodo(index)} className='mt-2'>Edit</button></div>
                </div>
              </div> : ''}
            </div>
          })
        }
      </div>

      {editIndex !== null && (
        <div className="editForm container">
          <h2 className='text-center mt-4'>Edit Todo</h2>
          <form typeof='submit'>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
              <input type="text" className="form-control" id="exampleInputText" aria-describedby="emailHelp" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Todo</label>
              <input type="text" className="form-control" id="exampleInputTodo" value={todo} onChange={(e) => setTodo(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary" onClick={updateTodo}>Update</button>
          </form>
        </div>
      )}
    </>
  )
}

export default App
