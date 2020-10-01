exports.signup = (req,res) => {
    console.log("REQ BODY", req.body);
    res.json({
        message: "Signup Route Works!"
    })
}

exports.signout = (req,res)=>{
    res.json({
        message: "User Signout"
    })
}