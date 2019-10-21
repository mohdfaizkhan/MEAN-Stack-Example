const express = require('express')
const app = express()
const mongoose = require('mongoose')
const {mongourl} = require("./config/keys")
//const Wish= require("./models/wish");

const Wish = mongoose.model("wishes");

var wishList =['code','movie','food'];

mongoose.Promise=  global.Promise
mongoose.connect(mongourl, {useNewUrlParser:true});

module.exports = (app)=>{

    // app.get('/',(req,res)=>{
    //     res.send("Hello Node First api started");
    // })
    // var data ={
    //     name:"Faiz",
    //     status:"programmer"
    // }

   
    app.get('/getData',(req,res)=>{
        //res.render('home',{data})
        Wish.find({}).then(data=> {
            console.log(data)
            res.send(data)
           // res.render('home',{wish:data})
        })        
    })
    //app.render('home')
    // app.get('/about', (req,res)=>{
    //         res.send("This is about page")
    // })
    app.get('/about', (req,res)=>{
        res.render('about')
})

    app.get('/profile/:id',(req,res)=>{
        res.send("home" + req.params.id);
    })

    // app.get('/profile/:id',(req,res)=>{
    //     data={
    //         name:req.params.id
    //     }
    //     res.render("home",{data:data});
    // })

    // app.get('/home', (req,res)=>{
    //     res.send({ msg: "First fetch call"})
    // })
    
    // app.get('/getHome', (req,res)=>{
    //     res.sendFile(__dirname+'/index.html')
    // })
    app.post('/sent',(req,res)=>{
        // console.log(req.body);
        // wishList.push(req.body.item);
        // res.send(wishList);
        new Wish({
            wish:req.body.item
        }).save()
        .then(data => {
            console.log("save");
            res.send(data);
        }).catch(err=>{
            throw err;
        })
        
    })
    // app.delete('/remove/:id',(req,res)=>{
    //     // wishList = wishList.map(item=>{
    //     //     if(item !=req.params.id){
    //     //         return item
    //     //     }
    //     // })
    //     Wish.findOneAndRemove({wish:req.params.id}).then(data=>{
    //         console.log("deleted")
    //         res.send(data); 
    //     })
    //     console.log("id",req.params.id);
    // })


    app.delete('/remove/:id',(req,res)=>{
        // wishList = wishList.map(item=>{
        //     if(item !=req.params.id){
        //         return item
        //     }
        // })
        Wish.findOneAndRemove({_id:req.params.id}).then(data=>{
            console.log("deleted")
            res.send(data); 
        })
        console.log("id",req.params.id);
    })
}

