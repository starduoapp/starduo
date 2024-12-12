import express from 'express';
import cors from 'cors';
import pool from './db'

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES

// create user
app.post("/signup", async (req, res) => {
    try{
        const newUser = await pool.query(
            "INSERT INTO users()"
        )
    } catch (err){
        console.error(err.message);
    }
})

app.listen(5000, ()=>{
    console.log("Server has started on port 5000");
})