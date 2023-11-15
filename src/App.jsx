import React, { useEffect, useState } from 'react'
import './App.css'
import 'react-phone-number-input/style.css'
import LoginModal from './Components/LoginModal';
import SignUp from './Components/Auth/SignUp';
import { auth } from './Firebase'
import { signOut } from 'firebase/auth'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, editTodo } from './store/slices/todosSlice';
import { userLogOut } from './store/slices/authSlice';
import Dropdown from 'react-bootstrap/Dropdown';
import Profile from './Components/Profile.jsx'
import defaultProfile from './assets/3.svg'

function App() {

  const dispatch = useDispatch()

  const todoData = useSelector(state => state.todosSlice.todos)

  const authUser = useSelector(state => state.authSlice)
  const user = useSelector(state => state.authSlice.isLogIn)
  console.log('userLog', user)
  console.log('authUser', authUser)

  const isVerified = authUser.isVerified;

  const userSignOut = () => {
    signOut(auth).then(() => {
      toast.success('Log out Successfully')
      dispatch(userLogOut(false))
    }).catch((err) => [
      console.log(err)
    ])
  }

  const [name, setName] = useState('')
  const [todo, setTodo] = useState('')

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo({ name, todo }))
    setName('')
    setTodo('')
  }

  const removeTodo = (id)=>{
    if(user){
      dispatch(deleteTodo(id))
    }
    else{
      toast.error("Please Login First!")
    }
  }

  const [editIndex, setEditIndex] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [modalSignUp, setModalSignUp] = useState(false);
  const [profileShow, setProfileShow] = useState(false);

  const editTodoHandler = (index) => {
    if(user){

      setEditIndex(index);
      setName(todoData[index].name);
      setTodo(todoData[index].todo);
    }
    else{
      toast.error("Please Login First!")
    }
  };

  const updateTodo = () => {
    if(user){
      dispatch(editTodo({ id: editIndex, name, todo }))
      setEditIndex(null);
      setName('');
      setTodo('');
    }
    else{
      toast.error("Please Login First!")
    }
  };

  return (
    <>
      <header style={{ padding: '12px 0px' }}>
        <nav className='container d-flex align-items-center justify-content-between'>
          <h2>iTodos</h2>
          {user ?
            <>
            <div className='d-flex justify-content-center align-items-center profileImgWrapper'>
              <span>
               <img src={authUser.userProfile?authUser.userProfile:defaultProfile} alt="profileImg" className='profileImg' />
              </span>
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  {
                    authUser.userName ? <span>{authUser.userName}</span> : <span>{authUser.userEmail}</span>
                  }
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#" onClick={() => setProfileShow(true)}>Profile</Dropdown.Item>
                  <Dropdown.Item href="#" onClick={userSignOut}>LogOut</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            </>
            :
            <button onClick={() => setModalShow(true)} className='btn-primary btn'>LogIn/SignUp</button>
          }
        </nav>
        <>
          <LoginModal
            show={modalShow}
            setModalSignUp={setModalSignUp}
            onHide={() => setModalShow(false)}

          />
          <SignUp show={modalSignUp} onHide={() => setModalSignUp(false)} />
          <Profile show={profileShow}
            setProfileShow={setProfileShow}
            onHide={() => setProfileShow(false)} />
        </>
      </header>
      {
        user ? <div className='addTodo'>
          <h1 className='text-center mt-5'>Add Todo</h1>
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
        </div> : <div style={{ border: '0.5px solid lightgrey' }}><h1 className='text-center my-5'>Plz login to add todo</h1></div>
      }


      <div className="todoList container mb-5">
        <h1 className='text-center mt-5'>Todo List</h1>
        {
          todoData && todoData.map((e, index) => {
            return <div className='todos' key={e.id}>
              {e.name && e.todo ? <div className='todoContent'>
                <div>
                  <h3>Name:- {e.name}</h3>
                  <h3>Todo:- {e.todo}</h3>
                </div>
                <div className='btnsDiv'>
                  <div><button onClick={() => removeTodo(e.id)}>Delete</button></div>
                  <div><button onClick={() => editTodoHandler(index)} className='mt-2'>Edit</button></div>
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