
const express = require('express')
const app = express()
const port = 8000;
const admin = (req,res)=>{
    return res.send("This is Admindashboard")
}

app.get("/",(req,res) => {
    return res.send("Home page")
});



const isAdmin = (req,res, next)=>{
    console.log("isAdmin is running");
    next()
}

const isLoggedIn = (req,res, next)=>{
    console.log("isLoggedInis running");
    next()
}


app.get('/admin',isLoggedIn, isAdmin, admin)

app.get("/signout",(req,res) => {
    return res.send("You are signed out")
});

app.get("/signup",(req,res) => {
    return res.send("SIgnup Route")
});

app.get("/hitesh",(req,res) => {
    return res.send("He uses Instagram")
});

app.get("/login",(req,res) => {
    return res.send("Login Route")
});

app.listen(port,()=>{
    console.log("Server is up and running");
})



// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })

