import pg from 'pg';

const Pool = pg.Pool;

const pool = new Pool({
    user: "postgres",
    password: "hello1234",
    host:"localhost",
    port:5432,
    database: "starduo"
})

export default pool;