require('dotenv').config();
const express = require("express");
const path = require("path")
const {open} = require("sqlite")
const sqlite3 = require("sqlite3")
const bcrypt = require("bcrypt")
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
const cors = require("cors");
 

const dbPath = path.join(__dirname,"/Database/breweryReviews.db")

let db = null 
const app = express();
app.use(cors())

app.use(bodyParser.json());
app.use(express.json())


const initializeDbandServer = async () => {
    try{
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        })
        app.listen(3005, ()=> {
            console.log("Server Running at http://localhost:3005")
        })
        
    } catch(e) {
        console.log(`DB Error at ${e.message}`)
        process.exit(1)
    }
}

initializeDbandServer()


//Middleware function
const authenticateJwtToken = (request,response, next) => {
    // let jwtToken = process.env.CLIENT_JWT_TOKEN
    const authorizationHeaders = request.headers["authorization"]
    // console.log(authorizationHeaders,"auth")
    if (authorizationHeaders) {
        jwtToken = authorizationHeaders.split(" ")[1]
    }
    // console.log(jwtToken,"token")

    if (jwtToken === undefined) {
        response.status = 401 
        console.log("401")
        response.send("Invalid JWT Token")
    } else {
        jwt.verify(jwtToken, "MY_SECRET_TOKEN", (error,payload) => {
            if (error) {
                response.status = 401
                console.log("invalid token")
                response.send("Invalid JWT Token")
            }else {
                // console.log(payload, "authneicated payload")
                response.payload = payload
                next()
            }
        })
    }

}

// Get all USERS API
app.get("/users",async (request,response) => {
    const query = `SELECT * FROM users;`
    const result = await db.all(query)
    console.log("get users",result)
    response.send(result)
})

app.get("/reviews",async (request,response) => {
    const query = `SELECT * FROM reviews;`
    const result = await db.all(query)
    console.log("get users",result)
    response.send(result)
})

app.get("/",async (request,response) => {
    const query = `SELECT * FROM reviews;`
    const result = await db.all(query)
    console.log("get users",result)
    response.send(result)
})

//Register New User
app.post("/register", async(request,response) => {
    const {username,email,password} = request.body

    const getUserQuery = `SELECT * FROM users WHERE username = '${username}';`
    const userInDb = await db.get(getUserQuery)

    if (userInDb === undefined) {
        const hashedPassword = await bcrypt.hash(password,10)

        const createNewUser = `INSERT INTO users(username,email,password)
        VALUES('${username}','${email}','${hashedPassword}');`

        const dbResponse = await db.run(createNewUser)
        console.log(`Created new User with ${dbResponse.lastID}`)
        response.send(`Created new User with ${dbResponse.lastID}`)

    } else {
        response.status = 400;
        console.log("User already exists")
        response.send("User already exists")
    }
})

//Login API
app.post("/login", async (request,response) => {
    const {username,password} = request.body 
    const userDetailsQuery =`SELECT * FROM users WHERE username = '${username}';`
    const dbResponse = await db.get(userDetailsQuery)
    
    if (dbResponse !== undefined){
        const isPasswordMatched = await bcrypt.compare(password,dbResponse.password)
        console.log(isPasswordMatched, "is pass matched") 
        if(isPasswordMatched) {
            const payload = {
                username
            }
            const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN")
            console.log(jwtToken, "jwt token")
            response.send({jwtToken,userID: dbResponse.id})

        }else {
            response.status = 400
            response.send("Invalid credentials!")
        }

    }else {
        response.status = 400
        console.log("invaalid user")
        response.send("Invalid User")
    }
})

//adding new Breweries.
app.post('/breweries',authenticateJwtToken, async (req, res) => {
    const { id, name } = req.body;
    console.log(id, name, "id")
    const query = `INSERT INTO breweries (id,name) VALUES(${id},${name})`

    const result = await db.run(query) 
    console.log(`Created new brewwery with ${result.lastID}`)
      res.send({ id: this.lastID });
    });

// Get reviews for a specific brewery
app.get('/breweries/:id/reviews',authenticateJwtToken, async (req, res) => {
    const breweryId = req.params.id;
    console.log("brew",breweryId)
    const query = `SELECT * FROM reviews WHERE brewery_id ='${breweryId}'`
    console.log(query,"get reviews")
    const result = await db.all(query) 
    console.log("reviews",result)
    res.send({ reviews: result });
  });
  
  // Add a review for a brewery
  app.post('/breweries/:id/reviews',authenticateJwtToken, async (req, res) => {
    
    const breweryId = req.params.id;
    const { userId, comment, rating } = req.body;
    // console.log(breweryId,"id",userId,comment, rating, "while adding a review params")
    const query = `INSERT INTO reviews (brewery_id, user_id, review, rating) 
    VALUES('${breweryId}',${userId},'${comment}',${rating})`

    console.log(query, "query")
    const result = await db.run(query) 
    console.log("addeds review",result.lastID)
    res.send({ result});
    });

module.exports = app

