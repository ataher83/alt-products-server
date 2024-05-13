const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000

//middleware
// app.use(cors())
app.use(
  cors({
      origin: ['http://localhost:5173', 'https://the-alt-products.web.app'],
      credentials: true,
  }),
)
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0yjrwty.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();  


  const queriesCollection = client.db('altProductsDB').collection('queries');
  const recommendationsCollection = client.db('altProductsDB').collection('recommendations');




// queries related api

  app.get('/queries', async(req, res) => {
      const cursor = queriesCollection.find() 
      const result = await cursor.toArray() 
      res.send(result) 
  })


  app.get('/queries/:id', async(req, res) => {
      const id = req.params.id 
      const query = { _id: new ObjectId(id)} 
      const result = await queriesCollection.findOne(query)
      res.send(result) 
  })


  app.post('/queries', async(req, res) => {
      const newQuery = req.body
      console.log(newQuery)
      const result = await queriesCollection.insertOne(newQuery)
      res.send(result) 
  })


  app.put('/queries/:id', async(req, res) => {
      const id = req.params.id 
      const filter = { _id: new ObjectId(id)} 
      const options = { upsert: true }
      const updatedQuery = req.body
      const query = {
          $set: {
            productImage: updatedCraft.productImage,
            productName: updatedCraft.productName,
            productBrand: updatedCraft.productBrand,
            queryTitle: updatedCraft.queryTitle,
            boycottingReasonDetails: updatedCraft.boycottingReasonDetails,
            userEmail: updatedCraft.userEmail,
            userName: updatedCraft.userName,
            userImage: updatedCraft.userImage,
            currentDateAndTime: updatedCraft.currentDateAndTime,
            recommendationCount: updatedCraft.recommendationCount
          }
      }

      const result = await queriesCollection.updateOne(filter, queries, options)
      res.send(result) 
  })

  app.delete('/queries/:id', async(req, res) => {
      const id = req.params.id 
      const query = { _id: new ObjectId(id)} 
      const result = await queriesCollection.deleteOne(query)
      res.send(result) 
  })





// // recommendations related api

  app.get('/recommendations', async(req, res) => {
      const cursor = recommendationsCollection.find() 
      const result = await cursor.toArray() 
      res.send(result) 
  })


  app.get('/recommendations/:id', async(req, res) => {
      const id = req.params.id 
      const query = { _id: new ObjectId(id)} 
      const result = await recommendationsCollection.findOne(query)
      res.send(result) 
  })


  app.post('/recommendations', async(req, res) => {
      const newQuery = req.body
      // console.log(newQuery)
      const result = await recommendationsCollection.insertOne(newQuery)
      res.send(result) 
  })


  app.delete('/recommendations/:id', async(req, res) => {
      const id = req.params.id 
      const query = { _id: new ObjectId(id)} 
      const result = await recommendationsCollection.deleteOne(query)
      res.send(result) 
  })





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('The Alt Products Server is running')
  })
  
  app.listen(port, () => {
    console.log(`The Alt Products Server is running on port: ${port}`)
  })