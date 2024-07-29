const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const uri = "mongodb+srv://prashanth:prashanth@amazonclonecluster.hmkmqlb.mongodb.net/amazonCloneDB?retryWrites=true&w=majority&appName=AmazonCloneCluster";
// const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true, useNewUrlParser: true, useUnifiedTopology: true } };
const Product = require('D:/Prash/Work/FSD Interview Prep/Main Website/amazon-clone/src/models/product.js') 
const MongoClient = require('mongodb').MongoClient
const app=express()
app.use(cors())
app.use(express.json())
async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri);
    console.log("Successfully connected to MongoDB!")
    

    // Start the server after the connection is established
    app.listen(4000, () => {
      console.log("Server is running on port 4000")
    });
  } catch (err) {
    console.error(err)
  }
}

// Run the function to connect to the database and start the server
run()
//.catch(console.dir)
// const client = new MongoClient(uri)
// const db = MongoURI.Create(uri).amazonCloneDB
// const server = MongoClient(uri).GetServer()
// // const collection = db.getCollection("product")
// // console.log(collection)
// app.listen(4000, () => {
//         console.log("Server is running on port 4000")
// })

const product = new Product({
        name: 'Football',
        price: '500',
        category: 'sports'
})
product.save();
app.get('/', async (req, res) => {
        res.send(product)
      });
    // Add your routes and middleware after the connection is established
    app.get('/getProducts', async (req, res) => {
      try {
        const data = await Product.find()
        res.json(data)
      } catch (err) {
        res.status(500).json({ error: err.message })
      }
    });