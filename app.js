const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});

const port = 8000;

// define mongoose schema
const ContactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  Email: String,
  Address: String,
  Desc: String,
});

const Contact = mongoose.model('Contact',  ContactSchema);


//Express specific stuff
app.use('/static',express.static('static')) // for serving static files
app.use(express.urlencoded())

//pug specific stuff
app.set('View engine', 'pug')// set the template engine as pug 
app.set('Views', path.join(__dirname, 'Views'))//  set the view directory


// End points
app.get('/', (req, res)=>{
    const params = {  }
    res.status(200).render('home.pug', params);
  })
app.get('/contact', (req, res)=>{
    const params = {  }
    res.status(200).render('contact.pug', params);
  })
app.post('/contact', (req, res)=>{
  var myData = new Contact(req.body);
  myData.save().then(()=>{
    res.send("This item has been save to the database")
  }).catch(()=>{
    res.status(400).send("item was not save in database")
  })

    // res.status(200).render('contact.pug' );
  })


  //START THE SERVER
app.listen(port, () => {
    console.log(`The application started succesfully on port ${port}`)
  })