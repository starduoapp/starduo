import pg from 'pg';
import dotenv from "dotenv";

dotenv.config();

const Pool = pg.Pool;
const pool = new Pool({
    user: "postgres",
    password: process.env.PASSWORD,
    host:process.env.HOST,
    port:process.env.PORT,
    database: "starduo"
});

export default pool;
