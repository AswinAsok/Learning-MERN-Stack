import React, {useState} from "react";
import Tweet from './tweet'
import './App.css'

function App() {

  // const [isRed, setRed] = useState(false)
  // const[count, setCount ] = useState(0);

  // const increment = ()=>  {
  //   setCount(count + 1)
  //   setRed(!isRed)
  // }


  const [users, setUsers] = useState([
    {
      name : "Ed",
      message : "Hello"
    },
    {
      name : "Aswin",
      message : "Hi"
    },
    {
      name : "Coder",
      message : "Hello Rohit"
    },
  ])


  return (
    <div className="app">
      {users.map(user => (
        <Tweet name = {user.name} message={user.message} />
      ))}
    </div>
  );
}

export default App;
