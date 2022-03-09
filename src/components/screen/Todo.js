import React, { useEffect,useState } from "react";
import greentick from "../../assets/tick-green.svg";
import dlt from "../../assets/delete.svg";
import plus from "../../assets/plus.svg";
import rvt from "../../assets/revert.svg";
import "./Todo.css"

export default function Todo(){

    const [Tasks,setTask] = useState([]);
    const [ctasks, setCTasks] = useState([]);
    const [input,setInput] = useState("");
    const [iD,setID] = useState(1);
    let addItem = () => {
        if(input){
            setID(iD+1);
            setTask([...Tasks,{id:iD , desc:input}])
        }

    }

    let deleteItems= (xid)=>{
        console.log("Given id is :",xid);
        let updatedTasks = Tasks.filter((task) => task.id !== xid);
        setTask(updatedTasks);
    }

    let deleteCItems= (xid)=>{
        let updatedTasks = ctasks.filter((ctask) => ctask.id !== xid);
        setCTasks(updatedTasks);
    }

    let completeTask= (tsk) => {
        // console.log(xid,xdesc);
        let index = Tasks.indexOf(tsk);
        // console.log(index);
        let updatedTasks = Tasks.filter((e) => Tasks.indexOf(e) !== index)
        setCTasks([...ctasks,tsk]);
        setTask(updatedTasks);
    }

    let revert = (cid,ctsk) => {
        let updatedCtasks = ctasks.filter((e)=> e.id !== cid)
        setCTasks(updatedCtasks);
        setTask([...Tasks,ctsk]);
    }
    useEffect(()=>{
        console.log("Tasks");
        console.log(Tasks);
    }, [Tasks])

    useEffect(()=>{
        console.log("CTasks");
        console.log(ctasks);
    },[ctasks])
    return (
        <section className="wrapper">
            <h1>Todo List</h1>
            <section className="todo-list">
                <h2>Things to be done</h2>
                <div className="form">
                    <ul>
                        {Tasks.map((task)=>{
                            return(
                                <li key={task.id}>
                                    <button className="radio-button" onClick={()=>completeTask(task)}></button>
                                    <p>{task.id},{task.desc}</p>
                                    <span onClick={()=>{deleteItems(task.id)}}><img src={dlt} alt=""/></span>
                                </li>
                            )
                        })}
                    </ul>
                    <div className="type-task">
                        <span><img src={plus} alt=""/></span>
                        <input placeholder="Type new task..." onChange={(e)=>setInput(e.target.value)}/>
                        <button className="add" onClick={addItem}>Add New</button>
                    </div>
                </div>
            </section>

            <section className="completed-list">
                <h2>Completed</h2>
                <div className="form">
                    <ul>
                        {ctasks.map((ctask) => {
                            return(
                                <li key={ctask.id}>
                                    <button className="radio-button  green"><img src={greentick} alt=""/></button>
                                    <p>{ctask.id},{ctask.desc}</p>
                                    <span className="revert" onClick={()=>{revert(ctask.id,ctask)}}><img src={rvt} alt=""/></span>
                                    <span onClick={()=>{deleteCItems(ctask.id)}}><img src={dlt} alt=""/></span>                            
                                </li>
                            )
                        })}                        
                    </ul>
                    
                </div>
            </section>
        </section>
    );
};
