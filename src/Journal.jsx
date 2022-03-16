import React from 'react';
import {useRef, useState, useEffect} from 'react';
import background from "./thinkGreen.jpg";
import "./journal.css";

const Journal = () => {
    //my thought
    const [id, setId] = useState(Date.now())
    const dateRef = useRef(null);
    const thoughtRef = useRef(null);
    const [myThought, setMyThought] = useState([]);
    const dateRef2 = useRef(null);
    const taskRef = useRef(null);
    const [myTask, setMyTask] = useState([]);

    //Save Button
    const handleSubmit = (e) => {
        e.preventDefault();
        const journalObject = {
          id: id,
          date: dateRef.current.value,
          thought: thoughtRef.current.value,
          }
          setMyThought([...myThought, journalObject]);
    
          dateRef.current.value= null;
          thoughtRef.current.value= null;
          setId(Date.now());
    }
      useEffect(() => {
        localStorage.setItem('MyDay', JSON.stringify(myThought))
      }, [myThought]);
    

      // Task

      const handleSubmit2 = (e) => {
        e.preventDefault();
        const taskObject = {
          id: id,
          date2: dateRef2.current.value,
          task: taskRef.current.value,
          }
          setMyTask([...myTask, taskObject]);
    
          dateRef2.current.value= null;
          taskRef.current.value= null;
          setId(Date.now());
    }
      useEffect(() => {
        localStorage.setItem('MyDay', JSON.stringify(myTask))
      }, [myTask]);

    //delete Button
    const handleDelete = (e) => {
        const retrieveData = JSON.parse(localStorage.getItem('MyDay'));
        return setMyThought(retrieveData.filter((foundData) => foundData.id !== e.target.id));
      }
    
  return (
    <div className='main' style={{ backgroundImage: `url(${background})` }}>
        <div className='container'>
            <h1 className='title'>My Coding Journal</h1>
            <form action="" onSubmit={handleSubmit}>
                <label className='firstLabel'>Thoughts for the Day</label>
                <table>
                    <tr>
                        <th>
                            <label className='firstLabel'></label>
                        </th>
                        <th>
                            <input className='date' type="date" ref={dateRef}/>
                        </th>
                    </tr>
                </table>
                <textarea className='message' id="" cols="36" rows="2" ref={thoughtRef} placeholder="What's on your mind?"></textarea>
                <table className='button'>
                    <tr>
                        <td><input type="submit"value='Save'/></td>
                        <td><input type="reset" value='Clear'/></td>
                    </tr>
                </table>
                
            </form>
            <div className='messageContainer'>
                <h4>Thoughts for the Day</h4>
                <div className='messageContainer2'>
                {myThought.map((info)=>(
            <div>
                <h4>{info.date}: {info.thought}</h4>
                <button id={info.id} onClick={handleDelete}>delete</button>
            </div>
            ))}
                </div>
            </div>
        </div>
        <div className='container'>
            <h1 className='title'>My Coding Journal</h1>
            <form action="" onSubmit={handleSubmit2}>
                <label className='firstLabel'>Tasks</label>
                <table>
                    <tr>
                        <th>
                            <label className='firstLabel'></label>
                        </th>
                        <th>
                            <input className='date' type="date" ref={dateRef2}/>
                        </th>
                    </tr>
                </table>
                <textarea className='message' id="" cols="36" rows="2" ref={taskRef} placeholder="What do you need to do?"></textarea>
                <table className='button'>
                    <tr>
                        <td><input type="submit"value='Save'/></td>
                        <td><input type="reset" value='Clear'/></td>
                    </tr>
                </table>
                
            </form>
            <div className='messageContainer'>
                <h4>Task</h4>
                <div className='messageContainer2'>
                {myTask.map((info2)=>(
            <div>
                <h4>{info2.date2}: {info2.task}</h4>
                <button id={info2.id} onClick={handleDelete}>delete</button>
            </div>
            ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Journal