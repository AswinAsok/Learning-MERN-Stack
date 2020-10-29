import React from 'react'
import "../styles.css"; 
import {API} from "../backend"

function Home(){
    console.log("API IS : ", API);
    return(
        <div>
            <h1 className = "text-white">Hello FrontEnd</h1>
        </div>
    )
}

export default Home;