const jwt= require('jsonwebtoken');

module.exports=(req,res,next)=>{
    const token=req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).send("Access Denied");
    try{
        const varified=jwt.verify(token, process.env.TOKEN_SECRET);
        req.userData=varified;
        next();

    }catch(error){
        res.status(400).send("Invalid Token")
    }
}