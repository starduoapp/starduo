import pg from 'pg';
import {user, password, host, port, database} from './secrets.js'


const Pool = pg.Pool;
const pool = new Pool({
    user: user,
    password: password,
    host: host,
    port: port,
    database: database
});

export default pool;
