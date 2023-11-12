const functions = require("firebase-functions");
const admin = require('firebase-admin')

const serviceAccountKey = require('./serviceAccountKey.json')

const express = require('express')
const app = express();

//body parser for our JSON

app.use(express.json());

//cross orgin

const cors = require("cors")
const morgan = require('morgan')
app.use(morgan('dev'))
app.use(cors({origin:true}))

app.use((req,res,next)=>{
    res.set("Access-Control-Allow-Origin","*")
    next();
});

//firebase crea\dentials
admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey)
  });


  app.get("/",(req,res)=>{
    return res.send("Hello World")
  })

  const userRout = require('./routs/user')
  app.use("/api/user",userRout)
  exports.app = functions.https.onRequest(app)