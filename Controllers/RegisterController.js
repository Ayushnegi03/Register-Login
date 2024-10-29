const user = require('./../Models/userModule.js')
const bcrypt =require('bcrypt');


exports.register = async (req, res) => {
    // console.log(req)
     const username =  req.body.username.toString();  
     const password  = req.body.password.toString();
 
     try {
         
         if (!username || !password) {
             return res.status(400).send('Username and password are required');
         }
         const hashedPassword = await bcrypt.hash(password, 10);
 
         // Create a new user
         const newUser = new user({ username, password : hashedPassword });
         await newUser.save();
 
         console.log("User registered:", username);
         res.status(201).send('User registered successfully');
     } catch (error) {
         console.error('Error registering user:', error);
         res.status(500).send('Server error');
     }
 };

exports.login = async (req, res) => {
    //console.log(req);
    const { username,password } = req.body;
    
    try {   
        // Validate input
        if (!username || !password ) {
            return res.status(400).send('Username and password are required');
        }

         // Find the user by username
       const existingUser = await user.findOne({ username:username });
        //console.log('Here');
         if (!existingUser) {
             return res.status(400).send(' Not having  username or password');
         }
        // console.log('existingUser', existingUser)
         // Compare the provided password with the stored hashed passwords
         const isPasswordValid = await bcrypt.compare(password, existingUser.password);//password came from database
         if (!isPasswordValid) {
             return res.status(400).send('Invalid username or password');
         }
        console.log("User logged in:", username);
        res.status(200).send('Login successful');
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Server error');
    }
};