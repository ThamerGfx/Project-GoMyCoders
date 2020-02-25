const express = require('express')
const { MongoClient, ObjectID } = require('mongodb')
const bodyParser = require('body-parser')
const assert = require('assert')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json())

////////// MONGO DRIVER
const mongo_url = 'mongodb://localhost:27017'
const dataBase = "final_project"

MongoClient.connect(mongo_url, (err, client) => {
    assert.equal(err, null, 'database connection failed')
    const db = client.db(dataBase)

    ////// ADD STUDENT
    app.post('/addone', (req, res) => {
        const studentToAdd = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            cash: req.body.cash,
            level: req.body.level,
            time: req.body.time
        }
        db.collection('students').insertOne(studentToAdd, (err, data) => {
            if (err) res.send('cannot add student')
            else res.send('student added')
        })
    })
    ////// GET ALL STUDENTS
    app.get('/getall', (req, res) => {
        db.collection('students').find().toArray((err, data) => {
            if (err) res.send('cannot fetch students')
            else res.send(data)
        })
    })
    ////// GET ONE STUDENT
    app.get('/getone/:id', (req, res) => {
        let searchedContactId = ObjectID(req.params.id)
        db.collection('students').findOne({_id: searchedContactId}, (err, data) => {
            if (err) res.send('cannot fetch student')
            else res.send(data)
        })
    })
    ////// MODIFY STUDENT
    app.put('/modifyone/:id', (req, res) => {
        let IdModify = ObjectID(req.params.id)
        const studentToModify = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            cash: req.body.cash,
            level: req.body.level,
            time: req.body.time
        }
        db.collection('students').findOneAndUpdate(
            {_id: IdModify},
            {
                $set: {
                    ...studentToModify
                }
            },
            (err, data) => {
                if (err) res.send('cannot modify student')
                else res.send('student was modified')
            }
        )
    })
    ////// DELETE ONE STUDENT
    app.delete('/deleteone/:id', (req, res) => {
        let studentToRemove = ObjectID(req.params.id)
        db.collection('students').findOneAndDelete(
            {_id: studentToRemove},
            (err, data) => {
                if (err) res.send('cannot delete student')
                else res.send('student was deleted')
            }
        )
    })
})

app.listen(5000, (err) => {
    if (err) console.log("server error")
    else console.log("server is running on port 5000")
})