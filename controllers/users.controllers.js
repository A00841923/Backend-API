import {db_connect} from "../utils/db.js";
import { getSalt } from "../utils/hash.js";
import { hash } from "../utils/hash.js";

export const getUsers = async(req, res) => {
    const sql = db_connect();
    const text = "Select * from users";
    const result = await sql.query(text);
    
    //console.log(result.rows);
    res.json(result.rows);
};

export const getUser = async (req, res) => {
    const sql = db_connect();
    const text = "Select * from users where user_id=$1";
    const values = [req.params.id];
    const result = await sql.query(text, values);
    
    //falta validar que si se trajo por lo menos un usuario
    res.json(result.rows);
};

export const postUser = async (req, res) => {
    const sql = db_connect();
    const {username, first_name, last_name, birthdate, password, email, score} = req.body;
    const salt = getSalt(process.env.SALT_SIZE);
    const hashed = hash(password, salt);
    const salted_hashed = salt + hashed;
    const text = "Insert into users(username, first_name, last_name, birthdate, password, email, score) values($1, $2, $3, $4, $5, $6, $7)";
    const values = [username, first_name, last_name, birthdate, salted_hashed, email, score];
    const result = await sql.query(text, values);
    res.json(result);
};

export const putUser = async (req, res) => {
    const sql = db_connect();
    const id = req.params.id;
    const {username, first_name, last_name, birthdate, password, email, score} = req.body;
    const text = "Update users set username=$1, first_name=$2, last_name=$3, birthdate=$4, password=$5, email=$6, score=$7 where user_id=$8";
    const values = [username, first_name, last_name, birthdate, password, email, score, id];
    const result = await sql.query(text, values);
    res.json(result);
};

export const deleteUser = async (req, res) => {
    const sql = db_connect();
    const id = req.params.id;
    const text = "Delete from users where user_id=$1";
    const values = [id];
    const result = await sql.query(text, values);
    res.json(result);
};

export const putScore = async (req, res) => {
    const sql = db_connect();
    const id = req.params.id;
    const { score } = req.body;

    const text = "UPDATE users SET score=$1 WHERE user_id=$2";
    const values = [score, id];

    const result = await sql.query(text, values);
    res.json(result);
};