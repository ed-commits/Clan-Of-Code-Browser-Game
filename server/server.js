const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;

const createRouter = require('./helpers/create_router.js');

MongoClient.connect("mongodb://localhost:27017", (err, client) => {
  if(err){
    console.log(err);
  }

  const db = client.db("fighting_fantasy");

  const pages = db.collection("pages");
  const pagesRouter = createRouter(pages);
  app.use("/api/pages", pagesRouter);

  const items = db.collection("items");
  const itemsRouter = createRouter(items);
  app.use("/api/items", itemsRouter);

  const monsters = db.collection("monsters");
  const monstersRouter = createRouter(monsters);
  app.use("/api/monsters", monstersRouter);

  app.listen(3000, function () {
  console.log(`Listening on port ${ this.address().port }`);
  });
});
