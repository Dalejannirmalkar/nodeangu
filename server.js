var express = require('express')
var app=express();
// var mongojs = require('mongojs')
var bodyParser = require('body-parser')
// var db = mongojs('contactlist',['contactlist']);
//var bodyParser = require('body-parser')
var firebase = require('firebase');

firebase.initializeApp(
{
serviceAccount:"./nodeangu-bce9f9502f7c.json",
databaseURL:"https://nodeangu.firebaseio.com/"
});
var database = firebase.database();
var ref = database.ref('nodeangu');
var messagesref=ref.child('messages');

app.use(bodyParser.json());
// app.set('view engine','ejs');
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
 app.use(express.static(__dirname+"/public"));

// app.get('/',function(req,res){
//   res.render('index');
// });
app.get('/contact',function(req,res){

//   res.render('contact',{qs:req.query});
console.log("i recieve get");

// db.contactlist.find(function(err,data){
//   console.log(data);
//   res.json(data);
// });

messagesref.on( "value", function(snapshot) {
  console.log(snapshot.val());
  res.json(snapshot.val());
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

   

    
 });

 app.post('/contact',function(req,res){
   console.log("databody",req.body);
  //  db.contactlist.insert(req.body,function(err,data){

  //   res.json(data);
  //  });
    
   messagesref.push(req.body,function(err,data){

    res.json(data);
   });
 })

 app.delete('/contact:id',function(req,res){
   var id= req.params.id;
   console.log("databody  ",id);

   
  //  db.contactlist.remove({_id:mongojs.ObjectID(id)},function(err,data){

  //   res.json(data);
  // })
 })

 app.put('/contact:id',function(req,res){
   var id= req.params.id;
   console.log("databody2  ",id);

   
//  db.contactlist.findAndModify({query:{_id:mongojs.ObjectID(id)},update:{$set:{name:req.body.name ,email:req.body.email,number:req.body.number}},new:true},function(err,data){

//     res.json(data);
//   })
 })

  app.get('/contact:id',function(req,res){
   var id= req.params.id;
   console.log("databody  ",id);

   
  //  db.contactlist.findOne({_id:mongojs.ObjectID(id)},function(err,data){

  //   res.json(data);
//  })

 });
 
 



app.listen(3000, function () {
  console.log('Example app listening on port 3000!',app.uri)
});
