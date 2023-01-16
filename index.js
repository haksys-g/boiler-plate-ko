const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const config = require('./config/key');
const { User } = require('./models/User');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB connect ...'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World! Mongo DB Insert 예러 해결이 안되네요. 버젼')
});

app.post('/register', (req, res) => {
    const user = new User(req.body)

    user.save((err, userInfo) => {
        if (err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    }) 
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


/* const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://mjkim:asdf1234@cluster0.8m6oj4u.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
 */