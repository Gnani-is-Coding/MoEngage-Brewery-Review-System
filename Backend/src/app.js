const express = require("express");
const path = require("path")
const {open} = require("sqlite")
const sqlite3 = require("sqlite3")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const dbPath = path.join(__dirname,"breweryReview.db")

let db = null
const app = express();
app.use(express.json())

const initializeDbandServer = async () => {
    try{
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        })
        app.listen(3000, ()=> {
            console.log("Server Running at http://localhost:3000")
        })
        
    } catch(e) {
        console.log(`DB Error at ${e.message}`)
        process.exit(1)
    }
}

initializeDbandServer()

app.get("/", async (request,response)=> {
    const query = `SELECT * FROM emp;`
    const result = await db.run(query)
    console.log(result)
    response.send(result)
})