const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { authenticateToken,authorizeRoles } = require('./verifyToken');

//const verifyToken = require('./verifyToken');



router.post('/register', async (req, res) => {
	const emailExist = await User.findOne({
		email: req.body.email
	});


	if (emailExist) return res.status(400).send("Email id is already exist");

	//-- hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);
	if(req.body.email===process.env.ADMIN_EMAIL){
		req.body.role='admin';

	}
	// create a new user

	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword,
		role:req.body.role
	})
	try {
		const savedUser = await user.save();
		console.log(savedUser)
		res.send(savedUser);

	} catch (error) {
		res.status(400).send(error);

	}
});


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

router.post('/login', (req, res) => {
	User.find({ email: req.body.email }).exec().then((result) => {
		if (result.length < 1) {
			res.json({ success: false, message: "user not found" });
		}
		const user = result[0];
		bcrypt.compare(req.body.password, user.password, (err, ret) => {
			if (ret) {
				const payload = {
					userId: user._id
				}
				const token = jwt.sign({ userId: user._id, role: user.role }, process.env.TOKEN_SECRET);
				res.json({ success: true, token: token,role:user.role, message: "Login Successfully" });
			} else {
				res.json({ success: false, message: "password does not match " })
			}
		})
	}).catch(err => {
		res.json({ success: false, message: "Auth fail" })

	})
});




////////-----------start

router.get('/all-users',authenticateToken,authorizeRoles(['admin']),async (req, res) => {
	console.log("all users data")
	try {
		const data = await User.find();
		res.status(200).json({ data });
	} catch (error) {
		res.status(500).json({ message: 'An error occurred', error });
	}
});
router.get('/employee', authenticateToken, authorizeRoles (['admin', 'manager']), async (req, res) => {
	console.log("get employee")
	try {
		const data = await User.find({ role: 'employee' });
		res.status(200).json({ data });
	} catch (error) {
		res.status(500).json({ message: 'An error occurred', error });
	}
})

router.get('/employee/:id', authenticateToken, authorizeRoles(['admin', 'manager', 'employee']), async (req, res) => {
	try {
		const userId = req.user.userId;

		if (req.user.role === 'employee') {
			const data = await User.findById(userId);
			res.status(200).json({ data });
		} else {
			const data = await User.find({ _id: req.params.id });
			res.status(200).json({ data });
		}
	} catch (error) {
		res.status(500).json({ message: 'An error occurred', error });



	}
})







////////////////-----------end


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
});

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
router.get('/login/profile', authenticateToken,authorizeRoles(['employee']), (req, res) => {
	console.log("login profile")
	const userId = req.user.userId
	console.log(userId)
	User.findById(userId).exec().then((result) => {
		res.json({ success: true, data: result });
	}).catch(err => {
		res.json({ success: false, message: "server error" })
	})
})

module.exports = router;