const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const {
  error
} = require('console');
// const { error } = require('console');
const app = express();

const config = require(path.join(__dirname + '/config.json'));
const url = `mongodb://${config.user}:${config.password}@${config.host}/?authMechanism=DEFAULT&authSource=${config.dbname}`;

// MongoClient.connect(url, {
//   useUnifiedTopology: true
// }, (err, client) => {
//   if (err) return console.error(err);
//   console.log('Connected to DatabAAAase');
// });

//Promise Client
MongoClient.connect(url, {
    useUnifiedTopology: true
  })
  .then(client => {
    console.log('Connected to Database');
    const db = client.db(config.user);
    const quotesCollection = db.collection('quotes2');

    //set view template engine
    app.set('view engine', 'ejs');

    //Midelware
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(express.static('public'));
    app.use(bodyParser.json());

    app.listen(3000, function () {
      console.log('listening on port 3000');
    });
    app.get('/', (req, res) => {
      // res.sendFile(__dirname + '/index.html');
      const cursor = db.collection('quotes2').find().toArray()
        .then(results => {
          // console.log(results)
          res.render('index.ejs', {
            quotes: results
          })
        })
        .catch(error => console.error(error));
    });

    app.post('/quotes', (req, res) => {
      quotesCollection.insertOne(req.body)
        .then(result => {
          // console.log(result);
          res.redirect('/');
        })
        .catch(error => console.error(error))
    });

    app.put('/quotes', (req, res) => {
      console.log(req.body);
      quotesCollection.findOneAndUpdate({
          name: 'Yoda'
        }, {
          $set: {
            name: req.body.name,
            quote: req.body.quote
          }
        }, {
          upsert: true
        })
        .then(result => {
          // console.log(result);
          res.json('Success');
        })
        .catch(error => console.error(error))
    })

    app.delete('/quotes', (req, res) => {
      quotesCollection.remove({
            name: 'Dark Vadar' // hard coded
          },
          'options'
        )
        .then(result => {})
        .catch(error => console.error(error))
    })



  })
  .catch(error => console.error(error))