import express from 'express';
import cors from 'cors';
const app = express();
import { uid } from "uid/secure";
import { JsonDB, Config } from 'node-json-db';
import crypto from 'node:crypto'
import busboy from 'connect-busboy'
import path from 'path'
import fs from 'fs-extra'

import { MongoClient, ObjectId } from 'mongodb';
import * as dotenv from 'dotenv'
import bodyParser from 'body-parser';
dotenv.config()

app.use(cors({
  origin: 'http://localhost:3000'
}))
app.use(bodyParser.json())
app.use(busboy());
app.use(express.static(path.join("./", 'public')));

const myLogger = function (req, res, next) {
  console.log('LOGGING: '+req.method+" "+req.originalUrl)
  next()
}

app.use(myLogger)

// Login
app.post('/api/users/login', async (req, res) => {
  MongoClient.connect(process.env.URI, async (err, db) => {
    if (err) throw err
    db = db.db("gr8t")
    let cl = db.collection("login")
    let user = await cl.findOne({user: req.body.username})
    if (!user) return res.status(400).send({ message: "user" })
    let hash = crypto.pbkdf2Sync(req.body.password, user.salt, 1000, 64, `sha512`).toString(`hex`); 

    if (hash !== user.pass) {
      return res.status(400).send({
        message: "password"
      });
    }

    return res.status(200).send({
      token: user.token
    })
  })
});

// Users
app.post('/api/users', (req, res) => {
  MongoClient.connect(process.env.URI, async (err, db) => {
    if (err) throw err
    db = db.db("gr8t")
    let cl = db.collection("login")
    let token = uid(20)

    let user = await cl.findOne({user: req.body.username})
    if (user) return res.status(400).send({ message: "alreadyuser" })

    let salt = crypto.randomBytes(16).toString('hex');
    let hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, `sha512`).toString(`hex`); 

    cl.insertOne({user: req.body.username, pass: hash, token: token, salt: salt});

    return res.status(200).send({
      token: token
    })
  })
});
app.patch('/api/users', (req, res) => {

});

// Locations
app.get('/api/locations', (req, res) => {
  MongoClient.connect(process.env.URI, async (err, db) => {
    if (err) throw err
    db = db.db("gr8t")
    let cl = db.collection("locations")
    let byId = await cl.find({_id: ObjectId(req.query.id)}).toArray()
    let byUser = await cl.find({user: req.query.user}).toArray()
    let byAll = await cl.find({}).toArray()
    if (req.query.id) return res.send(byId)
    if (req.query.user) return res.send(byUser)
    else return res.send(byAll)
  })
})
app.get('/api/:location', (req, res) => {
  MongoClient.connect(process.env.URI, async (err, db) => {
    if (err) throw err
    db = db.db("gr8t")
    let cl = db.collection("locations")
    let data = {}
    data = await cl.find({_id: ObjectId(req.params.location)}).toArray()
    return res.send(data)
  })
})
app.post('/api/locations', (req, res) => {
  MongoClient.connect(process.env.URI, async (err, db) => {
    if (err) throw err
    db = db.db("gr8t")
    let cl = db.collection("locations")
    cl.insertOne({user: req.body.user, name: req.body.name})
  
    return res.send()
  })
})
app.delete('/api/:location', (req, res) => {
  MongoClient.connect(process.env.URI, async (err, db) => {
    if (err) throw err
    db = db.db("gr8t")
    let cl = db.collection("locations")
    let del = await cl.deleteOne({_id: ObjectId(req.params.location)})
    if (del.deletedCount != 1) res.status(400)
    else res.status(204)

    return res.send()
  })
})

// Memberships
app.get('/api/:location/memberships', (req, res) => {
  MongoClient.connect(process.env.URI, async (err, db) => {
    if (err) throw err
    db = db.db("gr8t")
    let cl = db.collection("memberships")
    let data = await cl.find({location: ObjectId(req.params.location)}).toArray()
    return res.send(data)
  })
})
app.post('/api/:location/memberships', (req, res) => {
  MongoClient.connect(process.env.URI, async (err, db) => {
    if (err) throw err
    db = db.db("gr8t")
    let cl = db.collection("memberships")
    let exist = await cl.findOne({user: req.body.user, location: ObjectId(req.params.location)})
    if (exist) return res.send({error: "already"})
    console.log(req.body.user)
    cl.insertOne({user: req.body.user, location: ObjectId(req.params.location)})
  
    return res.send({})
  })
})
app.delete('/api/:location/memberships', (req, res) => {
  MongoClient.connect(process.env.URI, async (err, db) => {
    if (err) throw err
    db = db.db("gr8t")
    let cl = db.collection("memberships")
    let del = await cl.deleteOne({user: req.body.user, location: ObjectId(req.params.location)})
    if (del.deletedCount != 1) res.status(400)
    else res.status(204)

    return res.send()
  })
})

// Images
app.post('/images/card/logo', (req, res) => {
  let fstream;
  req.pipe(req.busboy);
  req.busboy.on('file', function (fieldname, file, filename) {
      console.log("Uploading: " + filename);

      //Path where image will be uploaded
      fstream = fs.createWriteStream("./" + '/img/' + filename);
      file.pipe(fstream);
      fstream.on('close', function () {    
          console.log("Upload Finished of " + filename);              
          res.redirect('back');           //where to go next
      });
  });
})

app.post('/api/:location/plan', (req, res) => {
  MongoClient.connect(process.env.URI, async (err, db) => {
    if (err) throw err
    db = db.db("gr8t")
    let cl = db.collection("plans")
    cl.insertOne({location: ObjectId(req.params.location), ...req.body})
  
    return res.send(req.body)
  })
})

app.get('/api/:location/plan', (req, res) => {
  MongoClient.connect(process.env.URI, async (err, db) => {
    if (err) throw err
    db = db.db("gr8t")
    let cl = db.collection("plans")
    let ret = await cl.find({location: ObjectId(req.params.location)}).toArray()
    if (!ret) return res.status(400)
  
    return res.send(ret)
  })
})

app.get('/api/:location/plan/:planid', (req, res) => {
  MongoClient.connect(process.env.URI, async (err, db) => {
    if (err) throw err
    db = db.db("gr8t")
    let cl = db.collection("plans")
    let ret = await cl.findOne({_id: ObjectId(req.params.planid), location: ObjectId(req.params.location)})
    if (!ret) return res.status(400)
  
    return res.send(ret)
  })
})

// app.post('/api/:location/plan/:planid/subs', (req, res) => {
//   MongoClient.connect(process.env.URI, async (err, db) => {
//     if (err) throw err
//     db = db.db("gr8t")
//     let cl = db.collection("plansubs")
//     cl.insertOne({location: ObjectId(req.params.location), plan: ObjectId(req.params.planid), ...req.body})
  
//     return res.send(req.body)
//   })
// })

app.post('/api/:location/plan/:planid/subs', (req, res) => {
  MongoClient.connect(process.env.URI, async (err, db) => {
    if (err) throw err
    db = db.db("gr8t")
    let cl = db.collection("plansubs")
    let exist = await cl.findOne({location: ObjectId(req.params.location), plan: ObjectId(req.params.planid), user: req.body.user})
    if (exist) return res.send({error: "already"})
    console.log(req.body.user)
    cl.insertOne({location: ObjectId(req.params.location), plan: ObjectId(req.params.planid), ...req.body})
  
    return res.send({})
  })
})

app.get('/api/:location/plan/:planid/subs', (req, res) => {
  MongoClient.connect(process.env.URI, async (err, db) => {
    if (err) throw err
    db = db.db("gr8t")
    let cl = db.collection("plansubs")
    let ret = await cl.find({plan: ObjectId(req.params.planid), location: ObjectId(req.params.location)}).toArray()
    if (!ret) return res.status(400)
  
    return res.send(ret)
  })
})

app.get('/api/:location/plan/:planid/subs/:user', (req, res) => {
  MongoClient.connect(process.env.URI, async (err, db) => {
    if (err) throw err
    db = db.db("gr8t")
    let cl = db.collection("plansubs")
    let ret = await cl.findOne({plan: ObjectId(req.params.planid), location: ObjectId(req.params.location), user: req.params.user})
    if (!ret) return res.status(400)
  
    return res.send(ret)
  })
})

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));