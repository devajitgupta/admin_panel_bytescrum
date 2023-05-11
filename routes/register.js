const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const varify = require('./verifyToken');
const user = require('../models/user');
//const verifyToken = require('./verifyToken');



router.post('/register', async (req, res) => {
	const emailExist = await User.findOne({
		email: req.body.email
	});


	if (emailExist) return res.status(400).send("Email id is already exist");

	//-- hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);
	let role = 'employee';
	if (req.body.email.toLowerCase() === process.env.ADMIN_EMAIL.toLowerCase()) {
		role = 'admin';
	}

	// create a new user

	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword,
		role: role
	})
	try {
		const savedUser = await user.save();
		console.log(savedUser)
		res.send(savedUser);

	} catch (error) {
		res.status(400).send(error);

	}
})

// Middleware to parse request body
/*
router.post('/login',  (req, res) => {
	// get the email and password of req.body
	console.log("aa")
	const user =  User.findOne({ email: req.body.email });

	// find the user of requested email
	if (!user) return res.json({success:false, message:"User not found"})

	// comapre sent in password with found user password
	const passwordMatch =bcrypt.compare(req.body.password, user.password);
	if (!passwordMatch) return  res.json({success:false, message:"password not found"})

	//-- create and asign a token
	const Token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET);
	res.header("auth-token", Token).send({ token: Token });
	return  res.json({success:true, message:"Login success"})
});
*/
/*
router.post('/login', async (req, res) => {
	try {
	  const user = await User.findOne({ email: req.body.email });
  
	  // find the user of requested email
	  if (!user) return res.json({ success: false, message: "User not found" });
  
	  // comapre sent in password with found user password
	  const passwordMatch = await bcrypt.compare(req.body.password, user.password);
	  if (!passwordMatch) return res.json({ success: false, message: "password not found" });
      // check if user is admin
	  if(user.email==process.env.ADMIN_EMAIL){
	  //-- create and asign a token
	  const token = jwt.sign({ userId: user._id,role:'admin' }, process.env.TOKEN_SECRET);
  
	  res.set("auth-token", token).json({success:true, token:token,message:"Admin login success"}); // set the "auth-token" header
	  }else{
		return res.json({success:false, message:"UnAuthorized"})
	  }
	}catch (error) {
	  console.error(error);
	  res.status(500).json({ success: false, message: "Server error" });
	}
  });
  
// get all employee information .
*/
router.post('/login', (req, res) => {
	user.find({ email: req.body.email }).exec().then((result) => {
		if (result.length < 1) {
			res.json({ success: false, message: "user not found" });
		}
		const user = result[0];
		bcrypt.compare(req.body.password, user.password, (err, ret) => {
			if (ret) {
				const payload = {
					userId: user._id
				}
				const token = jwt.sign({userId:user._id, role:user.role}, process.env.TOKEN_SECRET);
				res.json({ success: true,token:token, message: "Login Successfully" });
			} else {
				res.json({ success: false, message: "password does not match " })
			}
		})
	}).catch(err=>{
		res.json({success:false, message:"Auth fail"})

	})
});

// get route 
router.get('/roles',(req,res)=>{
	res.json(['admin','manager','employee']);

})
// roles based auth
const checkRole=(role)=>(req,res,next)=>{
	if(req.body.role !== role){
		return res.status(403).json({success:false, message:"Access Denied"})
	}
	next();
}
// get all  user
router.get("/all-user",async (req, res) => {
	try {
		const user = await User.find();
		res.json(user);

	} catch (error) {
		res.json({ message: error });
	}
});
/*
router.put('/:id', async (req, res) => {
	console.log("put response new")

	try {
		const _id = req.params.id;
		const getUser = await User.findOneAndUpdate(_id, req.body, {
			new: true
		});
		res.send(getUser);
		console.log(getUser);
	} catch (e) {
		res.status(400).send(e)

	}
})
*/
//delete
router.delete('/:id', async (req, res) => {
	console.log("delted response from backend")

	try {
		const removeUser = await User.findOneAndRemove(req.params.id);
		res.send(removeUser);
	} catch (error) {
		res.json({ message: error });

	}
});


// profile page single employee
router.get('/login/profile', varify, (req, res) => {
	const userId = req.userData.userId;
	User.findById(userId).exec().then((result) => {
		res.json({ success: true, data: result });
	}).catch(err => {
		res.json({ success: false, message: "server error" })
	})
})

// auth 


module.exports = router;