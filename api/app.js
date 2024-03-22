const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());


app.use(express.json({ extended: false }));

app.use('/api', require('./Api/DataService'));
// app.use('/apipool', require('./Api/api'));

app.get('/',(req,res)=>{
    // res.send('<h1>Home</h1>');
    // res.json('<h1>Home</h1>')
    // res.send('Home')
    res.sendFile(path.join(__dirname,"views","home.html"))
})

app.get('/contact',(req,res)=>{
    // res.send('<h1>Contact Page</h1>');
    res.sendFile(path.join(__dirname,"views","contact.html"))

})

// const middleware = [token,validateToken]

app.get('/about',(req,res,next)=>{
    res.send('<h1>About Page</h1>');
    next();
},(r,s)=>{
    console.log("About final point");
})

app.get('*',(req,res)=>{
    // res.status(404);
    // res.send('<h1>Page not found 404</h1>');
    res.status(404).send('<h1>Page not found 404</h1>');
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=> console.log(`Server running on ${PORT}`))



// **************************************** My server
// const express = require("express");
// const mysql = require("mysql");
// const jwt = require("jsonwebtoken");

// const app = express();
// const PORT = process.env.PORT || 3000;

// // MySQL Connection
// const connection = mysql.createConnection({
//     host: "127.0.0.1",
//     user: "root",
//     password: "oot@123",
//     database: "letosyshr",
// });

// // Connect to MySQL
// connection.connect((err) => {
//     if (err) {
//         console.error("Error connecting to MySQL: " + err.stack);
//         return;
//     }
//     console.log("Connected to MySQL as id " + connection.threadId);
// });

// // Middleware to verify JWT token
// function verifyToken(req, res, next) {
//     const token = req.headers["authorization"];
//     if (!token) return res.status(401).send("Access denied. No token provided.");

//     jwt.verify(token, "your_secret_key", (err, decoded) => {
//         if (err) return res.status(403).send("Invalid token.");
//         req.userId = decoded.id;
//         next();
//     });
// }

// // Routes
// // app.post('/login', (req, res) => {
// //   // Dummy user authentication (replace with your actual authentication logic)
// //   const { username, password } = req.body;
// //   if (username === 'admin' && password === 'admin') {
// //     const token = jwt.sign({ id: 1 }, 'your_secret_key', { expiresIn: '1h' });
// //     res.json({ token });
// //   } else {
// //     res.status(401).send('Invalid username or password.');
// //   }
// // });
// app.post("/runquery", (req, res) => {
//     const { sql } = req.body;

//     connectDB.connect(function (err) {
//         if (err) {
//             console.error("error connecting: " + err.stack);
//             return;
//         }
//         console.log("connected as id " + connection.threadId);
//     });

//     connectDB.beginTransaction(function (err) {
//         if (err) {
//             throw err;
//         }
//         // console.log(sql)
//         connectDB.query(sql, function (err, rows) {
//             if (err) {
//                 res.json(err);
//                 //    connectDB.rollback(function()
//                 //   {
//                 throw err;
//                 //     });
//             }
//             console.log(rows);
//             // const result = Object.values(JSON.parse(JSON.stringify(rows)));
//             connectDB.commit(function (err) {
//                 if (err) {
//                     throw err;
//                     //   connectDB.rollback(function() {
//                     //   throw err;
//                     //  });
//                 }
//                 res.json(rows);
//                 connectDB.end;
//             });

//             // console.log(result);
//         });
//     });
// });

// app.post("/login", (req, res) => {
//     const { user: userIn } = req.body;
//     console.log(userIn);
//     const sql = `SELECT * FROM user where 
//         username = '${userIn["username"]}';`;
//     connectDB.query(sql, function (err, userFound, fields) {
//         if (err) {
//             res.json(err);
//         }
//         console.log(userFound);
//         const user = Object.values(JSON.parse(JSON.stringify(userFound)));
//         console.log(user);
//         if (user[0]) {
//             if (user[0].password === userIn["password"]) {
//                 let payload = { userId: user[0].id };
//                 let token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
//                 console.log(token);
//                 res.status(200).send({ user: user[0], token: token });
//             } else {
//                 res.status(401).send("Invalid User");
//             }
//         } else {
//             res.status(401).send("Invalid User");
//         }
//     });
// });

// app.get("/protected", verifyToken, (req, res) => {
//     // Access protected route
//     res.send("You are authorized!");
// });

// // Start server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
