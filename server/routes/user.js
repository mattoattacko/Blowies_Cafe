import express from 'express';
const router = express.Router();

import { signin, signup } from '../controllers/user.js';

// this is a post route because we need to send the data to the backend. IE: sending the data from the form to the backend
router.post('/signin', signin);
router.post('/signup', signup);

export default router;