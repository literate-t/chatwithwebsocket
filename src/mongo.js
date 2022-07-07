const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

// @ts-ignore
const username = encodeURIComponent(process.env.MONGODB_USERNAME);
// @ts-ignore
const password = encodeURIComponent(process.env.MONGODB_PASS);
const uri = `mongodb+srv://${username}:${password}@mydatabase.gudcrqd.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
  serverSelectionTimeoutMS: 3500,
});
module.exports = client;
