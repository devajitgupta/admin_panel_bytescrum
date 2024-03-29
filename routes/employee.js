const express = require('express');
const router = express.Router();
const Employees = require('../models/employee');
const varify = require('./verifyToken');

router.post('/employees', async (req, res) => {
	console.log("data saved")
	const user = new Employees({
		name: req.body.name,
		email: req.body.email,
		salary:req.body.salary,
        designation:req.body.designation,
		role:req.body.role
	})
	try {
		const savedUser = await user.save();
		console.log(savedUser)
		res.send(savedUser);

	} catch (error) {
		res.status(400).send(error);

	}
})
router.get('/aa',async (req,res)=>{
	console.log("all users getting")
	try{
		const users=await Employees.find();
		res.json(users);
	}catch(error){
		res.json({message:error})
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

module.exports = router;