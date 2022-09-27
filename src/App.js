import React, {useEffect, useState} from "react";
import {BsFillTrashFill} from 'react-icons/bs';
import {MdDoneOutline} from 'react-icons/md';
import {FaSketch, FaStar} from 'react-icons/fa';
import './style.css'
import Vanta from "./Vanta";
import { collection, getDocs, deleteDoc, doc, setDoc, addDoc} from "firebase/firestore";
import { db } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import {getData} from "./redux/reducers/tasks"
import { useForm } from "react-hook-form";
import { async } from "@firebase/util";


function App() {

    const dispatch = useDispatch()
    const tasks = useSelector((s)=> s.tasks.tasks)
    const tasksCount = useSelector((s)=>s.tasks.tasksCount)


  const {
    register,
    handleSubmit,
    reset
  } = useForm()

// const tasks =getDocs(collection(db, 'tasks'))



    function data(date) {
        return new Intl.DateTimeFormat('en-En', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }).format(new Date(date))
    }



    useEffect(()=> {
        getDocs(collection(db,'tasks'))
    // .then((res)=>console.log(res.docs.map(el => ({...el.data(), id:el.id}))))
    .then((res) => dispatch(getData(res.docs.map(el => ({...el.data(), id:el.id}) ))))
    }, [])

    const addTask = async (data) => {
        // console.log(data);
        await addDoc(collection(db, 'tasks'), {
            ...data,
            important: false,
            done: false,
            isChange: false,
            time: new Date()
        })
      await  getDocs(collection(db, 'tasks'))
        .then((res)=> dispatch(getData(res.docs.map(el => ({...el.data(), id:el.id}) ))))
        
        reset()

    }

    return (
        <div className="App">
            <div className="content">
                <div>
                    <h2 className='data__title'>{data(new Date())}</h2>
                    <h1 className='title'>Todo List</h1>
                    <span className='count'> {tasksCount} tasks  to done 2
          </span>
                </div>

                <form className='form' onSubmit={handleSubmit(addTask)}>
                    <input placeholder="Add task" {...register('text')} maxLength='15' minLength={4} className='input' required type="text"/>
                    <button className='add__btn' type='submit'>Add</button>
                </form>


                <ul className='list'>
                    {tasks.map((item)=> ( 
                         <li key={item.id} className='item'>
                        <span>sda</span>

                        <span className='text'>{item.text}</span>
                        <div className='list__btns'>
                            <button className='btn' type={"button"}><MdDoneOutline/>
                            </button>
                            <button className='btn' type='button'><FaStar/>
                            </button>
                            <button className='btn' type='button' onClick={ async ()=> {
                             await   deleteDoc(doc(db, 'tasks', item.id))

                             await getDocs(collection(db, "tasks"))
                             .then((res)=> dispatch(getData(res.docs.map(el => ({...el.data(), id:el.id}) ))) )
                            }}><BsFillTrashFill/></button>
                        </div>
                    </li>))}

                  
                    <li className='item'>
                        <span>sda</span>

                        <span className='text'>ad</span>
                        <div className='list__btns'>
                            <button className='btn' type={"button"}><MdDoneOutline/>
                            </button>
                            <button className='btn' type='button'><FaStar/>
                            </button>
                            <button className='btn' type='button'><BsFillTrashFill/></button>
                        </div>
                    </li>
                    <li className='item'>
                        <span>sda</span>

                        <span className='text'>ad</span>
                        <div className='list__btns'>
                            <button className='btn' type={"button"}><MdDoneOutline/>
                            </button>
                            <button className='btn' type='button'><FaStar/>
                            </button>
                            <button className='btn' type='button'><BsFillTrashFill/></button>
                        </div>
                    </li>

                </ul>

                <input className='search' type="search" placeholder='enter task'/>

                <div className='footer__btns'>
                    <div className='footer__btns-left'>
                        <button className='btn__footer' type='button'>All</button>
                        <button className='btn__footer' type='button'><MdDoneOutline/></button>
                        <button className='btn__footer' type='button'><FaStar/></button>
                    </div>
                    <div className='footer__btns-right'>
                        <button className='delete__all-btn' type='button'>Delete All <MdDoneOutline/></button>
                    </div>
                </div>
            </div>
            <Vanta/>
        </div>
    );
}

export default App;
