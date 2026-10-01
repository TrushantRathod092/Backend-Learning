const dns = require("dns");
dns.setServers(["10.66.17.53"]);

const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb+srv://trushantrathod1504_db_user:RZAObS4Q0T6DlRVf@backend-learn.4digjbb.mongodb.net/?appName=Backend-Learn";

const client = new MongoClient(url);

// Database Name
const dbName = 'codingBackend';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('user');

  // the following code examples can be pasted here...

  const findResult = collection.find({});
  const ans = await findResult.toArray();
  // console.log('Found documents =>', ans);

  const insertResult = await collection.insertOne({
    name: "Son Goku",
    age: 30,
  })

  console.log("Inserted document =>", insertResult);

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
