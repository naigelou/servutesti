import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE

}).promise()

export async function getnumerot() {
    const [rows] = await pool.query("SELECT * FROM puhelin")
    return rows
}

export async function numbercheck(numberToCheck) {
    console.log("pyörinkö? numbercheck");
    console.log(numberToCheck)
    const [rows, fields] = await pool.execute('SELECT * FROM puhelin WHERE puhelinnumero = ?', [numberToCheck]);
    if (rows.length > 0) {
      return true;
    } else {
      return false;
    }
  }

export async function getnumero(puhelinnumero) {
    const [rows] = await pool.query(`
    SELECT *
    FROM puhelin
    WHERE puhelinnumero = ?
    `, [puhelinnumero])
    return rows[0]

}
export async function etsi(puhnum) {
    
}
