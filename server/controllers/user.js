import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UserModal from '../models/user.js';

const secret = 'test';

//Sign-In controller
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // checks if the user already exists by finding their email in the database
    const existingUser = await UserModal.findOne({ email });

    if(!existingUser) return res.status(404).json({ message: "User does not exist yet" });
    
    // Checks if the password is correct. Bcrypt is checking the hashed password
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if(!isPasswordCorrect) return res.status(400).json({ message: "Password Incorrect"});

    // so if the users exists in the database, and the password is correct, then we get the jsw token
    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, secret, { expiresIn: '1h' });

    // returns our token
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Somthing broke /shrug'});
  }
};

// Sign-Up controller
export const signup = async(req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body; // destructures whats being sent over. ie: gets the data

  try {
    // first checks if there is already an existing user with that email
    const existingUser = await UserModal.findOne({ email });
    
    if(existingUser) return res.status(400).json({ message: "User Already Exists." });

    if(password !== confirmPassword) return res.status(400).json({ message: "Password Does Not Match" });

    //so if we don't have the existing user, and the passwords match, we need to hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    //creates the user
    const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName} `});

    const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '1h' });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: 'You broke something'});

    console.log(error);
  }
};