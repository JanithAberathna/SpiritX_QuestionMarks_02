const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.send("Authentication route is working");
};

const login = async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Find user in database
      const user = await User.findOne({ username });
      
      // If user doesn't exist
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      
      // Check if password matches
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      
      // Create JWT token with isAdmin field
      const token = jwt.sign(
        { 
          userId: user._id, 
          username: user.username,
          isAdmin: user.isAdmin  // Include admin status in token
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      
      // Send token in response
      res.status(200).json({ 
        message: 'Login successful',
        token,
        user: { 
          id: user._id, 
          username: user.username,
          isAdmin: user.isAdmin  // Include admin status in response
        }
      });
      
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error during login' });
    }
};

const registeruser = async (req, res) => {
    console.log("Received registration request:", req.body);
    
    try {
        const { username, password, confirmPassword } = req.body;

        // Basic validation
        if (!username || !password || !confirmPassword) {
            console.log("Missing required fields");
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        console.log("Checking if user exists...");
        // Check if username already exists
        const exist = await User.findOne({ username });
        if (exist) {
            console.log("Username already exists");
            return res.status(400).json({
                error: "Username is already taken"
            });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            console.log("Passwords don't match");
            return res.status(400).json({
                error: "Passwords do not match"
            });
        }

        console.log("Hashing password...");
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log("Creating new user...");
        // Create the new user
        const newUser = await User.create({
            username,
            password: hashedPassword
        });

        console.log("User registered successfully:", newUser.username);
        return res.status(201).json({
            message: "User registered successfully",
            user: {
                username: newUser.username
            }
        });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({
            error: "An error occurred during registration"
        });
    }
};

const registerAdmin = async (req, res) => {
    try {
      const { username, password, confirmPassword, adminSecret } = req.body;
  
      // Check if admin secret is correct
      if (adminSecret !== process.env.ADMIN_SECRET_KEY) {
        return res.status(403).json({
          error: "Invalid admin registration key"
        });
      }
  
      // Basic validation
      if (!username || !password || !confirmPassword) {
        return res.status(400).json({
          error: "All fields are required"
        });
      }
  
      // Check if username already exists
      const exist = await User.findOne({ username });
      if (exist) {
        return res.status(400).json({
          error: "Username is already taken"
        });
      }
  
      // Check if passwords match
      if (password !== confirmPassword) {
        return res.status(400).json({
          error: "Passwords do not match"
        });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the new admin user
      const newAdmin = await User.create({
        username,
        password: hashedPassword,
        isAdmin: true  // Set this user as an admin
      });
  
      return res.status(201).json({
        message: "Admin registered successfully",
        user: {
          username: newAdmin.username,
          isAdmin: newAdmin.isAdmin
        }
      });
    } catch (error) {
      console.error("Admin registration error:", error);
      return res.status(500).json({
        error: "An error occurred during admin registration"
      });
    }
};

// Fix export - include all functions
module.exports = { test, login, registeruser, registerAdmin };