import {db_connect} from "../utils/db.js";
import { hash } from "../utils/hash.js";

export const login = async(req, res) => {
    const sql = db_connect();
    const {username, password}= req.body;

    const text = "select * from users where username=$1";
    const values = [username];

    const result = await sql.query(text, values);

    const salt = result.rows[0].password.substring(0, process.env.SALT_SIZE);
    const hashed = hash(password, salt);

    console.log(hashed);
    console.log(result.rows[0]);
    const salted_hashed = salt + hashed;
    console.log(salted_hashed);

    if(result.rows[0].password == salted_hashed){
        res.status(200).json({isLogin:true, user:result.rows[0]});
    }else{
        res.status(404).json({isLogin:false, user:{}});
    }
};