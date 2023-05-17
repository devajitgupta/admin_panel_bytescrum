const jwt= require('jsonwebtoken');
const User = require('../models/user');
const express = require('express');


const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  
    try {
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = decodedToken;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };


const authorizeRoles = (roles) => {
    return async (req, res, next) => {
      try {
        const user = await User.findById(req.user.userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        if (!roles.includes(user.role)) {
          return res.status(403).json({ message: 'Unauthorized' });
        }
  
        next();
      } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
      }
    };
  };

  module.exports = { authenticateToken, authorizeRoles };
