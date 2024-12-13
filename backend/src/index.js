import express from 'express';
import cors from 'cors';
import pool from './config/db.js';
import bcrypt from 'bcrypt';

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES

// create user
app.post("/signup", async (req, res) => {
    try{
        const {email, password, username} = req.body;
        const newUser = await pool.query(
            "INSERT INTO users (email, password, username, id) VALUES ($1, $2, $3, gen_random_uuid()) RETURNING *",
            [email, await bcrypt.hash(password, 10), username]
        )
        res.status(200).json({success:true, message:newUser.rows[0]});
    } catch (err){
        res.status(400).json({success:false, message:"Could not add user"})
    }
})

// get password
app.get("/signin", async (req, res) => {
    try{
        const {email} = req.body;
        const password = await pool.query(
            "SELECT password FROM users WHERE email = $1",
            [email]
        )
        res.status(200).json({success:true, message:newUser.rows[0]});
        return password;
    } catch (err){
        res.status(400).json({success:false, message:"Could not add user"})
    }
})

app.listen(6000, ()=>{
    console.log("Server has started on port 6000");
})