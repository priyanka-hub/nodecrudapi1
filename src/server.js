//importing expressjs
//ExpressJS for creating server and api get,post,put and delete
const express= require('express')
//Body Parsers for getting the data through the urls
const bodyParser=require('body-parser')
//Importing Mongo Client

const MongoClient=require('mongodb').MongoClient
const res = require('express/lib/response')
//setting ejs template engine
//const app controls the entire app with express functional constructor
const app=express()

//we are saying expressjs that to use body parser urlencoded to be true
app.use(bodyParser.urlencoded({extended:true}))



//Database Connection String
const connectionString="mongodb+srv://priyankamarrapu:priyanka28@cluster0.lzmgi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

//Connecting the database
MongoClient.connect(connectionString,{useUnifiedTopology:true})
.then(client=>{
    console.log('connected to database')
    //connecting the database
    const db=client.db("star-war-quotes")
//connecting the collection
    const quotesCollection=db.collection('quotes')
    //app.use()
//app.get()
app.post('/quotes',(req,res)=>{
    quotesCollection.insertOne(req.body)
.then(result=>{
    console.log(result)
})
.catch(error=>console.error(error))
})

//2.Reading data from MongoDB
app.get('/getall',(req,res)=>
{
    //Finding the collection quotes and changing object of objects to array of objects
    db.collection('quotes').find().toArray()
    //Waiting for the promise to send us the result back
    .then(result=>{
res.render('index.ejs',{quotes:result})
    }) 

    .catch(error=>console.error(error))

})

//Updating data
//app.put('/updatequote',(req,res)=>
//{
  //  quotesCollection.findOneAndUpdate()
 //Waiting for the promise to send us the result back
  //  .then(result=>{
    //    res.send(result)
    //})
    //waiting for the promise to send us the error back
    //.catch(error=>console.error(error))
    })  
.catch(console.error)

res.render(views,locals)
app.get('/',(req,res)=>
{
    res.sendFile(__dirname +'/index.html')
})

//Creating the server
const PORT=5001
app.listen(PORT,()=>
{
    console.log(`server running at port ${PORT}`)
})